import { useEffect, useState } from "react";
import tezosPunk from "assets/images/tezos-punk.webp";
import TextCopier from "components/UI/TextCopier";
import { AiOutlineEdit } from "react-icons/ai";
import { useTezosCollectStore } from "store";
import { useParams } from "react-router-dom";
import { I_PROFILE } from "helper/interfaces";
import EditProfileModal from "components/EditProfileModal";
const ProfileCard = () => {
  const { address } = useParams();
  const {
    profile: myProfile,
    activeAddress,
    fetchProfile,
    contractReady,
  } = useTezosCollectStore();
  const [profile, setProfile] = useState<I_PROFILE>({
    address: "",
    avatarLink: "",
    holding: 0,
    totalVolume: 0,
    bookmarkedNames: [],
  });

  const [editProfileModalVisible, setEditProfileModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    if (contractReady === false) return;
    if (address && address !== activeAddress) {
      fetchProfile(address).then((_profile) => setProfile(_profile));
    }
    if (address === activeAddress && myProfile.address === address) {
      setProfile(myProfile);
    }
  }, [myProfile, address, activeAddress, contractReady]);

  return (
    <div className="rounded-lg flex flex-col md:flex-row gap-8 items-center p-6 bg-componentBg">
      <EditProfileModal
        editProfileModalVisible={editProfileModalVisible}
        setEditProfileModalVisible={setEditProfileModalVisible}
      />
      <img
        src={profile.avatarLink ? profile.avatarLink : tezosPunk}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = tezosPunk;
        }}
        className="w-32 h-32 rounded-lg"
      />
      <div className="flex flex-col h-full">
        <h3 className="font-semibold">{profile.reversedName}</h3>
        <div className="mt-4">
          <p className="text-grayText">Address</p>
          <div className="flex gap-2 items-start w-72">
            <span className="w-60 break-all">{profile.address}</span>
            <TextCopier text={profile.address} />
          </div>
        </div>
      </div>
      <div className="mx-auto flex gap-8 md:gap-16">
        <div className="text-center">
          <h3>{profile.holding}</h3>
          <span className="text-grayText">Domains</span>
        </div>
        <div className="w-[2px] bg-itemBorder" />
        <div className="text-center">
          <h3>{profile.totalVolume} ꜩ</h3>
          <span className="text-grayText">Trading Volume</span>
        </div>
      </div>
      {address === activeAddress && (
        <button
          className="flex gap-2 items-center border-2 hover:bg-white/5"
          onClick={() => setEditProfileModalVisible(true)}
        >
          <AiOutlineEdit size={24} />
          Edit Profile
        </button>
      )}
    </div>
  );
};
export default ProfileCard;
