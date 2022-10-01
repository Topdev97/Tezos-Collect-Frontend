import { useState } from "react";
import AceModal from "components/UI/AceModal";
import txFailedImg from "assets/images/market/tx-failed.png";
import { useTezosCollectStore } from "store";

const TxFailedModal = () => {
  const currentTransaction = useTezosCollectStore(
    (state) => state.currentTransaction
  );
  const setCurrentTransaction = useTezosCollectStore(
    (state) => state.setCurrentTransaction
  );
  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const onCloseModal = () => {
    setModalVisible(false);
    setCurrentTransaction({
      txHash: currentTransaction.txHash,
      txStatus: "TX_SUCCESS",
    });
  };
  return (
    <AceModal
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      drawAlign="D_CENTER"
      zIndex={25}
    >
      <div className="p-8 flex flex-col items-center gap-4 w-[25rem]">
        <img className="w-24 my-8" src={txFailedImg} />
        <span className="font-semibold size-2">Transaction failed!</span>
        <span className="text-grayText size-sm text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum.
        </span>
        <div className="flex  mt-4">
          <a
            className="button tezGr-button w-40"
            href={`https://ghostnet.tzkt.io/${currentTransaction.txHash}`}
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
export default TxFailedModal;
