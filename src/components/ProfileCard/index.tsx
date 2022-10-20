import { useEffect, useState } from "react";
import tezosPunk from "assets/images/tezos-punk.png";
import TextCopier from "components/UI/TextCopier";
import { AiOutlineEdit } from "react-icons/ai";
import { useTezosCollectStore } from "store";
const ProfileCard = () => {
  const { profile } = useTezosCollectStore();
  return (
    <div className="rounded-lg flex flex-col md:flex-row gap-8 items-center p-6 bg-componentBg">
      <img src={tezosPunk} className="w-32" />
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
      <button className="flex gap-2 items-center border-2 hover:bg-white/5">
        <AiOutlineEdit size={24} />
        Edit Profile
      </button>
    </div>
  );
};
export default ProfileCard;
