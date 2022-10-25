import TezosCollectCard from "assets/images/landing/tezos-collect-card.png";
import RecommendedSales from "components/RecommendedSales";
import TopCategories from "components/LandingTopCategories";
import { useTezosCollectStore } from "store";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import LinkWithSearchParams from "components/LinkWithSearchParams";
const Home = () => {
  const { collectionStore, activeAddress } = useTezosCollectStore();
  const domainInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col-reverse md:flex-row">
        <div className="flex flex-col gap-4 md:pt-16">
          <h1 className="font-playfair leading-snug">
            find your{" "}
            <strong className="text-tezGr underline-double-curve">web3</strong>
            <br /> identity
          </h1>
          <span className="text-tezText size-sm md:size-1 py-4">
            Use names like alice.tez instead of addresses like
            <br />
            tz1VBLpuDKMoJuHRLZ4HrCgRuiLpEr7zZx2E
          </span>
          <div className="flex gap-8 items-end">
            {/* <div className="flex flex-col">
              <span>Search Domain</span>
              <input
                placeholder="Type your perfect domain"
                className="mt-4 w-48 md:w-80 input-light"
                ref={domainInputRef}
              />
            </div> */}
            {/* <div className="flex flex-col">
              <span>Categories</span>
              <select id="states" className="select-light w-full mt-4 p-3">
                <option>All types</option>
                {collectionStore.collections.map((item, index) => (
                  <option key={index}>{item.slug}</option>
                ))}
              </select>
            </div> */}
            <button
              className="tezGr-button p-0.5"
              onClick={() => {
                if (activeAddress)
                  navigate(`/profile/${activeAddress}/holdings`);
                else document.getElementById("collect_wallet")?.click();
              }}
            >
              <span className="bg-tezDarkBg rounded-lg p-2.5">List Domain</span>
            </button>
            <LinkWithSearchParams
              className="button tezGr-button py-3"
              to={{
                pathname: "/market/all",
              }}
            >
              {/* <FiSearch size={24} /> */}
              Explore
            </LinkWithSearchParams>
          </div>
        </div>
        <div className="ml-auto relative">
          <div className="card-blur-bg w-48 h-48 absolute top-1/2 left-1/2 md:-translate-x-1/2 md:-translate-y-1/2" />
          <img
            className="mx-auto w-1/2 md:w-3/4 relative z-[1]"
            src={TezosCollectCard}
          />
        </div>
      </div>
      <RecommendedSales />
      <TopCategories />
    </div>
  );
};

export default Home;
