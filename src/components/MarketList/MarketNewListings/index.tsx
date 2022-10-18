import { useEffect, useRef, useState } from "react";
import { HiOutlineRefresh } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import Pagination from "components/UI/Pagination";
import { TYPE_DOMAIN } from "helper/interfaces";
import DomainMarketCard from "components/DomainMarketCard";
import { useTezosCollectStore } from "store";
import { DEFAULT_PAGE_SIZE } from "helper/constants";

const MarketNewListings = () => {
  const { queryDomain } = useTezosCollectStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [domains, setDomains] = useState<TYPE_DOMAIN[]>([]);

  const [containStr, setContainStr] = useState<string>("");

  useEffect(() => {
    onUpdateFilter(1);
  }, []);

  const onUpdateFilter = async (_currentPage: number) => {
    const { domains: _domains, count } = await queryDomain(
      {
        offset: _currentPage - 1,
        pageSize: DEFAULT_PAGE_SIZE,
        domainListed: true,
      },
      [],
      "SALESTARTEDAT_DESC"
    );
    setDomains(_domains);

    const _totalPage = Math.ceil(count / DEFAULT_PAGE_SIZE);
    setTotalPage(_totalPage);
    if (_currentPage > _totalPage) setCurrentPage(1);
  };

  const updateCurrentPage = (_currentPage: number) => {
    setCurrentPage(_currentPage);
    onUpdateFilter(_currentPage);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-6">
        <button className="p-2 bg-white rounded-lg text-tezDarkBg">
          <HiOutlineRefresh
            size={24}
            className="hover:rotate-180 cursor-pointer duration-300"
          />
        </button>
        <div className="flex items-center flex-grow relative">
          <FiSearch className="absolute text-grayText left-2" size={24} />
          <input
            className="input-light w-full pl-10"
            placeholder="Type your perfect domain"
            onChange={(e) => setContainStr(e.target.value)}
          />
        </div>
      </div>

      <div className="flex mx-auto">
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          visibleNumber={10}
          onPageChange={updateCurrentPage}
        />
      </div>
      <div className="grid grid-cols-5 gap-5">
        {domains
          .filter((item) => item.name.includes(containStr))
          .map((domain, index) => {
            return (
              <DomainMarketCard
                key={index}
                domain={domain}
                cardType="DC_COMPACT"
              />
            );
          })}
      </div>
    </div>
  );
};
export default MarketNewListings;
