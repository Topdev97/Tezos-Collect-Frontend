import { useRef, useState } from "react";
import AceModal from "components/UI/AceModal";
import AceModalCloseButton from "components/UI/AceModal/AceModalCloseButton";
import { MARKETPLACE_AUCTION_DURATIONS } from "helper/constants";
import { useTezosCollectStore } from "store";
import { DateTimePicker } from "react-rainbow-components";

const OpenAuctionModal = () => {
  const { openAuctionModal, setOpenAuctionModalVisible, listForAuction } =
    useTezosCollectStore();
  // const auctionDurationRef = useRef<HTMLSelectElement>(null);
  const startingAmountRef = useRef<HTMLInputElement>(null);

  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(
    new Date(new Date().getTime() + 600 * 1000)
  );

  const onOpenAuction = async () => {
    if (parseFloat(startingAmountRef.current?.value || "0.0") < 1) return;
    await listForAuction(
      openAuctionModal.tokenId,
      openAuctionModal.includingOperator,
      parseFloat(startingAmountRef.current?.value || "0.0"),
      startTime,
      endTime
    );
    if (openAuctionModal.callback) openAuctionModal.callback();
  };
  return (
    <AceModal
      modalVisible={openAuctionModal.visible}
      setModalVisible={setOpenAuctionModalVisible}
      drawAlign="D_CENTER"
      zIndex={25}
    >
      <div className="p-8 flex flex-col gap-4 w-[25rem]">
        <div className="flex items-center">
          <span className="size-1">Open New Auction</span>
          <AceModalCloseButton setModalVisible={setOpenAuctionModalVisible} />
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <span>
            Starting Amount (ꜩ) <span className="text-tezWarning">*</span>
          </span>
          <input
            className="border mb-4"
            placeholder="0.0"
            ref={startingAmountRef}
          />

          <span>Select starting time</span>
          <DateTimePicker value={startTime} onChange={setStartTime} />
          <span>
            Select ending time
            <span className="size-xs text-tezWarning">
              {" *"}
              (10 mins ~ one month)
            </span>
          </span>
          <DateTimePicker value={endTime} onChange={setEndTime} />
        </div>
        <div className="flex flex-col gap-1">
          {/* <div className="flex">
            <span className="text-grayText">Marketplace Fee</span>
            <span className="ml-auto">{MARKETPLACE_FEE}</span>
          </div> */}
          <div className="h-[1px] bg-grayText" />
          <span className="text-tezWarning">Minimum starting amout is 1 ꜩ</span>
        </div>
        <button className="tezGr-button" onClick={onOpenAuction}>
          List for Auction
        </button>
      </div>
    </AceModal>
  );
};
export default OpenAuctionModal;
