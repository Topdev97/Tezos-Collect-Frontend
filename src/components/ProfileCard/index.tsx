import tezosPunk from "assets/images/tezos-punk.png";
import TextCopier from "components/UI/TextCopier";
import { AiOutlineEdit } from "react-icons/ai";
const ProfileCard = () => {
  const address = "tz1aSjTFeHjd5zhrbE1JEvrEnkA1TiKmPwwF";
  return (
    <div className="rounded-lg flex flex-col md:flex-row gap-8 items-center p-6 bg-componentBg">
      <img src={tezosPunk} className="w-32" />
      <div className="flex flex-col h-full">
        <h3 className="font-semibold">080.tez</h3>
        <div className="mt-4">
          <p className="text-grayText">Address</p>
          <div className="flex gap-2 items-start">
            <span className="w-60 break-all">{address}</span>
            <TextCopier text={address} />
          </div>
        </div>
      </div>
      <div className="mx-auto flex gap-8 md:gap-16">
        <div className="text-center">
          <h3>25k</h3>
          <span className="text-grayText">Followers</span>
        </div>
        <div className="w-[2px] bg-itemBorder" />
        <div className="text-center">
          <h3>15</h3>
          <span className="text-grayText">Following</span>
        </div>
      </div>
      <button className="flex gap-2 items-center border-2 hover:bg-white/5">
        <AiOutlineEdit size={24} />
        Edit Profile
      </button>
    </div>
  );
};
export default ProfileCard;
