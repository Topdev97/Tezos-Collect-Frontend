import LinkWithSearchParams from "components/LinkWithSearchParams";
import MarketList from "components/MarketList";
import RecommendedSales from "components/RecommendedSales";
const Market = () => {
  return (
    <div className="flex flex-col gap-8 my-8">
      <RecommendedSales />
      <div className="flex justify-between mt-4">
        {MARKET_LIST.map((link, index) => (
          <LinkWithSearchParams
            key={index}
            className={({ isActive }: { isActive: boolean }) =>
              `button hover-bg-tezGr ${
                isActive ? "bg-tezGr outline-0 text-white" : ""
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
    path: "/market/new",
    text: "New Listings",
  },
  {
    path: "/market/bids",
    text: "Top Bids",
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
