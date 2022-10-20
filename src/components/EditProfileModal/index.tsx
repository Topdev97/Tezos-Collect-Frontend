import AceModal from "components/UI/AceModal";
import AceModalCloseButton from "components/UI/AceModal/AceModalCloseButton";
import ImageDropZone from "components/UI/ImageDropZone";
import { updateAvatarByAddress } from "helper/api/profile.api";
import { TEZOS_COLLECT_WALLET } from "helper/constants";
import { pinToIpfs } from "helper/utils";
import { useState } from "react";
import { useTezosCollectStore } from "store";

interface IEditProfileModalProps {
  editProfileModalVisible: boolean;
  setEditProfileModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditProfileModal = ({
  editProfileModalVisible,
  setEditProfileModalVisible,
}: IEditProfileModalProps) => {
  const { requestSignMessage, activeAddress, fetchProfile } =
    useTezosCollectStore();
  const [imageObject, setImageObject] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const onUploadImage = async () => {
    if (imageObject) {
      setLoading(true);
      try {
        const cid = await pinToIpfs(imageObject);
        const { signature, payloadBytes, publicKey } = await requestSignMessage(
          cid
        );
        await updateAvatarByAddress(
          activeAddress,
          payloadBytes,
          `https://${cid}.ipfs.nftstorage.link`,
          signature,
          publicKey
        );
        setLoading(false);
        await fetchProfile(activeAddress);
        setEditProfileModalVisible(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };
  return (
    <div className="z-30">
      <AceModal
        modalVisible={editProfileModalVisible}
        setModalVisible={setEditProfileModalVisible}
        drawAlign="D_CENTER"
        zIndex={25}
      >
        <div className="p-6 flex flex-col gap-4 w-72">
          <div className="flex items-center">
            <span className="size-1">Upload Image</span>
            <AceModalCloseButton setModalVisible={setEditProfileModalVisible} />
          </div>
          <div className="w-48 h-48 mx-auto my-4">
            <ImageDropZone
              imageObject={imageObject}
              setImageObject={setImageObject}
            />
          </div>
          <button
            className="tezGr-button"
            onClick={onUploadImage}
            disabled={loading}
          >
            Submit
          </button>
        </div>
      </AceModal>
    </div>
  );
};
export default EditProfileModal;
