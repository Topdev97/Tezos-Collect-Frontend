import { useState } from "react";
import AceModal from "components/UI/AceModal";
import { ReactComponent as TxWaitingSvg } from "assets/images/market/tx-waiting.svg";
import { useTezosCollectStore } from "store";
// import { TEZOS_COLLECT_NETWORK } from "helper/constants";

const TxSubmitModal = () => {
  const currentTransaction = useTezosCollectStore(
    (state) => state.currentTransaction
  );
  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const onCloseModal = () => {
    setModalVisible(false);
  };
  return (
    <AceModal
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      drawAlign="D_CENTER"
      zIndex={25}
    >
      <div className="p-8 flex flex-col items-center gap-4 w-[25rem]">
        <TxWaitingSvg className="w-36 h-36 my-4" />
        <span className="font-semibold size-2">Transaction Confirmed!</span>
        <span className="text-grayText size-sm">
          Your transaction is pending confirmation.
        </span>
        <div className="flex  mt-4">
          <a
            className="button tezGr-button w-40"
            href={`https://tzkt.io/${currentTransaction.txHash}`}
            target="_blank"
          >
            Explore
          </a>

          <button className="ml-4 hover-bg-tezGr w-40" onClick={onCloseModal}>
            Close
          </button>
        </div>
      </div>
    </AceModal>
  );
};
export default TxSubmitModal;
