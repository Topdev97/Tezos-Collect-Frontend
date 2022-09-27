import LinkWithSearchParams from "components/LinkWithSearchParams";
import tezosCollectLogo from "assets/images/tezos-collect-logo.svg";
import { convertNum2DateString } from "helper/formatters";

const RecommendedSales = () => {
  return (
    <div className="flex flex-col md:flex-row gap-y-4 gap-x-12">
      <div className="flex w-full flex-col rounded-lg border-2 border-tezCyan recommended-sale-component">
        <div className="flex border-b-2 border-b-tezCyan p-4 items-center">
          <span className="size-1">Top Categories</span>
          <select className="ml-auto">
            <option>24h</option>
          </select>
        </div>
        <div className="flex flex-col p-2">
          {recommendedSales.map((category, index) => {
            return (
              <div
                key={index}
                className="px-3 py-2 hover:bg-white/10 flex items-center cursor-pointer rounded-lg duration-100"
              >
                <div className="rounded-full w-9 h-9 bg-tezGr flex items-center justify-center tracking-tight font-oswald">
                  {category.avatar}
                </div>
                <span className="ml-4">{category.name}</span>
                <span className="ml-auto">{category.value}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex w-full flex-col rounded-lg border-2 border-tezCyan recommended-sale-component">
        <div className="flex border-b-2 border-b-tezCyan p-4 items-center">
          <span className="size-1">Top Sales</span>
          <select className="ml-auto">
            <option>24h</option>
          </select>
        </div>
        <div className="flex flex-col p-2">
          {topSales.map((category, index) => {
            return (
              <div
                key={index}
                className="px-3 py-2 hover:bg-white/10 flex items-center cursor-pointer rounded-lg duration-100"
              >
                <div className="rounded-full w-9 h-9 bg-white/10 flex items-center justify-center tracking-tight font-oswald">
                  <img src={tezosCollectLogo} className="w-5" />
                </div>
                <span className="ml-4">{category.name}</span>
                <span className="ml-auto">{category.value}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex w-full flex-col rounded-lg border-2 border-tezCyan recommended-sale-component">
        <div className="flex border-b-2 border-b-tezCyan p-4 items-center">
          <span className="size-1">Featured Auctions</span>
          <select className="ml-auto">
            <option>24h</option>
          </select>
        </div>
        <div className="flex flex-col p-2">
          {featuredAuctions.map((category, index) => {
            return (
              <div
                key={index}
                className="px-3 py-2 hover:bg-white/10 flex items-center cursor-pointer rounded-lg duration-100"
              >
                <div className="rounded-full w-9 h-9 bg-white/10 flex items-center justify-center tracking-tight font-oswald">
                  <img src={tezosCollectLogo} className="w-5" />
                </div>
                <span className="ml-4">{category.name}</span>
                <span className="ml-4">
                  {convertNum2DateString(category.remainigSeconds)}
                </span>
                <span className="ml-auto">{category.value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecommendedSales;

const recommendedSales = [
  {
    avatar: "100K",
    name: "10k Club",
    link: "10k-club",
    value: "83.818 ꜩ ",
  },
  {
    avatar: "999",
    name: "999 Club",
    link: "10k-club",
    value: "83.818 ꜩ ",
  },
  {
    avatar: "100K",
    name: "100k Club",
    link: "10k-club",
    value: "83.818 ꜩ ",
  },
  {
    avatar: "ABC",
    name: "3 Letters",
    link: "10k-club",
    value: "83.818 ꜩ ",
  },
];

const topSales = [
  {
    name: "026.tez",
    link: "10k-club",
    value: "83.818 ꜩ ",
  },
  {
    name: "027.tez",
    link: "10k-club",
    value: "71.650 ꜩ",
  },
  {
    name: "028.tez",
    link: "10k-club",
    value: "83.818 ꜩ ",
  },
  {
    name: "029.tez",
    link: "10k-club",
    value: "83.818 ꜩ ",
  },
];

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
