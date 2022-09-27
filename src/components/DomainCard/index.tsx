import { TbHeart } from "react-icons/tb";
import tezosCollectLogo from "assets/images/tezos-collect-logo.svg";
import { IoMdCart } from "react-icons/io";

const DomainCard = (props: {
  name: string;
  price: number;
  bookmarked: boolean;
}) => {
  const { name, price, bookmarked } = props;
  return (
    <div className="flex flex-col rounded-lg bg-componentBg p-5 pb-4">
      <div className="bg-tezDarkBg rounded-lg p-4 flex flex-col items-center">
        <TbHeart
          className={`size-2 ml-auto cursor-pointer duration-150 hover:stroke-tezGrSt mr-0.5 ${
            bookmarked ? "stroke-tezGrSt fill-tezGrSt" : ""
          }`}
        />
        <img src={tezosCollectLogo} className="w-2/5" />
        <span className="size-2 my-6">{name}</span>
      </div>
      <span className="my-4 font-semibold">{name}</span>
      <div className="flex items-center">
        <span className="text-tezLightGr font-semibold">{price} ꜩ</span>
        <div className="ml-auto rounded-full cursor-pointer border-2 border-tezGrSt p-2 group hover:border-tezGrMd">
          <IoMdCart
            className="text-tezGrSt group-hover:text-tezGrMd"
            size={20}
          />
        </div>
      </div>
    </div>
  );
};
export default DomainCard;
