import { useState, useMemo } from "react";
import { useTezosCollectStore } from "store";
import tezosCollectLogo from "assets/images/tezos-collect-logo.svg";
import { TOP_SALE_DURATIONS } from "helper/constants";
import { convertNum2DateString } from "helper/formatters";
import LinkWithSearchParams from "components/LinkWithSearchParams";

const RecommendedSales = () => {
  const { collectionStore, topSaleDomains, featuredAuctions } =
    useTezosCollectStore();

  const [topCategoryDuration, setTopCategoryDuration] = useState<number>(0);

  const [currentDuration, setCurrentDuration] = useState<number>(0);

  const recommendedSales = useMemo(() => {
    if (topCategoryDuration === 0)
      return collectionStore.collections
        .sort((itemB, itemA) => itemA.volumeDay - itemB.totalVolume)
        .slice(0, 5);
    if (topCategoryDuration === 1)
      return collectionStore.collections
        .sort((itemB, itemA) => itemA.volumeMonth - itemB.volumeMonth)
        .slice(0, 5);
    return collectionStore.collections
      .sort((itemB, itemA) => itemA.totalVolume - itemB.totalVolume)
      .slice(0, 5);
  }, [collectionStore, topCategoryDuration]);

  return (
    <div className="flex flex-col md:flex-row gap-y-4 gap-x-12">
      <div className="flex w-full flex-col rounded-lg border-2 border-tezCyan recommended-sale-component">
        <div className="flex border-b-2 border-b-tezCyan p-4 items-center">
          <span className="size-1">💯 Top Categories</span>
          <select
            className="ml-auto"
            onChange={(e) => {
              setTopCategoryDuration(parseInt(e.target.value));
            }}
          >
            <option value={0}>24h</option>
            <option value={1}>30d</option>
            <option value={2}>all time</option>
          </select>
        </div>
        <div className="flex flex-col p-2">
          {recommendedSales.map((category, index) => {
            return (
              <LinkWithSearchParams
                to={{ pathname: `/collection/${category.slug}` }}
                key={index}
                className="px-3 py-2 hover:bg-white/10 flex items-center cursor-pointer rounded-lg duration-100"
              >
                <div className="rounded-full w-9 h-9 bg-tezGr flex items-center justify-center tracking-tight font-oswald">
                  {category.avatar}
                </div>
                <span className="ml-4">{category.label}</span>
                <span className="ml-auto">
                  {topCategoryDuration === 0
                    ? category.volumeDay.toFixed(2)
                    : topCategoryDuration === 1
                    ? category.volumeMonth.toFixed(2)
                    : category.totalVolume.toFixed(2)}{" "}
                  ꜩ
                </span>
              </LinkWithSearchParams>
            );
          })}
        </div>
      </div>
      <div className="flex w-full flex-col rounded-lg border-2 border-tezCyan recommended-sale-component">
        <div className="flex border-b-2 border-b-tezCyan p-4 items-center">
          <span className="size-1">💰 Top Sales</span>
          <select
            className="ml-auto"
            onChange={(e) => setCurrentDuration(parseInt(e.target.value))}
          >
            {TOP_SALE_DURATIONS.map((item, index) => (
              <option key={index} value={index}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col p-2">
          {topSaleDomains[currentDuration]?.map((domain, index) => {
            return (
              <LinkWithSearchParams
                key={index}
                to={{
                  pathname: `/domain/${domain.name}`,
                }}
                className="px-3 py-2 hover:bg-white/10 flex items-center cursor-pointer rounded-lg duration-100"
              >
                <div className="rounded-full w-9 h-9 bg-white/10 flex items-center justify-center tracking-tight font-oswald">
                  <img src={tezosCollectLogo} className="w-5" />
                </div>
                <span className="ml-4">{domain.name}.tez</span>
                <span className="ml-auto">
                  {domain.lastSoldAmount?.toFixed(2)} ꜩ
                </span>
              </LinkWithSearchParams>
            );
          })}
        </div>
      </div>
      <div className="flex w-full flex-col rounded-lg border-2 border-tezCyan recommended-sale-component">
        <div className="flex border-b-2 border-b-tezCyan p-4 items-center">
          <span className="size-1 my-2">💎 Featured Auctions</span>
        </div>
        <div className="flex flex-col p-2">
          {featuredAuctions.map((domain, index) => {
            return (
              <LinkWithSearchParams
                to={{
                  pathname: `/domain/${domain.name}`,
                }}
                key={index}
                className="px-3 py-2 hover:bg-white/10 flex items-center cursor-pointer rounded-lg duration-100"
              >
                <div className="rounded-full w-9 h-9 bg-white/10 flex items-center justify-center tracking-tight font-oswald">
                  <img src={tezosCollectLogo} className="w-5" />
                </div>
                <span className="ml-4">{domain.name}.tez</span>
                <span className="ml-4">
                  {convertNum2DateString(
                    (domain.auctionEndsAt.getTime() - new Date().getTime()) /
                      1000
                  )}
                </span>
                <span className="ml-auto">{domain.topBid.toFixed(2)} ꜩ</span>
              </LinkWithSearchParams>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecommendedSales;

const featuredAuctions = [
  {
    name: "036.tez",
    remainigSeconds: 100000,
    link: "10k-club",
    value: "83.818 ꜩ ",
  },
  {
    name: "037.tez",
    remainigSeconds: 100000,
    link: "10k-club",
    value: "71.650 ꜩ",
  },
  {
    name: "038.tez",
    remainigSeconds: 100000,
    link: "10k-club",
    value: "83.818 ꜩ ",
  },
  {
    name: "039.tez",
    remainigSeconds: 100000,
    link: "10k-club",
    value: "83.818 ꜩ ",
  },
];
