import { useState, useEffect, useRef } from "react";
import { HiOutlineRefresh } from "react-icons/hi";
import CSVSvg from "assets/images/market/csv.svg";
import { FiSearch } from "react-icons/fi";
import Filter from "components/Filter";
import Pagination from "components/UI/Pagination";
import { marketSortOptions } from "helper/constants";
import { useTezosCollectStore } from "store";
import {
  I_DOMAIN_SEARCH_VALUE,
  TYPE_DOMAIN,
  TYPE_MARKET_ADVANCED_FILTER_VALUE,
  TYPE_MARKET_SORT_VALUE,
} from "helper/interfaces";
import DomainMarketCard from "components/DomainMarketCard";
import { useParams } from "react-router-dom";

const CollectionDomains = () => {
  const { queryDomain, findCollectionBySlug } = useTezosCollectStore();
  const [domains, setDomains] = useState<TYPE_DOMAIN[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const containRef = useRef<HTMLInputElement>(null);

  const { slug } = useParams();

  const [searchOptions, setSearchOptions] = useState<I_DOMAIN_SEARCH_VALUE>({
    domainListed: true,
    pageSize: 40,
    offset: 0,
  });
  const [advancedFilterValues, setAdvancedFilterValues] = useState<
    TYPE_MARKET_ADVANCED_FILTER_VALUE[]
  >([]);

  const sortSelectRef = useRef<HTMLSelectElement>(null);

  const onUpdateFilter = async (
    _searchOptions: I_DOMAIN_SEARCH_VALUE,
    _advancedFilterValues: TYPE_MARKET_ADVANCED_FILTER_VALUE[]
  ) => {
    if (_searchOptions.offset === undefined)
      _searchOptions.offset = currentPage - 1;
    if (containRef.current && containRef.current?.value.length > 0)
      _searchOptions.contains = containRef.current?.value;
    else _searchOptions.contains = "";

    _searchOptions.collectionId = findCollectionBySlug(slug || "")?._id;

    setSearchOptions(_searchOptions);
    setAdvancedFilterValues(_advancedFilterValues);

    // @ts-ignore
    const sortOption: TYPE_MARKET_SORT_VALUE =
      sortSelectRef?.current?.value || "PRICE_ASC";

    const { domains: _domains, count } = await queryDomain(
      _searchOptions,
      _advancedFilterValues,
      sortOption
    );
    setDomains(_domains);

    const _totalPage = Math.ceil(count / (searchOptions.pageSize || 40));
    setTotalPage(_totalPage);
    if (currentPage > _totalPage) setCurrentPage(1);
  };

  useEffect(() => {
    onUpdateFilter(searchOptions, advancedFilterValues);
  }, []);

  const updateCurrentPage = (_currentPage: number) => {
    setCurrentPage(_currentPage);
    onUpdateFilter(
      { ...searchOptions, offset: _currentPage - 1 },
      advancedFilterValues
    );
  };

  return (
    <div className="flex flex-col gap-6 sticky top-16">
      <div className="flex gap-2 md:gap-6">
        <button className="p-2 bg-white rounded-lg text-tezDarkBg">
          <HiOutlineRefresh
            size={24}
            className="hover:rotate-180 cursor-pointer duration-300"
          />
        </button>
        <div className="flex items-center flex-grow relative">
          <FiSearch className="absolute text-grayText left-2" size={24} />
          <input
            ref={containRef}
            className="input-light w-full pl-10"
            placeholder="Type your perfect domain"
          />
        </div>
        <select className="select-light w-32 md:w-64" ref={sortSelectRef}>
          {marketSortOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button className="tezGr-button p-4">
          <img src={CSVSvg} />
        </button>
      </div>
      <div className="flex flex-col md:flex-row items-start gap-5">
        <Filter updateFilter={onUpdateFilter} />
        <div className="md:grid grid-cols-4 flex-1 gap-4">
          {domains.map((domain, index) => {
            return (
              <DomainMarketCard
                key={index}
                domain={domain}
                cardType="DC_COMPACT"
              />
            );
          })}
          <div className="col-span-4 col-start-1 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPage={totalPage}
              visibleNumber={5}
              onPageChange={updateCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CollectionDomains;
