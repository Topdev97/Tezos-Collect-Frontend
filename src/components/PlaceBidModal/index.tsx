import { useRef, useState } from "react";
import { TYPE_DOMAIN } from "helper/interfaces";
import AceModal from "components/UI/AceModal";
import AceModalCloseButton from "components/UI/AceModal/AceModalCloseButton";
import { useTezosCollectStore } from "store";

const PlaceBidModal = () => {
  const { activeAddress, placeBidModal, placeBid, setPlaceBidModalVisible } =
    useTezosCollectStore();
  const bidAmountRef = useRef<HTMLInputElement>(null);

  const onPlaceBidSubmit = async () => {
    await placeBid(
      placeBidModal.tokenId,
      parseFloat(bidAmountRef.current?.value || "0")
    );
    if (placeBidModal.callback) placeBidModal.callback();
  };
  return (
    <AceModal
      modalVisible={placeBidModal.visible}
      setModalVisible={setPlaceBidModalVisible}
      drawAlign="D_CENTER"
      zIndex={25}
    >
      <div className="p-8 flex flex-col gap-4 w-[25rem]">
        <div className="flex items-center">
          <span className="size-1">Place a Bid</span>
          <AceModalCloseButton setModalVisible={setPlaceBidModalVisible} />
        </div>
        <span className="text-grayText">
          You must bid at least{" "}
          <span className="text-white">
            {(placeBidModal.topBid * 1.1).toFixed(2)} ꜩ
          </span>
        </span>
        <input
          className="bg-tezDarkBg border-inputBorder"
          placeholder="Enter Amount"
          ref={bidAmountRef}
        />
        <div className="h-[2px] bg-componentBorder my-2" />
        {/* <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-grayText">Your Balance</span>
              <span className="font-semibold">12.251 ꜩ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-grayText">Total bid amount</span>
              <span className="font-semibold">2.301 ꜩ</span>
            </div>
          </div> */}

        <button
          className="tezGr-button py-3"
          onClick={() => onPlaceBidSubmit()}
        >
          Place Bid
        </button>
      </div>
    </AceModal>
  );
};
export default PlaceBidModal;
