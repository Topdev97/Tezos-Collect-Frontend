import { Route, Routes } from "react-router-dom";
import AllListings from "./AllListings";
import ExpiredDomains from "./ExpiredDomains";

import ExpiringDomains from "./ExpiringDomains";
import MarketLastSale from "./MarketLastSale";
import NewRegistrations from "./MarketLastSale/NewRegistrations";
import MarketNewBids from "./MarketNewBids";
import MarketNewListings from "./MarketNewListings";
import MarketTopBids from "./MarketTopBids";
import MarketTopCategories from "./MarketTopCategories";
import TopLastSales from "./TopLastSales";
const MarketList = () => {
  return (
    <Routes>
      <Route path="" element={<AllListings />} />
      <Route path="all" element={<AllListings />} />
      <Route path="top-categories" element={<MarketTopCategories />} />
      <Route path="top-sales" element={<TopLastSales />} />
      <Route path="last-sale" element={<MarketLastSale />} />
      <Route path="new-listings" element={<MarketNewListings />} />
      <Route path="top-bids" element={<MarketTopBids />} />
      <Route path="new-bids" element={<MarketNewBids />} />
      <Route path="registrations" element={<NewRegistrations />} />
      <Route path="expiring" element={<ExpiringDomains />} />
      <Route path="expired" element={<ExpiredDomains />} />
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
