import LinkWithSearchParams from "components/LinkWithSearchParams";
import MarketList from "components/MarketList";
import RecommendedSales from "components/RecommendedSales";
const Market = () => {
  return (
    <div className="flex flex-col gap-8 my-8">
      <RecommendedSales />
      <div className="flex gap-3 lg:justify-between mt-4 overflow-x-auto">
        {MARKET_LIST.map((link, index) => (
          <LinkWithSearchParams
            key={index}
            className={({ isActive }: { isActive: boolean }) =>
              `button hover-bg-tezGr whitespace-nowrap ${
                isActive ? "bg-tezGr outline-0 text-white " : ""
              }`
            }
            to={{
              pathname: link.path,
            }}
          >
            {link.text}
          </LinkWithSearchParams>
        ))}
      </div>
      <MarketList />
    </div>
  );
};

export default Market;

const MARKET_LIST = [
  {
    path: "/market/all",
    text: "All Listings",
  },
  {
    path: "/market/top-categories",
    text: "Top Categories",
  },
  {
    path: "/market/top-sales",
    text: "Top Last Sales",
  },
  {
    path: "/market/last-sale",
    text: "Last Sale",
  },
  {
    path: "/market/new-listings",
    text: "New Listings",
  },
  {
    path: "/market/top-bids",
    text: "Top Bids",
  },
  {
    path: "/market/new-bids",
    text: "New Bids",
  },
  {
    path: "/market/registrations",
    text: "New Registrations",
  },
  {
    path: "/market/expiring",
    text: "Expiring",
  },
  {
    path: "/market/expired",
    text: "Expired",
  },
];
