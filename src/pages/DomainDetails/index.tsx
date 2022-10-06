import { IoMdShare } from "react-icons/io";
import { HiMenu, HiOutlineRefresh } from "react-icons/hi";
import { AiFillHeart } from "react-icons/ai";
import tezosCollectLogo from "assets/images/tezos-collect-logo.svg";

import ComponentTable from "components/UI/ComponentTable";
import PriceHistory from "components/PriceHistory";
import DomainCard from "components/DomainCard";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { TYPE_COLLECTION, TYPE_DOMAIN } from "helper/interfaces";
import { useTezosCollectStore } from "store";
import { beautifyAddress } from "helper/formatters";

const DomainDetails = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { domain: domainName } = useParams<{ domain: string }>();
  const {
    activeAddress,
    findDomainByName,
    findCollectionById,
    fetchOnChainDomainDataByName,
  } = useTezosCollectStore();

  const [domain, setDomain] = useState<TYPE_DOMAIN | undefined>(undefined);
  const [collection, setCollection] = useState<TYPE_COLLECTION>();

  const detailList = useMemo(() => {
    return [
      {
        label: "Owner",
        value: (
          <span title={domain?.owner}>
            {beautifyAddress(domain?.owner || "", 8)}
          </span>
        ),
      },
      { label: "Collection", value: collection?.label },
      { label: "Tags", value: domain?.tags?.join(" ") },
      {
        label: "Last Sale Price",
        value: `${domain?.lastSoldAmount?.toFixed(2)} ꜩ`,
      },
      { label: "TokenId", value: domain?.tokenId },
      { label: "Length", value: domainName?.length },
      // {
      //   label: "Registration Date",
      //   value: domain?.registeredAt,
      // },
      {
        label: "Expiration Date",
        value: domain?.expiresAt?.toLocaleString(),
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
      owner: _onChainDomain.owner,
      expiresAt: _onChainDomain.expiresAt,
    };

    setLoading(false);
    console.log("_domain", _domain);
    setDomain(_domain);
    if (_domain?.collectionId) {
      setCollection(findCollectionById(_domain?.collectionId));
    }
  };

  useEffect(() => {
    if (domainName) {
      updateDomain();
    }
  }, [domainName]);

  const domainListings = {
    textAlign: "left",
    heading: "Listings (6)",
    collapsible: true,
    header: ["Price", "Valid From", "Valid Until"],
    tableData: [
      ["70.6 ꜩ", "7 hours ago", "4 weeks"],
      ["70.6 ꜩ", "7 hours ago", "4 weeks"],
      ["70.6 ꜩ", "7 hours ago", "4 weeks"],
      ["70.6 ꜩ", "7 hours ago", "4 weeks"],
      ["70.6 ꜩ", "7 hours ago", "4 weeks"],
      ["70.6 ꜩ", "7 hours ago", "4 weeks"],
    ],
  };

  const domainOffers = {
    textAlign: "left",
    heading: "Offers (6)",
    collapsible: true,
    header: ["Price", "Valid From", "Valid Until", "From"],
    tableData: [
      ["70.6 ꜩ", "7 hours ago", "4 weeks", "4 weeks"],
      ["70.6 ꜩ", "7 hours ago", "4 weeks", "4 weeks"],
      ["70.6 ꜩ", "7 hours ago", "4 weeks", "4 weeks"],
      ["70.6 ꜩ", "7 hours ago", "4 weeks", "4 weeks"],
      ["70.6 ꜩ", "7 hours ago", "4 weeks", "4 weeks"],
      ["70.6 ꜩ", "7 hours ago", "4 weeks", "4 weeks"],
    ],
  };

  const domainActivities = {
    textAlign: "left",
    heading: "Activity",
    collapsible: true,
    header: ["Event", "Price", "From", "To", "TX", "Date"],
    tableData: [
      [
        "Sale",
        "70.6 ꜩ",
        <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
        <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
        "tz1aSjTFe...",
        "3 weeks ago",
      ],
      [
        "Sale",
        "70.6 ꜩ",
        <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
        <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
        "tz1aSjTFe...",
        "3 weeks ago",
      ],
      [
        "Sale",
        "70.6 ꜩ",
        <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
        <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
        "tz1aSjTFe...",
        "3 weeks ago",
      ],
      [
        "Sale",
        "70.6 ꜩ",
        <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
        <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
        "tz1aSjTFe...",
        "3 weeks ago",
      ],
      [
        "Sale",
        "70.6 ꜩ",
        <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
        <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
        "tz1aSjTFe...",
        "3 weeks ago",
      ],
      [
        "Sale",
        "70.6 ꜩ",
        <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
        <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
        "tz1aSjTFe...",
        "3 weeks ago",
      ],
    ],
  };

  const relatedDomains = [
    { name: "5471.tez", price: 27.86, bookmarked: true },
    { name: "5480.tez", price: 40.86, bookmarked: false },
    { name: "1358.tez", price: 96.1, bookmarked: false },
    { name: "axis.tez", price: 107.56, bookmarked: true },
  ];

  return (
    <div className="flex flex-col gap-8 pt-4">
      {/* <TopCollections /> */}
      <div className="flex flex-col bg-componentBg rounded-lg">
        <div className="flex items-center py-3 md:py-6 px-4 md:px-8 border-b border-white/20">
          <h4>{domainName}.tez</h4>
          <span className="bg-tezGr rounded-full px-2 ml-4">
            {domain?.isForSale === false && "Sale"}
            {domain?.isForAuction && "Auction"}
          </span>

          <div className="flex text-tezText ml-auto gap-2 md:gap-6">
            <IoMdShare className="size-1 md:size-3 hover:text-tezGrSt cursor-pointer duration-50" />
            <HiOutlineRefresh
              className={`size-1 md:size-3 hover:text-tezGrSt cursor-pointer ${
                loading ? " animate-spin" : ""
              }`}
              onClick={updateDomain}
            />
            <HiMenu className="size-1 md:size-3 hover:text-tezGrSt cursor-pointer duration-50" />
            <AiFillHeart className="size-1 md:size-3 hover:text-tezGrSt cursor-pointer duration-50" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row p-6">
          <div className="bg-tezDarkBg border-2 border-itemBorder rounded-lg px-20 aspect-square flex flex-col justify-center items-center">
            <img src={tezosCollectLogo} className="w-32 mb-6" />
            <h4>{domain?.name}.tez</h4>
          </div>
          <div className="md:ml-8 mt-4 md:mt-0 bg-tezDarkBg border-2 border-itemBorder rounded-lg flex-grow flex flex-col">
            <div className="flex border-b-2 px-4 py-4 border-itemBorder font-semibold">
              <span className="md:size-1">OWNER</span>
              <span className="text-tezLightGr ml-auto">
                {isYourDomain
                  ? "- YOU -"
                  : beautifyAddress(domain?.owner || "")}
              </span>
            </div>
            {domain?.isForSale && (
              <div className="flex flex-col p-4">
                <div className="flex justify-between">
                  <div>
                    <span className="size-1 font-semibold">PRICE</span>
                    <br />
                    <span className="text-grayText">
                      Sale Ends
                      <br />
                      2022/10/12 02:05:45
                    </span>
                  </div>
                  <span className="font-bold size-2 text-right">
                    2.28 ꜩ
                    <br />
                    ($3,673.15)
                  </span>
                </div>
                <div className="flex mt-2">
                  <button className="tezGr-button px-4">Buy Now</button>
                  <button className="ml-4 px-4 hover-bg-tezGr">
                    Add to cart
                  </button>
                </div>
              </div>
            )}
            {domain?.isForAuction && (
              <div className="flex flex-col p-4">
                <div className="flex justify-between">
                  <div>
                    <span className="size-1 font-semibold">PRICE</span>
                    <br />
                    <span className="text-grayText">
                      Auction Ends
                      <br />
                      {domain?.auctionEndsAt?.toLocaleString()}
                    </span>
                  </div>
                  <span className="font-bold size-2 text-right">
                    {domain?.topBid.toFixed(2)} ꜩ
                    <br />
                    ($3,673.15)
                  </span>
                </div>
                <div className="flex mt-2">
                  <button className="tezGr-button px-4">Place a Bid</button>
                </div>
              </div>
            )}
            {domain?.isForAuction === false && domain.isForSale === false && (
              <div className="flex flex-row size-2 justify-center items-center h-full py-8">
                No Active Listings
              </div>
            )}

            {isYourDomain ? (
              <div className="flex items-center border-t-2 px-4 py-4 mt-auto border-itemBorder">
                <button className="ml-auto tezGr-button px-6 py-3">
                  List for Sale
                </button>
                <button className="ml-4 tezGr-button px-6 py-3">
                  List for Auction
                </button>
              </div>
            ) : (
              <div className="flex items-center border-t-2 px-4 py-4 mt-auto border-itemBorder">
                {domain?.topOffer !== 0 && (
                  <div className="flex flex-col font-semibold">
                    <span className="text-grayText">Top Offer</span>
                    {domain?.topOffer.toFixed(2)} ꜩ
                  </div>
                )}
                <button className="ml-auto tezGr-button px-6 md:py-3">
                  Make Offer
                </button>
              </div>
            )}
          </div>
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
        <div className="flex-grow">
          <ComponentTable {...domainOffers} />
        </div>
      </div>
      <ComponentTable {...domainActivities} />
      <PriceHistory heading="Price History" collapsible={true} />
      <div className="flex flex-col gap-4 mb-8">
        <h4 className="font-playfair font-medium">See Also</h4>
        <div className="flex gap-6">
          {relatedDomains.map((domain, index) => {
            return (
              <div key={index} className="flex-1">
                <DomainCard {...domain} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DomainDetails;
