import { useEffect, useMemo, useRef, useState } from "react";
import { HiOutlineRefresh } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import Pagination from "components/UI/Pagination";
import { DOMAIN_ACTIVITY_LABEL, I_DOMAIN_ACTIVITY } from "helper/interfaces";
import { useTezosCollectStore } from "store";
import { DEFAULT_PAGE_SIZE } from "helper/constants";
import tezosCollectLogo from "assets/images/tezos-collect-logo.svg";
import ComponentTable from "components/UI/ComponentTable";
import { dateDifFromNow } from "helper/formatters";
import AddressBox from "components/UI/AddressBox";
import TxBox from "components/UI/TxBox";
import DomainBox from "components/UI/DomainBox";

const MarketTopBids = () => {
  const { queryDomainActivity } = useTezosCollectStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [domainActivities, setDomainActivities] = useState<I_DOMAIN_ACTIVITY[]>(
    []
  );

  const [containStr, setContainStr] = useState<string>("");

  useEffect(() => {
    onUpdateFilter(1);
  }, []);

  const marketLastSaleData = useMemo(() => {
    return {
      textAlign: "left",
      heading: "Top Bids",
      collapsible: true,
      header: ["Event", "Name", "Price", "Maker", "TX", "Placed at"],
      tableData:
        domainActivities.length === 0
          ? []
          : domainActivities
              .filter((activity) => activity.name.includes(containStr))
              .map((activity) => [
                <div className="flex items-center gap-2">
                  <div className="rounded-full p-2 bg-white/10 flex items-center justify-center tracking-tight font-oswald">
                    <img src={tezosCollectLogo} className="w-4" />
                  </div>
                  {DOMAIN_ACTIVITY_LABEL[activity.type]}
                </div>,
                <DomainBox name={activity.name} />,
                `${activity.amount} ꜩ`,
                <AddressBox address={activity.from} />,
                <TxBox tx={activity.txHash} />,
                dateDifFromNow(activity.timestamp),
              ]),
    };
  }, [domainActivities, containStr]);

  const onUpdateFilter = async (_currentPage: number) => {
    const { domainActivities: _domainActivities, count } =
      await queryDomainActivity(
        {
          offset: _currentPage - 1,
          pageSize: DEFAULT_PAGE_SIZE,
          type: "PLACE_BID",
        },
        "AMOUNT_DESC"
      );
    setDomainActivities(_domainActivities);

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
      <ComponentTable {...marketLastSaleData} />
    </div>
  );
};
export default MarketTopBids;

const marketLastSaleData = {
  textAlign: "left",
  heading: "Top Bids",
  collapsible: true,
  header: ["Event", "Name", "Price", "Maker", "Valid From", "Valid Until"],
  tableData: [
    [
      <div className="flex items-center gap-2">
        <div className="rounded-full p-2 bg-white/10 flex items-center justify-center tracking-tight font-oswald">
          <img src={tezosCollectLogo} className="w-4" />
        </div>
        Minted
      </div>,
      "080.tez",
      "70.6 ꜩ",
      <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
      "22 hours ago",
      "2 hours",
    ],
    [
      <div className="flex items-center gap-2">
        <div className="rounded-full p-2 bg-white/10 flex items-center justify-center tracking-tight font-oswald">
          <img src={tezosCollectLogo} className="w-4" />
        </div>
        List
      </div>,
      "080.tez",
      "70.6 ꜩ",
      <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
      "22 hours ago",
      "2 hours",
    ],
    [
      <div className="flex items-center gap-2">
        <div className="rounded-full p-2 bg-white/10 flex items-center justify-center tracking-tight font-oswald">
          <img src={tezosCollectLogo} className="w-4" />
        </div>
        Sale
      </div>,
      "080.tez",
      "70.6 ꜩ",
      <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
      "22 hours ago",
      "2 hours",
    ],
    [
      <div className="flex items-center gap-2">
        <div className="rounded-full p-2 bg-white/10 flex items-center justify-center tracking-tight font-oswald">
          <img src={tezosCollectLogo} className="w-4" />
        </div>
        Bid placed
      </div>,
      "080.tez",
      "70.6 ꜩ",
      <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
      "22 hours ago",
      "2 hours",
    ],
    [
      <div className="flex items-center gap-2">
        <div className="rounded-full p-2 bg-white/10 flex items-center justify-center tracking-tight font-oswald">
          <img src={tezosCollectLogo} className="w-4" />
        </div>
        Bid received
      </div>,
      "080.tez",
      "70.6 ꜩ",
      <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
      "22 hours ago",
      "2 hours",
    ],
    [
      <div className="flex items-center gap-2">
        <div className="rounded-full p-2 bg-white/10 flex items-center justify-center tracking-tight font-oswald">
          <img src={tezosCollectLogo} className="w-4" />
        </div>
        Auction won
      </div>,
      "080.tez",
      "70.6 ꜩ",
      <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
      "22 hours ago",
      "2 hours",
    ],
  ],
};
