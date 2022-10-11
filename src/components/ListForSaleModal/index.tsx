import { useRef } from "react";
import AceModal from "components/UI/AceModal";
import AceModalCloseButton from "components/UI/AceModal/AceModalCloseButton";
// import {
//   MARKETPLACE_AUCTION_DURATIONS,
//   MARKETPLACE_FEE,
// } from "helper/constants";
import { useTezosCollectStore } from "store";

const ListForSaleModal = () => {
  const { listForSaleModal, setListForSaleModalVisible, listForSale } =
    useTezosCollectStore();
  // const auctionDurationRef = useRef<HTMLSelectElement>(null);
  const startingAmountRef = useRef<HTMLInputElement>(null);
  const onListForSale = async () => {
    if (parseFloat(startingAmountRef.current?.value || "0.0") < 1) return;
    await listForSale(
      listForSaleModal.tokenId,
      listForSaleModal.includingOperator,
      parseFloat(startingAmountRef.current?.value || "0.0")
      // parseInt(auctionDurationRef.current?.value || "0")
    );
    if (listForSaleModal.callback) listForSaleModal.callback();
  };
  return (
    <AceModal
      modalVisible={listForSaleModal.visible}
      setModalVisible={setListForSaleModalVisible}
      drawAlign="D_CENTER"
      zIndex={25}
    >
      <div className="p-8 flex flex-col gap-4 w-[25rem]">
        <div className="flex items-center">
          <span className="size-1">Sell {listForSaleModal.name}.tez</span>
          <AceModalCloseButton setModalVisible={setListForSaleModalVisible} />
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <span>
            Price (ꜩ) <span className="text-tezWarning">*</span>
          </span>
          <input
            className="border mb-4"
            placeholder="0.0"
            ref={startingAmountRef}
          />
          {/* <span>Listing expiration (optional)</span>
          <select className="border bg-componentBg" ref={auctionDurationRef}>
            {MARKETPLACE_AUCTION_DURATIONS.map((item, index) => (
              <option key={index} value={index}>
                {item.label}
              </option>
            ))}
          </select> */}
        </div>
        <div className="flex flex-col gap-1">
          <span>Fees</span>
          <ul className="size-sm font-normal">
            <li>- The listing is free!</li>
            <li>
              - At the time of sale a 2.5% platform fee will be deducated.
            </li>
          </ul>
          <span>Note</span>
          <ul className="size-sm font-normal">
            <li>- This domain remains yours until someone buys it.</li>
            <li>
              - if a reverse record is set on this domain, it will remain
              effective until the buyer changes it. In the meantime funds sent
              to demo.tez will continue to arrive in your wallet.
            </li>
          </ul>
        </div>
        <button className="tezGr-button" onClick={onListForSale}>
          Publish for Sale
        </button>
      </div>
    </AceModal>
  );
};
export default ListForSaleModal;
