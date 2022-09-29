import { useState } from "react";
import { TYPE_DOMAIN } from "helper/interfaces";
import AceModal from "components/UI/AceModal";
import AceModalCloseButton from "components/UI/AceModal/AceModalCloseButton";

type IPlaceBidModalProps = {
  placeBidModalVisible: boolean;
  setplaceBidModalVisible: any;
  drawerDomain: TYPE_DOMAIN | undefined;
};

type T_BIDSTAGE = "BID_" | "TAB_BIDS" | "TAB_HISTORY";

const PlaceBidModal = ({
  placeBidModalVisible,
  setplaceBidModalVisible,
  drawerDomain = undefined,
}: IPlaceBidModalProps) => {
  const [bidStage, setBidStage] = useState<T_BIDSTAGE>("TAB_BIDS");
  return (
    <div className="z-30">
      <AceModal
        modalVisible={placeBidModalVisible}
        setModalVisible={setplaceBidModalVisible}
        drawAlign="D_CENTER"
      >
        <div className="p-8 flex flex-col gap-4 w-[25rem]">
          <div className="flex items-center">
            <span className="size-1">Place a Bid</span>
            <AceModalCloseButton setModalVisible={setplaceBidModalVisible} />
          </div>
          <span className="text-grayText">
            You must bid at least{" "}
            <span className="text-white">{drawerDomain?.price} ꜩ</span>
          </span>
          <input
            className="bg-tezDarkBg border-inputBorder"
            placeholder="Enter Amount"
          />
          <div className="h-[2px] bg-componentBorder my-2" />
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-grayText">Your Balance</span>
              <span className="font-semibold">12.251 ꜩ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-grayText">Service Fee</span>
              <span className="font-semibold">0.05 ꜩ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-grayText">Total bid amount</span>
              <span className="font-semibold">2.301 ꜩ</span>
            </div>
          </div>

          <button className="tezGr-button py-3">Place Bid</button>
        </div>
      </AceModal>
    </div>
  );
};
export default PlaceBidModal;
