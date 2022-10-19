import { useEffect, useRef, useState } from "react";
import TopCollections from "components/TopCollections";
import { TYPE_DOMAIN } from "helper/interfaces";
import { FiSearch } from "react-icons/fi";
import { HiOutlineRefresh } from "react-icons/hi";
import BidDrawer from "components/BidDrawer";
import { useTezosCollectStore } from "store";
import DomainMarketCard from "components/DomainMarketCard";
import { DEFAULT_PAGE_SIZE, marketSortOptions } from "helper/constants";
import Pagination from "components/UI/Pagination";

const Auctions = () => {
  const { queryDomain } = useTezosCollectStore();
  const [bidDrawerVisible, setBidDrawerVisible] = useState<boolean>(false);

  const [domains, setDomains] = useState<TYPE_DOMAIN[]>([]);

  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [drawerDomain, setDrawerDomain] = useState<TYPE_DOMAIN | undefined>(
    undefined
  );

  const sortSelectRef = useRef<HTMLSelectElement>(null);
  const [containStr, setContainStr] = useState<string>("");

  useEffect(() => {
    onUpdateFilter(1);
  }, []);

  const onUpdateFilter = async (_currentPage: number) => {
    setDomains([]);
    const { domains: _domains, count } = await queryDomain(
      {
        offset: _currentPage - 1,
        pageSize: DEFAULT_PAGE_SIZE,
        isForAuction: true,
      },
      [],
      // @ts-ignore
      sortSelectRef?.current?.value || "PRICE_ASC"
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

  const cardHandler = (name: string) => {
    const clickedDomain = domains.find((domain) => domain.name === name);
    if (clickedDomain === undefined) return;

    setDrawerDomain(clickedDomain);
    setBidDrawerVisible(true);
  };

  return (
    <div className="flex flex-col gap-2 md:gap-6 my-8">
      <BidDrawer
        bidDrawerVisible={bidDrawerVisible}
        setBidDrawerVisible={setBidDrawerVisible}
        drawerDomain={drawerDomain}
      />
      <TopCollections />
      <div className="flex gap-6">
        <button className="p-2 bg-white rounded-lg text-tezDarkBg">
          <HiOutlineRefresh
            onClick={() => onUpdateFilter(currentPage)}
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

        <select className="select-light w-32 md:w-64" ref={sortSelectRef}>
          {marketSortOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-5 col-start-1 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            visibleNumber={5}
            onPageChange={updateCurrentPage}
          />
        </div>

        {domains
          .filter((item) => item.name.includes(containStr))
          .map((domain, index) => (
            <DomainMarketCard
              key={index}
              domain={domain}
              cardHandler={cardHandler}
            />
          ))}
      </div>
    </div>
  );
};

export default Auctions;
