import { useState } from "react";
import AceDrawer from "components/UI/AceDrawer";
import { TYPE_DOMAIN } from "helper/interfaces";
import { TbHeart } from "react-icons/tb";

import tezosCollectLogo from "assets/images/tezos-collect-logo.svg";
import tezosPunk from "assets/images/tezos-punk.png";
import PlaceBidModal from "components/PlaceBidModal";

type IBidDrawerProps = {
  bidDrawerVisible: boolean;
  setBidDrawerVisible: any;
  drawerDomain: TYPE_DOMAIN | undefined;
};

type T_TABID = "TAB_DETAILS" | "TAB_BIDS" | "TAB_HISTORY";

const BidDrawer = ({
  bidDrawerVisible,
  setBidDrawerVisible,
  drawerDomain = undefined,
}: IBidDrawerProps) => {
  const [activeTab, setActiveTab] = useState<T_TABID>("TAB_DETAILS");

  const [placeBidModalVisible, setPlaceBidModalVisible] =
    useState<boolean>(false);
  const onPlaceBid = () => {
    setPlaceBidModalVisible(true);
  };

  return (
    <>
      <PlaceBidModal
        drawerDomain={drawerDomain}
        placeBidModalVisible={placeBidModalVisible}
        setplaceBidModalVisible={setPlaceBidModalVisible}
      />
      <AceDrawer
        drawerVisible={bidDrawerVisible}
        setDrawerVisible={setBidDrawerVisible}
        drawAlign="D_RIGHT"
      >
        <div className="flex flex-col p-6 gap-4 w-96">
          <div className="bg-tezDarkBg rounded-lg p-4 flex flex-col items-center aspect-[4/3]">
            <TbHeart
              className={`size-2 ml-auto cursor-pointer duration-150 hover:stroke-tezGrSt mr-0.5 ${
                drawerDomain?.bookmarked ? "stroke-tezGrSt fill-tezGrSt" : ""
              }`}
            />
            <img src={tezosCollectLogo} className="w-32 my-4" />
            <span className="size-2 mb-6">{drawerDomain?.name}</span>
          </div>
          <h4>{drawerDomain?.name}</h4>
          <div className="flex flex-col gap-2">
            <span className="text-grayText size-sm">Owner</span>
            <div className="flex gap-3">
              <img src={tezosPunk} className="w-12 rounded-full" />
              <div>
                <span>{drawerDomain?.owner}</span>
                <br />
                <span className="text-grayText size-sm">
                  {drawerDomain?.owner}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-tezDarkBg rounded-lg p-4 flex gap-8">
            <div className="flex flex-1 flex-col gap-2">
              <span className="text-grayText size-sm">Current Bid</span>
              <span className="text-tezGr">{drawerDomain?.price} ꜩ</span>
              <span className="size-sm">$ 1802.42</span>
            </div>
            <div className="border-r-2 border-r-itemBorder" />
            <div className="flex flex-1 flex-col gap-2 items-center">
              <span className="text-grayText size-sm"> Ending in</span>
              <span className="text-tezLightGr">01 : 44 : 33</span>
              <span className="size-sm">Hrs Mins Secs</span>
            </div>
          </div>
          <div className="flex">
            {additionalTabs.map((tab, index) => (
              <div
                className={`flex-1 font-semibold cursor-pointer hover:text-tezLightGr ${
                  tab.tabId === activeTab ? "text-tezLightGr" : "text-tezText"
                } `}
                key={index}
                onClick={() => setActiveTab(tab.tabId)}
              >
                <div className="p-2 text-center">{tab.label}</div>
                <div
                  className={`h-[2px] ${
                    tab.tabId === activeTab ? "bg-tezLightGr" : "bg-tezText"
                  } `}
                ></div>
              </div>
            ))}
          </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis.
            <br />
            <br />
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos. Curabitur tempus urna at turpis condimentum
            lobortis.
          </div>
          <div className="flex justify-between border-y-2 border-y-componentBorder py-4">
            <div className="flex flex-col gap-2">
              <span className="text-grayText size-sm">Minimum Bid</span>
              <span className="text-tezLightGr">{drawerDomain?.price} ꜩ</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-grayText size-sm">Minimum Increment</span>
              <span className="text-tezLightGr">{drawerDomain?.price} ꜩ</span>
            </div>
          </div>

          <button className="tezGr-button" onClick={() => onPlaceBid()}>
            Place Bid
          </button>
        </div>
      </AceDrawer>
    </>
  );
};
export default BidDrawer;

const additionalTabs: { label: string; tabId: T_TABID }[] = [
  { label: "Details", tabId: "TAB_DETAILS" },
  { label: "Bids", tabId: "TAB_BIDS" },
  { label: "History", tabId: "TAB_HISTORY" },
];
