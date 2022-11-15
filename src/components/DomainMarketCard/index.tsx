import { TbHeart } from "react-icons/tb";
import tezosCollectLogo from "assets/images/tezos-collect-logo.svg";
import { IoMdCart } from "react-icons/io";
import { TYPE_DOMAIN, TYPE_DOMAIN_CARD } from "helper/interfaces";
import { beautifyAddress, timerDifFromNow } from "helper/formatters";
import { NavLink } from "react-router-dom";
import { RiTimerFlashLine } from "react-icons/ri";
import { useTezosCollectStore } from "store";
import TezosTimer from "components/UI/TezosTimer";
import LinkWithSearchParams from "components/LinkWithSearchParams";
import tezosDomainLogo from "assets/images/other/tezos-domains.png";

const DomainMarketCard = (props: {
  domain: TYPE_DOMAIN;
  cardType?: TYPE_DOMAIN_CARD;
  cardHandler?: any;
}) => {
  const {
    name,
    price,
    topBid,
    auctionEndsAt,
    isForAuction,
    isForSale,
    isRegistered,
    tdOfferStatus,
    tdOfferExpires,
    tdOfferPrice,
  } = props.domain;
  let { cardType, cardHandler } = props;

  const { bookmarkedNames, toggleBookmark } = useTezosCollectStore();

  if (cardType === "DC_COMPACT") {
    return (
      <div className="flex p-3 bg-componentBg rounded-lg">
        <div className="bg-tezDarkBg rounded-lg flex justify-center w-24 aspect-square">
          <img src={tezosCollectLogo} className="w-16" />
        </div>
        <div className="flex flex-col justify-between flex-1 ml-4">
          <div className="flex">
            <NavLink
              to={{ pathname: `/domain/${name}` }}
              className="hover:opacity-80"
            >
              {name.length < 10 ? name : beautifyAddress(name, 4)}.tez
            </NavLink>
            <TbHeart
              onClick={() => toggleBookmark(name)}
              className={`size-2 ml-auto cursor-pointer duration-150 hover:stroke-tezGrSt mr-0.5 ${
                bookmarkedNames.includes(name)
                  ? "stroke-tezGrSt fill-tezGrSt"
                  : ""
              }`}
            />
          </div>
          <div className="flex">
            {!isRegistered && (
              <a
                className="text-tezLightGr p-0"
                href={`https://app.tezos.domains/domain/${name}.tez`}
                target="_blank"
              >
                Register
              </a>
            )}
            {(isForAuction || isForSale || tdOfferStatus) && (
              <span className="text-tezLightGr flex items-center">
                {Math.min(
                  Math.max(price, topBid) || tdOfferPrice,
                  tdOfferPrice || Math.max(price, topBid)
                )}{" "}
                ꜩ
              </span>
            )}
            {isForSale && (
              <div className="ml-auto cursor-pointer">
                <IoMdCart
                  size={20}
                  className="text-tezGrSt hover:text-tezGrMd"
                />
              </div>
            )}
            {isForAuction && (
              <div className="ml-auto cursor-pointer">
                <RiTimerFlashLine
                  size={24}
                  className="text-tezGrSt hover:text-tezGrMd"
                />
              </div>
            )}

            {!(isForAuction || isForSale) && tdOfferStatus && (
              <div className="ml-auto cursor-pointer">
                <img src={tezosDomainLogo} className="w-6" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col rounded-lg bg-componentBg p-5 pb-4">
      <div className="bg-tezDarkBg rounded-lg p-4 flex flex-col items-center">
        <TbHeart
          onClick={() => toggleBookmark(name)}
          className={`size-2 ml-auto cursor-pointer duration-150 hover:stroke-tezGrSt mr-0.5 ${
            bookmarkedNames.includes(name) ? "stroke-tezGrSt fill-tezGrSt" : ""
          }`}
        />
        <img src={tezosCollectLogo} className="w-2/5" />
        <LinkWithSearchParams
          to={{ pathname: `/domain/${name}` }}
          className="size-2 my-6 hover:opacity-80"
        >
          {name}.tez
        </LinkWithSearchParams>
      </div>
      <div className="flex items-center my-4">
        <LinkWithSearchParams
          to={{ pathname: `/domain/${name}` }}
          className="font-semibold hover:opacity-80"
        >
          {name}.tez
        </LinkWithSearchParams>
        {isForAuction && auctionEndsAt && (
          <span className="ml-auto text-tezLightGr flex items-center">
            <TezosTimer to={auctionEndsAt} formatter={timerDifFromNow} />

            <RiTimerFlashLine
              size={24}
              className="text-tezGrSt hover:text-tezGrMd"
            />
          </span>
        )}
        {cardType === "DC_SOLD" && auctionEndsAt && (
          <span className="ml-auto">5 days ago</span>
        )}
        {cardType === "DC_PURCHASE" && auctionEndsAt && (
          <span className="ml-auto">5 days ago</span>
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
      {isForAuction && (
        <div className="flex items-center">
          <span className="font-semibold">
            <span className="size-sm text-grayText">Current Bid</span>
            <br />
            <span className="text-tezLightGr">
              {Math.max(topBid, price).toFixed(2)} ꜩ
            </span>
          </span>
          <button
            className="ml-auto tezGr-button size-sm"
            onClick={() => cardHandler(name)}
          >
            Place Bid
          </button>
        </div>
      )}
      {cardType === "DC_SOLD" && (
        <div className="flex items-center">
          <span className="font-semibold">
            <span className="size-sm text-grayText">Sell Price</span>
            <br />
            <span className="text-tezLightGr">{price} ꜩ</span>
          </span>
        </div>
      )}
      {cardType === "DC_PURCHASE" && (
        <div className="flex items-center">
          <span className="font-semibold">
            <span className="size-sm text-grayText">Purchase Price</span>
            <br />
            <span className="text-tezLightGr">{price} ꜩ</span>
          </span>
        </div>
      )}
      {cardType === "DC_LISTING" && (
        <div className="flex items-center">
          <span className="font-semibold">
            <span className="size-sm text-grayText">Price</span>
            <br />
            <span className="text-tezLightGr">{price} ꜩ</span>
          </span>
        </div>
      )}
      {cardType === "DC_OFFER" && (
        <div className="flex items-center">
          <span className="font-semibold">
            <span className="size-sm text-grayText">Current Bid</span>
            <br />
            <span className="text-tezLightGr">{price.toFixed(2)} ꜩ</span>
          </span>
        </div>
      )}
    </div>
  );
};
export default DomainMarketCard;
