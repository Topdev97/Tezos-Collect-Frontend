import TopCollections from "components/TopCollections";

import { IoMdShare } from "react-icons/io";
import { HiMenu, HiOutlineRefresh } from "react-icons/hi";
import { AiFillHeart } from "react-icons/ai";
import tezosCollectLogo from "assets/images/tezos-collect-logo.svg";

import { TYPE_DOMAIN } from "helper/interfaces";
import ComponentTable from "components/UI/ComponentTable";
import PriceHistory from "components/PriceHistory";
import DomainCard from "components/DomainCard";

const DomainDetails = () => {
  return (
    <div className="flex flex-col gap-8">
      <TopCollections />
      <div className="flex flex-col bg-componentBg rounded-lg">
        <div className="flex items-center py-3 md:py-6 px-4 md:px-8 border-b border-white/20">
          <h4>{mockup.name}</h4>
          <div className="flex text-tezText ml-auto gap-2 md:gap-6">
            <IoMdShare
              size={24}
              className="hover:text-tezGrSt cursor-pointer duration-50"
            />
            <HiOutlineRefresh
              size={24}
              className="hover:text-tezGrSt cursor-pointer duration-50"
            />
            <HiMenu
              size={24}
              className="hover:text-tezGrSt cursor-pointer duration-50"
            />
            <AiFillHeart
              size={24}
              className="hover:text-tezGrSt cursor-pointer duration-50"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row p-6">
          <div className="bg-tezDarkBg border-2 border-itemBorder rounded-lg px-20 aspect-square flex flex-col justify-center items-center">
            <img src={tezosCollectLogo} className="w-32" />
            <span className="size-2 mt-6">{mockup.name}</span>
          </div>
          <div className="md:ml-8 mt-4 md:mt-0 bg-tezDarkBg border-2 border-itemBorder rounded-lg flex-grow flex flex-col">
            <div className="flex border-b-2 px-4 py-4 border-itemBorder">
              <span className="font-semibold size-1">OWNER</span>
              <span className="ml-auto text-tezLightGr">{mockup.owner}</span>
            </div>
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
            <div className="flex items-center border-t-2 px-4 py-4 mt-auto border-itemBorder">
              <div className="flex flex-col font-semibold">
                <span className="text-grayText">Top Offer</span>
                <h4>{mockup.price} ꜩ</h4>
              </div>
              <button className="ml-auto tezGr-button px-6 py-3">
                Make Offer
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col py-3 md:py-6 px-4 md:px-8 border-t border-white/20">
          <h4 className="font-playfair">Details</h4>
          <div className="flex flex-col gap-2 mt-4">
            {detailList.map((item, index) => {
              return (
                <div className="flex" key={index}>
                  <span className="w-48 text-grayText ">{item.label}</span>
                  <span className="font-semibold">{item.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex gap-6">
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

const mockup: TYPE_DOMAIN = {
  tokenId: 10,
  name: "dota-2.tez",
  owner: "tz1d1c442",
  lastSalePrice: 1.467,
  price: 2.061,
  collection: "10k Club",
  tags: ["numbers"],
  registedAt: new Date(),
  expiresAt: new Date(),
  bookmarked: true,
};

const detailList = [
  { label: "Collection", value: mockup.collection },
  { label: "Tags", value: mockup.tags.join(" ") },
  { label: "Last Sale Price", value: `${mockup.lastSalePrice} ꜩ` },
  { label: "TokenId", value: mockup.tokenId },
  { label: "Length", value: mockup.name.length - 4 },
  {
    label: "Registration Date",
    value: mockup.registedAt?.toLocaleDateString(),
  },
  { label: "Expiration Date", value: mockup.expiresAt?.toLocaleDateString() },
];

const domainListings = {
  textAlign: "center",
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
  textAlign: "center",
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
