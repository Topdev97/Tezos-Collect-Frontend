import { useState } from "react";
import DomainCard from "components/DomainCard";
import TopCollections from "components/TopCollections";
import { TYPE_DOMAIN } from "helper/interfaces";
import { FiSearch } from "react-icons/fi";
import { HiOutlineRefresh } from "react-icons/hi";
import BidDrawer from "components/BidDrawer";
import { useTezosCollectStore } from "store";

const Auctions = () => {
  const { auctionedDomains } = useTezosCollectStore();
  const [bidDrawerVisible, setBidDrawerVisible] = useState<boolean>(false);

  const [drawerDomain, setDrawerDomain] = useState<TYPE_DOMAIN | undefined>(
    undefined
  );
  const cardHandler = (name: string) => {
    const clickedDomain = auctionedDomains.find(
      (domain) => domain.name === name
    );
    if (clickedDomain === undefined) return;
    console.log(clickedDomain);
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
            size={24}
            className="hover:rotate-180 cursor-pointer duration-300"
          />
        </button>
        <div className="flex items-center flex-grow relative">
          <FiSearch className="absolute text-grayText left-2" size={24} />
          <input
            className="input-light w-full pl-10"
            placeholder="Type your perfect domain"
          />
        </div>
        <select className="select-light w-32 lg:w-64">
          <option>Sort: Price Low to high</option>
        </select>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {auctionedDomains.map((domain, index) => (
          <DomainCard
            key={index}
            {...domain}
            price={domain.topBid}
            cardType="DC_AUCTION"
            cardHandler={cardHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default Auctions;
