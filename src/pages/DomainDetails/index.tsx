import { IoMdShare } from "react-icons/io";
import { HiMenu, HiOutlineRefresh } from "react-icons/hi";
import { AiFillHeart } from "react-icons/ai";
import tezosCollectLogo from "assets/images/tezos-collect-logo.svg";
// import tzstatsLogo from "assets/images/other/tzstats.svg";
import tezosDomainLogo from "assets/images/other/tezos-domains.png";
import objktLogo from "assets/images/other/objkt.png";

import ComponentTable from "components/UI/ComponentTable";
// import PriceHistory from "components/PriceHistory";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  DOMAIN_ACTIVITY_LABEL,
  I_DOMAIN_ACTIVITY,
  TYPE_COLLECTION,
  TYPE_DOMAIN,
} from "helper/interfaces";
import { useTezosCollectStore } from "store";
import { beautifyAddress, dateDifFromNow } from "helper/formatters";
import DomainMarketCard from "components/DomainMarketCard";
import LinkWithSearchParams from "components/LinkWithSearchParams";
import AddressBox from "components/UI/AddressBox";
import TxBox from "components/UI/TxBox";
import HoverMenu from "components/UI/HoverMenu";
import TezosDomainMarketCard from "components/TezosDomainMarketCard";

const DomainDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const { domain: domainName } = useParams<{ domain: string }>();
  const {
    topSaleDomains,
    setMakeOfferModal,
    setOpenAuctionModal,
    setListForSaleModal,
    cancelForSale,
    buyForSale,
    contractReady,
    activeAddress,
    findDomainByName,
    updateCachedDomain,
    findCollectionById,
    fetchOnChainDomainDataByName,
    sellOfferForOffer,
    cancelOfferToDomain,

    setPlaceBidModal,

    claimWinnedAuction,

    bookmarkedNames,
    toggleBookmark,
    getDomainActivityByName,
    tezosPrice,
  } = useTezosCollectStore();

  const [domain, setDomain] = useState<TYPE_DOMAIN | undefined>(undefined);
  const [domainActivity, setDomainActivity] = useState<I_DOMAIN_ACTIVITY[]>([]);
  const [collection, setCollection] = useState<TYPE_COLLECTION>();

  const detailList = useMemo(() => {
    return [
      {
        label: "Owner",
        value: (
          <LinkWithSearchParams
            className="hover:opacity-80"
            to={{ pathname: `/profile/${domain?.owner}` }}
          >
            <span title={domain?.owner}>
              {beautifyAddress(domain?.owner || "", 8)}
            </span>
          </LinkWithSearchParams>
        ),
      },
      {
        label: "Collection",
        value: (
          <LinkWithSearchParams
            className="hover:opacity-80"
            to={{ pathname: `/collection/${collection?.slug}` }}
          >
            {" "}
            {collection?.label}{" "}
          </LinkWithSearchParams>
        ),
      },
      { label: "Tags", value: domain?.tags?.join(" ") },
      {
        label: "Last Sale Price",
        value: `${domain?.lastSoldAmount?.toFixed(2)} ꜩ`,
      },
      { label: "TokenId", value: domain?.isRegistered ? domain?.tokenId : "" },
      { label: "Length", value: domainName?.length },
      // {
      //   label: "Registration Date",
      //   value: domain?.registeredAt,
      // },
      {
        label: "Expiration Date",
        value: domain?.isRegistered
          ? domain?.expiresAt?.toLocaleString("en-us")
          : "",
      },
    ];
  }, [domain, collection]);

  const isYourDomain = useMemo<boolean>(() => {
    if (domain?.owner === activeAddress && activeAddress !== "") return true;
    return false;
  }, [domain, activeAddress]);

  const updateDomain = async () => {
    setLoading(true);
    const [_onChainDomain, _cachedDomain] = await Promise.all([
      fetchOnChainDomainDataByName(domainName),
      findDomainByName(domainName || ""),
    ]);
    const _domain: TYPE_DOMAIN = {
      ..._onChainDomain,
      ..._cachedDomain,
      tokenId: _onChainDomain.tokenId,
      owner: _onChainDomain.owner,
      expiresAt: _onChainDomain.expiresAt,
      isRegistered: _onChainDomain.isRegistered,
      offers: _onChainDomain.offers,
      topOffer: _onChainDomain.topOffer,
      includingOperator: _onChainDomain.includingOperator,
      auctionStartedAt: _onChainDomain.auctionStartedAt,
      auctionEndsAt: _onChainDomain.auctionEndsAt,
      saleEndsAt: _onChainDomain.saleEndsAt,
      saleStartedAt: _onChainDomain.saleStartedAt,
      price: _onChainDomain.price,
      isForAuction: _onChainDomain.isForAuction,
      isForSale: _onChainDomain.isForSale,
      topBid: _onChainDomain.topBid,
      topBidder: _onChainDomain.topBidder,
      ownerChanged: _onChainDomain.ownerChanged,
    };
    // console.log(_domain);

    setLoading(false);
    setDomain(_domain);

    updateCachedDomain(_domain);
    if (_domain?.collectionId) {
      setCollection(findCollectionById(_domain?.collectionId));
    }

    if (_domain.name.length) {
      const _domainActivity = await getDomainActivityByName(domainName || "");
      setDomainActivity(_domainActivity);
    }
  };

  useEffect(() => {
    if (domainName && contractReady) {
      if (/^[A-Za-z0-9-]*$/.test(domainName)) updateDomain();
      else {
        alert("Invalid domain name");
        navigate("/");
      }
    }
  }, [domainName, contractReady]);

  const onMakeOffer = async () => {
    if (loading === true) return;
    if ((domain?.tokenId || -1) > 0) {
      setMakeOfferModal({
        visible: true,
        tokenId: domain?.tokenId || -1,
        callback: updateDomain,
      });
      return;
    }
  };

  const onCancelOffer = async () => {
    if (loading === true) return;
    console.log("onCancelOffer");
    if ((domain?.tokenId || -1) > 0) {
      await cancelOfferToDomain(domain?.tokenId || -1);
      updateDomain();
    }
  };
  const onSellForOffer = async (_offerer: string, _amount: number) => {
    if (loading === true) return;
    console.log("_offerer", _offerer);
    if ((domain?.tokenId || -1) > 0) {
      await sellOfferForOffer(
        domain?.tokenId || -1,
        _offerer,
        _amount / 10 ** 6,
        domain?.includingOperator || false
      );
      updateDomain();
    }
  };
  const onOpenAuction = async () => {
    if (loading === true) return;

    if ((domain?.tokenId || -1) > 0) {
      setOpenAuctionModal({
        visible: true,
        tokenId: domain?.tokenId || -1,
        includingOperator: domain?.includingOperator || false,
        callback: updateDomain,
      });
      return;
    }
  };
  const onPlaceBid = async () => {
    if (loading === true) return;

    if ((domain?.tokenId || -1) > 0) {
      setPlaceBidModal({
        visible: true,
        tokenId: domain?.tokenId || -1,
        topBid: Math.max(domain?.topBid || 0, domain?.price || 0),
        callback: updateDomain,
      });
      return;
    }
  };

  const onClaimWinnedAuction = async () => {
    await claimWinnedAuction(
      domain?.tokenId || -1,
      updateDomain,
      domain?.includingOperator || false,
      isYourDomain
    );
  };

  const onListForSale = async () => {
    if (loading === true) return;

    if ((domain?.tokenId || -1) > 0) {
      setListForSaleModal({
        visible: true,
        tokenId: domain?.tokenId || -1,
        name: domain?.name || "",
        includingOperator: domain?.includingOperator || false,
        callback: updateDomain,
      });
      return;
    }
  };
  const onCancelListing = async () => {
    if (loading === true) return;

    if ((domain?.tokenId || -1) > 0) {
      await cancelForSale(domain?.tokenId || -1);
      updateDomain();
    }
  };
  const onBuyForSale = async () => {
    if (loading === true) return;

    if ((domain?.tokenId || -1) > 0) {
      await buyForSale(domain?.tokenId || -1, domain?.price || 0);
      updateDomain();
    }
  };
  const domainListings = useMemo(() => {
    return {
      textAlign: "left",
      heading: "Listings",
      collapsible: true,
      header: ["Price", "Seller", "Date"],
      tableData:
        domainActivity.length === 0
          ? []
          : domainActivity
              .filter((item) => item.type === "LIST_FOR_SALE")
              .map((item) => [
                `${item.amount} ꜩ`,
                <LinkWithSearchParams
                  className="address-gr-br-box p-2"
                  to={{ pathname: `/profile/${item.from}` }}
                >
                  {beautifyAddress(item.from)}
                </LinkWithSearchParams>,
                dateDifFromNow(item.timestamp),
              ]),
    };
  }, [domainActivity]);

  const domainOffers = useMemo(() => {
    return {
      textAlign: "left",
      heading: `Offers (${domain?.offers?.length})`,
      collapsible: true,
      header: [
        "Price",
        "Offer At",
        "Valid Until",
        "From",
        <span className="mx-auto">Action</span>,
      ],
      tableData:
        domain?.offers?.map((offer) => [
          `${(offer.offer_amount / 10 ** 6).toFixed(2)} ꜩ`,
          dateDifFromNow(offer.offer_made_at),
          offer.offer_until < new Date()
            ? "Expired"
            : dateDifFromNow(offer.offer_until),
          <AddressBox address={offer.offerer} />,
          offer.offerer === activeAddress ? (
            <button
              className="mx-auto tezSecGr-button size-sm px-2 py-1"
              onClick={onCancelOffer}
            >
              Cancel
            </button>
          ) : isYourDomain ? (
            <button
              className="mx-auto tezSecGr-button size-sm px-2 py-1"
              onClick={() => onSellForOffer(offer.offerer, offer.offer_amount)}
            >
              Sell
            </button>
          ) : (
            ""
          ),
        ]) || [],
    };
  }, [domain]);

  const domainBids = useMemo(() => {
    return {
      textAlign: "left",
      heading: `Bids (${
        domainActivity.filter(
          (item) =>
            item.type === "PLACE_BID" &&
            item.timestamp > (domain?.auctionStartedAt || new Date())
        ).length
      })`,
      collapsible: true,
      header: ["Price", "Bid At", "From"],
      tableData:
        domainActivity
          .filter(
            (item) =>
              item.type === "PLACE_BID" &&
              item.timestamp > (domain?.auctionStartedAt || new Date())
          )
          .map((item) => [
            `${item.amount.toFixed(2)} ꜩ`,
            dateDifFromNow(item.timestamp),
            <span className="address-gr-br-box p-2">
              {beautifyAddress(item.from)}
            </span>,
          ]) || [],
    };
  }, [domain]);

  const domainActivities = useMemo(() => {
    return {
      textAlign: "left",
      heading: "Activity",
      collapsible: true,
      header: ["Event", "Amount", "From", "To", "TX", "Date"],
      tableData:
        domainActivity.length === 0
          ? []
          : domainActivity.map((item) => [
              DOMAIN_ACTIVITY_LABEL[item.type],
              `${item.amount} ꜩ`,
              <AddressBox address={item.from} />,
              <AddressBox address={item.to} />,
              <TxBox tx={item.txHash} />,
              dateDifFromNow(item.timestamp),
            ]),
    };
  }, [domainActivity]);

  const topBidInfo = () => {
    return (
      <div className="flex flex-col font-semibold">
        <span className="text-grayText">Top Bid</span>
        {domain?.topBid.toFixed(2)} ꜩ<span className="text-grayText">From</span>
        <div className="mt-4">
          <span className="flex-1 address-gr-br-box p-2">
            {beautifyAddress(domain?.topBidder || "")}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8 pt-4">
      {/* <TopCollections /> */}
      <div className="flex flex-col bg-componentBg rounded-lg">
        <div className="flex items-center py-3 md:py-6 px-4 md:px-8 border-b border-white/20">
          <h4>{domainName}.tez</h4>

          {domain?.isFeatured && (
            <span className="bg-tezSecGr rounded-full px-2 ml-4">Featured</span>
          )}
          <span className="bg-tezGr rounded-full px-2 ml-4">
            {domain?.isForSale && "Sale"}
            {domain?.isForAuction &&
              (domain.auctionEndsAt < new Date()
                ? "Auction Expired"
                : "Auction")}
          </span>

          <div className="flex text-tezText ml-auto gap-2 md:gap-6">
            <IoMdShare
              className="size-1 md:size-3 hover:text-tezGrSt cursor-pointer duration-50"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
            />
            <HiOutlineRefresh
              className={`size-1 md:size-3 hover:text-tezGrSt cursor-pointer ${
                loading ? " animate-spin" : ""
              }`}
              onClick={updateDomain}
            />
            <HoverMenu
              options={[
                // {
                //   icon: <img src={tzstatsLogo} className="w-4" />,
                //   text: " TZSTATS",
                //   handler: () => {
                //     window.open("/someURL", "_blank");
                //   },
                // },
                {
                  icon: <img src={tezosDomainLogo} className="w-6" />,
                  text: "Tezos Domain",
                  handler: () => {
                    window.open(
                      `https://app.tezos.domains/domain/${domain?.name}.tez`,
                      "_blank"
                    );
                  },
                },
                {
                  icon: <img src={objktLogo} className="w-6" />,
                  text: "Objkt",
                  handler: () => {
                    window.open(
                      `https://objkt.com/asset/tezosdomains/${domain?.tokenId}`,
                      "_blank"
                    );
                  },
                },
              ]}
              icon={
                <HiMenu className="size-1 md:size-3 hover:text-tezGrSt cursor-pointer duration-50" />
              }
              text=""
              customClassName="flex justify-between items-center w-full input duration-150"
            />

            <AiFillHeart
              onClick={() => toggleBookmark(domain?.name || "")}
              className={`size-1 md:size-3 hover:text-tezGrSt cursor-pointer duration-50 ${
                bookmarkedNames.includes(domain?.name || "")
                  ? "text-tezGrSt"
                  : "text-tezText"
              }`}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row p-6">
          <div className="bg-tezDarkBg border-2 border-itemBorder rounded-lg md:px-20 aspect-square flex flex-col justify-center items-center">
            <img src={tezosCollectLogo} className="w-32 mb-6" />
            <h4>{domainName}.tez</h4>
          </div>
          <div className="md:ml-6 mt-4 md:mt-0 bg-tezDarkBg border-2 border-itemBorder rounded-lg flex-1 flex flex-col">
            <div className="flex border-b-2 px-4 py-4 border-itemBorder font-semibold">
              <span className="md:size-1">OWNER</span>
              <LinkWithSearchParams
                className="text-tezLightGr ml-auto hover:opacity-80"
                to={{ pathname: `/profile/${domain?.owner}` }}
              >
                {isYourDomain
                  ? "- YOU -"
                  : beautifyAddress(domain?.owner || "")}
              </LinkWithSearchParams>
            </div>
            {domain?.isForSale && (
              <div className="flex flex-col p-4">
                <div className="flex justify-between">
                  <div>
                    <span className="size-1 font-semibold">PRICE</span>
                    <br />
                    <span className="text-grayText">
                      {new Date() < domain.saleEndsAt
                        ? "Sale active until"
                        : "Sale expired at"}
                      <br />
                      {domain.saleEndsAt.toLocaleString()}
                    </span>
                  </div>
                  <span className="font-bold size-2 text-right">
                    {domain?.price.toFixed(2)} ꜩ
                    <br />
                    ($ {(tezosPrice * (domain?.price || 0)).toFixed(2)})
                  </span>
                </div>
                {!isYourDomain && (
                  <div className="flex mt-2">
                    <button
                      className="tezGr-button px-4"
                      onClick={onBuyForSale}
                      disabled={new Date() > domain.saleEndsAt}
                    >
                      Buy Now
                    </button>
                    <button
                      className="ml-4 px-4 hover-bg-tezGr"
                      disabled={new Date() > domain.saleEndsAt}
                    >
                      Add to cart
                    </button>
                  </div>
                )}
              </div>
            )}
            {domain?.isForAuction && (
              <div className="flex flex-col p-4">
                <div className="flex justify-between">
                  <div>
                    <span className="size-1 font-semibold">Top Bid Amount</span>
                    <br />
                    <span className="text-grayText">
                      {new Date() > domain.auctionEndsAt
                        ? "Auction Expired"
                        : "Auction Ends"}
                      <br />
                      {dateDifFromNow(domain?.auctionEndsAt?.toLocaleString())}
                    </span>

                    {domain.topBid === 0 && (
                      <>
                        <br />
                        <span className="size-1 font-semibold">
                          Starting from
                        </span>
                        <br />
                        <span className="text-grayText">{domain.price} ꜩ</span>
                      </>
                    )}
                  </div>
                  <span className="font-bold size-2 text-right">
                    {domain?.topBid.toFixed(2)} ꜩ
                    <br />
                    ($ {(tezosPrice * (domain?.topBid || 0)).toFixed(2)})
                  </span>
                </div>
                {!isYourDomain && domain.topBidder !== activeAddress && (
                  <div className="flex mt-2">
                    <button className="tezGr-button px-4" onClick={onPlaceBid}>
                      Place a Bid
                    </button>
                  </div>
                )}
              </div>
            )}
            {domain?.isForAuction === false && domain.isForSale === false && (
              <div className="flex flex-row size-2 justify-center items-center h-full py-8">
                {domain.isRegistered
                  ? "No Active Listings"
                  : "Not Registered Yet!"}
              </div>
            )}

            {domain?.isRegistered ? (
              isYourDomain ? (
                <div className="flex items-center border-t-2 px-4 py-4 mt-auto border-itemBorder">
                  {(domain?.offers || []).length > 0 ? (
                    <div className="flex flex-col font-semibold">
                      <span className="text-grayText">Top Offer</span>
                      {domain?.topOffer.toFixed(2)} ꜩ
                    </div>
                  ) : (
                    ""
                  )}

                  {((domain.auctionEndsAt < new Date() && domain.topBid == 0) ||
                    !domain.isForAuction) &&
                    !domain.isForSale && (
                      <>
                        <button
                          className="ml-auto tezGr-button px-6 py-3"
                          onClick={onListForSale}
                        >
                          List for Sale
                        </button>
                        <button
                          className="ml-4 tezGr-button px-6 py-3"
                          onClick={onOpenAuction}
                        >
                          List for Auction
                        </button>
                      </>
                    )}
                  {domain.isForSale && (
                    <>
                      <button
                        className="ml-auto tezSecGr-button px-6 md:py-3"
                        onClick={onCancelListing}
                      >
                        Cancel Listing
                      </button>
                    </>
                  )}

                  {domain.isForAuction && domain.topBid > 0 && (
                    <>
                      {topBidInfo()}
                      <button
                        className="ml-auto tezSecGr-button px-6 md:py-3"
                        onClick={onClaimWinnedAuction}
                        disabled={new Date() < domain.auctionEndsAt}
                      >
                        End Auction
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center border-t-2 px-4 py-4 mt-auto border-itemBorder">
                  {domain?.topBid > 0 && (
                    <>
                      {topBidInfo()}

                      {(domain.topBidder === activeAddress ||
                        domain.owner === activeAddress) && (
                        <button
                          className="ml-auto tezSecGr-button px-6 md:py-3"
                          onClick={onClaimWinnedAuction}
                          disabled={new Date() < domain.auctionEndsAt}
                        >
                          Claim {domain.name}.tez
                        </button>
                      )}
                    </>
                  )}
                  {domain.isForSale && domain?.topOffer !== 0 && (
                    <div className="flex flex-col font-semibold">
                      <span className="text-grayText">Top Offer</span>
                      {domain?.topOffer.toFixed(2)} ꜩ
                    </div>
                  )}

                  {(!domain.isForAuction ||
                    (domain.auctionEndsAt < new Date() &&
                      domain.topBid === 0)) &&
                    !domain.isForSale &&
                    (domain?.offers?.find(
                      (item) => item.offerer === activeAddress
                    ) ? (
                      <button
                        className="ml-auto tezSecGr-button px-6 md:py-3"
                        onClick={onCancelOffer}
                      >
                        Cancel Offer
                      </button>
                    ) : (
                      <button
                        className="ml-auto tezGr-button px-6 md:py-3"
                        onClick={onMakeOffer}
                      >
                        Make Offer
                      </button>
                    ))}
                </div>
              )
            ) : (
              <div className="flex items-center border-t-2 px-4 py-4 mt-auto border-itemBorder">
                <a
                  className="button ml-auto tezGr-button px-6 md:py-3"
                  href={`https://app.tezos.domains/domain/${domainName}.tez`}
                  target="_blank"
                >
                  Register
                </a>
              </div>
            )}
          </div>
          {!isYourDomain && (
            <TezosDomainMarketCard
              tokenId={domain?.tokenId}
              owner={domain?.owner || ""}
              callback={updateDomain}
            />
          )}
        </div>

        <div className="flex flex-col py-3 md:py-6 px-4 md:px-8 border-t border-white/20">
          <h4 className="font-playfair">Details</h4>
          <div className="flex flex-col gap-2 mt-4">
            {detailList.map((item, index) => {
              return (
                <div className="flex flex-col md:flex-row" key={index}>
                  <span className="w-48 text-grayText">{item.label}</span>
                  <span className="font-semibold">{item.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-grow">
          <ComponentTable {...domainListings} />
        </div>
        <div className="flex-grow gap-6 flex flex-col">
          {domain?.isForAuction && <ComponentTable {...domainBids} />}
          <ComponentTable {...domainOffers} />
        </div>
      </div>
      <ComponentTable {...domainActivities} />
      {/* <PriceHistory heading="Price History" collapsible={true} /> */}
      <div className="flex flex-col gap-4 mb-8">
        <h4 className="font-playfair font-medium">See Also</h4>
        <div className="grid grid-cols-5 gap-6">
          {topSaleDomains[0]?.map((domain, index) => {
            return (
              <div key={index} className="flex-1">
                <DomainMarketCard domain={domain} cardHandler={() => {}} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DomainDetails;
