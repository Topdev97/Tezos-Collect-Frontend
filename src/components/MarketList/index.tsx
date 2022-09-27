import { Route, Routes } from "react-router-dom";
import AllListings from "./AllListings";
const MarketList = () => {
  return (
    <Routes>
      <Route path="all" element={<AllListings />} />
    </Routes>
  );
};

export default MarketList;

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
