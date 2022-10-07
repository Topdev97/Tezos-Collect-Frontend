import { useRef } from "react";
import AceModal from "components/UI/AceModal";
import AceModalCloseButton from "components/UI/AceModal/AceModalCloseButton";
import {
  MARKETPLACE_AUCTION_DURATIONS,
  MARKETPLACE_FEE,
} from "helper/constants";
import { useTezosCollectStore } from "store";

const MakeOfferModal = () => {
  const { makeOfferModal, setMakeOfferModalVisible, makeOfferToDomain } =
    useTezosCollectStore();
  const offerDurationRef = useRef<HTMLSelectElement>(null);
  const offerAmountRef = useRef<HTMLInputElement>(null);
  const onMakeOffer = async () => {
    await makeOfferToDomain(
      makeOfferModal.tokenId,
      parseFloat(offerAmountRef.current?.value || "0.0"),
      parseInt(offerDurationRef.current?.value || "0")
    );
    if (makeOfferModal.callback) makeOfferModal.callback();
  };
  return (
    <AceModal
      modalVisible={makeOfferModal.visible}
      setModalVisible={setMakeOfferModalVisible}
      drawAlign="D_CENTER"
      zIndex={25}
    >
      <div className="p-8 flex flex-col gap-4 w-[25rem]">
        <div className="flex items-center">
          <span className="size-1">Make an Offer</span>
          <AceModalCloseButton setModalVisible={setMakeOfferModalVisible} />
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <span>
            Offer Amount (ꜩ) <span className="text-tezWarning">*</span>
          </span>
          <input
            className="border mb-4"
            placeholder="0.0"
            ref={offerAmountRef}
          />
          <span>Bid Duration</span>
          <select className="border bg-componentBg" ref={offerDurationRef}>
            {MARKETPLACE_AUCTION_DURATIONS.map((item, index) => (
              <option key={index} value={index}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex">
            <span className="text-grayText">Marketplace Fee</span>
            <span className="ml-auto">{MARKETPLACE_FEE}</span>
          </div>
          <div className="h-[1px] bg-grayText" />
          <span className="text-tezWarning">Minimum offer amout is 1 ꜩ</span>
        </div>
        <button className="tezGr-button" onClick={onMakeOffer}>
          Make Offer
        </button>
      </div>
    </AceModal>
  );
};
export default MakeOfferModal;
