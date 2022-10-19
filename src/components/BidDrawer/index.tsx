import { useState } from "react";
import AceDrawer from "components/UI/AceDrawer";
import { TYPE_DOMAIN } from "helper/interfaces";
import { TbHeart } from "react-icons/tb";

import tezosCollectLogo from "assets/images/tezos-collect-logo.svg";
import tezosPunk from "assets/images/tezos-punk.png";
import { useTezosCollectStore } from "store";
import { beautifyAddress, timerDifFromNow } from "helper/formatters";
import TezosTimer from "components/UI/TezosTimer";

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

  const { setPlaceBidModal, bookmarkedNames, toggleBookmark } =
    useTezosCollectStore();

  const onPlaceBid = () => {
    setPlaceBidModal({
      visible: true,
      tokenId: drawerDomain?.tokenId || 0,
      topBid: Math.max(drawerDomain?.topBid || 0, drawerDomain?.price || 0),
      callback: null,
    });
  };

  return (
    <>
      <AceDrawer
        drawerVisible={bidDrawerVisible}
        setDrawerVisible={setBidDrawerVisible}
        drawAlign="D_RIGHT"
      >
        <div className="flex flex-col p-6 gap-4 w-96">
          <div className="bg-tezDarkBg rounded-lg p-4 flex flex-col items-center aspect-[4/3]">
            <TbHeart
              onClick={() => toggleBookmark(drawerDomain?.name || "")}
              className={`size-2 ml-auto cursor-pointer duration-150 hover:stroke-tezGrSt mr-0.5 ${
                bookmarkedNames.includes(drawerDomain?.name || "")
                  ? "stroke-tezGrSt fill-tezGrSt"
                  : ""
              }`}
            />
            <img src={tezosCollectLogo} className="w-32 my-4" />
            <span className="size-2 mb-6">{drawerDomain?.name}.tez</span>
          </div>
          <h4>{drawerDomain?.name}.tez</h4>
          <div className="flex flex-col gap-2">
            <span className="text-grayText size-sm">Owner</span>
            <div className="flex gap-3">
              <img src={tezosPunk} className="w-12 rounded-full" />
              <div>
                <span>{beautifyAddress(drawerDomain?.owner || "")}</span>
                <br />
                <span className="text-grayText size-sm">
                  {beautifyAddress(drawerDomain?.owner || "")}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-tezDarkBg rounded-lg p-4 flex">
            <div className="flex flex-1 flex-col gap-2 items-center">
              <span className="text-grayText size-sm">Current Bid</span>
              <span className="text-tezLightGr">
                {drawerDomain?.topBid.toFixed(2)} ꜩ
              </span>
              <span className="size-sm">$ 1802.42</span>
            </div>
            <div className="border-r-2 border-r-itemBorder" />
            <div className="flex flex-1 flex-col gap-2 items-center">
              <span className="text-grayText size-sm">Ending in</span>
              <span className="text-tezLightGr">
                <TezosTimer
                  to={drawerDomain?.auctionEndsAt || new Date()}
                  formatter={timerDifFromNow}
                />
              </span>
              <span className="size-sm">Day H:M:S</span>
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
              <span className="text-tezLightGr">
                {(
                  Math.max(
                    drawerDomain?.topBid || 0,
                    drawerDomain?.price || 0
                  ) * 1.1
                ).toFixed(2)}{" "}
                ꜩ
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-grayText size-sm">Minimum Increment</span>
              <span className="text-tezLightGr">
                {(
                  Math.max(
                    drawerDomain?.topBid || 0,
                    drawerDomain?.price || 0
                  ) * 0.1
                ).toFixed(2)}{" "}
                ꜩ
              </span>
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
