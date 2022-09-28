import { TbHeart } from "react-icons/tb";
import tezosCollectLogo from "assets/images/tezos-collect-logo.svg";
import { IoMdCart } from "react-icons/io";
import { TYPE_DOMAIN_CARD } from "helper/interfaces";
import { convertNum2DateString } from "helper/formatters";

const DomainCard = (props: {
  name: string;
  price: number;
  bookmarked: boolean;
  auctionEndsAt?: Date;
  cardType?: TYPE_DOMAIN_CARD;
  cardHandler?: any;
}) => {
  let { name, price, bookmarked, auctionEndsAt, cardType, cardHandler } = props;
  cardType = cardType || "DC_CART";

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
      <div className="flex items-center my-4">
        <span className="font-semibold">{name}</span>
        {cardType === "DC_AUCTION" && auctionEndsAt && (
          <span className="ml-auto">
            {convertNum2DateString(
              (auctionEndsAt?.getTime() - new Date().getTime()) / 1000
            )}
          </span>
        )}
      </div>
      {cardType === "DC_CART" && (
        <div className="flex items-center">
          <span className="text-tezLightGr font-semibold">{price} ꜩ</span>
          <div className="ml-auto rounded-full cursor-pointer border-2 border-tezGrSt p-2 group hover:border-tezGrMd">
            <IoMdCart
              className="text-tezGrSt group-hover:text-tezGrMd"
              size={20}
            />
          </div>
        </div>
      )}
      {cardType === "DC_AUCTION" && (
        <div className="flex items-center">
          <span className="font-semibold">
            <span className="size-sm text-grayText">Current Bid</span>
            <br />
            <span className="text-tezLightGr">{price} ꜩ</span>
          </span>
          <button
            className="ml-auto tezGr-button size-sm"
            onClick={() => cardHandler(name)}
          >
            Place Bid
          </button>
        </div>
      )}
    </div>
  );
};
export default DomainCard;
