import { useState } from "react";
import { TYPE_DOMAIN } from "helper/interfaces";
import AceModal from "components/UI/AceModal";
import AceModalCloseButton from "components/UI/AceModal/AceModalCloseButton";

type ITxSuccessModalProps = {
  txSuccessModalVisible: boolean;
  setTxSuccessModalVisible: any;
  txHash: string;
};

const PlaceBidModal = ({
  txSuccessModalVisible,
  setTxSuccessModalVisible,
  txHash,
}: ITxSuccessModalProps) => {
  return (
    <div className="z-30">
      <AceModal
        modalVisible={txSuccessModalVisible}
        setModalVisible={setTxSuccessModalVisible}
        drawAlign="D_CENTER"
      >
        <div className="p-8 flex flex-col gap-4 w-[25rem]"></div>
      </AceModal>
    </div>
  );
};
export default PlaceBidModal;
