import { TbHeart } from "react-icons/tb";
import tezosCollectLogo from "assets/images/tezos-collect-logo.svg";
import { IoMdCart } from "react-icons/io";
import { AiFillDollarCircle } from "react-icons/ai";

const DomainWideCard = (props: {
  name: string;
  price: number;
  bookmarked: boolean;
}) => {
  const { name, price, bookmarked } = props;
  return (
    <div className="flex rounded-lg bg-componentBg p-5 pb-4">
      <div className="bg-tezDarkBg rounded-lg p-4 flex flex-col items-center">
        <img src={tezosCollectLogo} className="w-16 h-16" />
      </div>
      <div className="ml-4 flex flex-col font-semibold size-1">
        <span>{name}</span>
        <span className="mt-auto text-tezLightGr">Premium</span>
      </div>

      <div className="ml-auto flex flex-col">
        <TbHeart
          className={`size-2 ml-auto cursor-pointer duration-150 hover:stroke-tezGrSt mr-0.5 ${
            bookmarked ? "stroke-tezGrSt fill-tezGrSt" : ""
          }`}
        />
        <AiFillDollarCircle className="mt-auto size-2 text-tezSuccess" />
      </div>
    </div>
  );
};
export default DomainWideCard;
