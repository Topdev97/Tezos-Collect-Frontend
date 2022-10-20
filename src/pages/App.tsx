import { useEffect } from "react";
import { Route, Router, Routes, useLocation } from "react-router-dom";

import Footer from "components/Footer";
import Header from "components/Header";
import Auctions from "./Auctions";
import DomainDetails from "./DomainDetails";
import Home from "./Home";
import Market from "./Market";
import Profile from "./Profile";
import { useTezosCollectStore } from "store";
import ModalsAndDrawers from "components/ModalsAndDrawers";

const App = () => {
  const { pathname } = useLocation();

  const {
    initializeContracts,
    fetchCollections,
    fetchTopSaleDomains,
    fetchAuctionedDomains,
    fetchFeaturedAuctions,
    activeAddress,
    contractReady,
    fetchProfile,
  } = useTezosCollectStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    initializeContracts();
    fetchCollections();
    fetchTopSaleDomains();
    fetchAuctionedDomains();
    fetchFeaturedAuctions();
  }, []);
  useEffect(() => {
    if (activeAddress && contractReady) {
      fetchProfile(activeAddress);
    }
  }, [activeAddress, contractReady]);

  return (
    <>
      <Header />
      <div className="main-container">
        <ModalsAndDrawers />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tokens" element={"tokens"} />
          <Route path="/market/*" element={<Market />} />
          <Route path="/domain/:domain" element={<DomainDetails />} />
          <Route path="/auction" element={<Auctions />} />
          <Route path="/profile/:address/*" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};
export default App;
