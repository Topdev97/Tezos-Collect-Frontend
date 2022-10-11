import { useState } from "react";
import AceModal from "components/UI/AceModal";
import txSuccessImg from "assets/images/market/tx-success.png";
import { useTezosCollectStore } from "store";
import { TEZOS_COLLECT_NETWORK } from "helper/constants";

const TxSuccessModal = () => {
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
      txStatus: "TX_NONE",
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
        <img className="w-24 h-24 my-8" src={txSuccessImg} />
        <span className="font-semibold size-2">Transaction Success!</span>
        <span className="text-grayText size-sm text-center">
          Your transaction is successfully included in Tezos blockchain.
        </span>
        <div className="flex  mt-4">
          <a
            className="button tezGr-button w-40"
            href={`https://${TEZOS_COLLECT_NETWORK.type}.tzkt.io/${currentTransaction.txHash}`}
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
export default TxSuccessModal;
