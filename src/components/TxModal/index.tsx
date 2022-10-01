import { useTezosCollectStore } from "store";
import TxFailedModal from "./TxFailedModal";
import TxSubmitModal from "./TxSubmitModal";
import TxSuccessModal from "./TxSuccessModal";

const TxModal = () => {
  const currentTransaction = useTezosCollectStore(
    (state) => state.currentTransaction
  );
  return (
    <div className="z-30">
      {currentTransaction.txStatus === "TX_SUBMIT" && <TxSubmitModal />}
      {currentTransaction.txStatus === "TX_FAILED" && <TxFailedModal />}
      {currentTransaction.txStatus === "TX_SUCCESS" && <TxSuccessModal />}
    </div>
  );
};
export default TxModal;
