import { v4 as uuidv4 } from "uuid";

interface TYPE_DOMAIN_OFFER {
  offer_amount: number;
  offer_made_at: Date;
  offer_until: Date;
  offerer: string;
}
interface TYPE_DOMAIN_BID {
  bid_amount: number;
  bid_made_at: Date;
  bidder: string;
}
interface TYPE_DOMAIN {
  name: string;
  owner: string;
  tags: string[];
  lastSoldAt: Date;
  lastSoldAmount: number;

  isRegistered: boolean;
  // registeredAt: Date;
  expiresAt: Date;

  isForSale: boolean;
  price: number;
  saleStartedAt: Date;
  saleEndsAt: Date;

  topOffer: number;
  topOfferer: string;

  isForAuction: boolean;
  auctionStartedAt: Date;
  auctionEndsAt: Date;
  topBid: number;
  topBidder: string;

  tokenId: number;

  collectionId: string;

  isFeatured: boolean;
  bookmarked: boolean;

  includingOperator?: boolean;

  offers?: TYPE_DOMAIN_OFFER[];
  bids?: TYPE_DOMAIN_BID[];

  ownerChanged: boolean;
}

interface TYPE_COLLECTION {
  _id: string;
  slug: string;
  avatar: string;
  label: string;
  description: string;
  discordLink: string;
  numberOfMinted: number;
  numberOfItems: number;
  numberOfOwners: number;
  totalVolume: number;
  topSale: number;
  floorPrice: number;
  volumeDay: number;
  volumeMonth: number;
  volumeDayChange: number;
  volumeMonthChange: number;
  floorPriceChange: number;
}

type TYPE_VIEWMODE = "VM_LIST" | "VM_COMPACT" | "VM_MASS";
type TYPE_DOMAIN_CARD =
  | "DC_COMPACT"
  | "DC_AUCTION"
  | "DC_CART"
  | "DC_PREMIUM"
  | "DC_SOLD"
  | "DC_PURCHASE"
  | "DC_LISTING"
  | "DC_OFFER"
  | undefined;

type TYPE_TX_STATUS = "TX_NONE" | "TX_SUBMIT" | "TX_FAILED" | "TX_SUCCESS";

type T_DOMAIN_ACTIVITY_TYPE =
  | "LIST_FOR_SALE"
  | "DELIST_FOR_SALE"
  | "BUY_FROM_SALE"
  | "LIST_FOR_AUCTION"
  | "PLACE_BID"
  | "COMPLETE_AUCTION"
  | "NEW_OFFER"
  | "CANCEL_OFFER"
  | "SELL_ON_OFFER";

export const DOMAIN_ACTIVITY_LABEL = {
  LIST_FOR_SALE: "List",
  DELIST_FOR_SALE: "Delist",
  BUY_FROM_SALE: "Bought",
  LIST_FOR_AUCTION: "New Auction",
  PLACE_BID: "Bid Placed",
  COMPLETE_AUCTION: "Auction Won",
  NEW_OFFER: "New Offer",
  CANCEL_OFFER: "Offer Cancelled",
  SELL_ON_OFFER: "Sold",
};

interface I_DOMAIN_ACTIVITY {
  amount: number;
  from: string; // address
  name: string;
  timestamp: Date;
  to: string; // address
  txHash: string;
  type: T_DOMAIN_ACTIVITY_TYPE;
  uuid: string;
  signature?: string;
}

type TYPE_MARKET_ADVANCED_FILTER_VALUE =
  | "LETTERS_YES"
  | "LETTERS_NO"
  | "NUMBERS_YES"
  | "NUMBERS_NO"
  | "PALINDROMES_YES"
  | "PALINDROMES_NO"
  | "HYPEN_YES"
  | "HYPEN_NO"
  | "";

interface I_DOMAIN_SEARCH_VALUE {
  domainListed?: boolean;
  isRegistered?: boolean;
  isExpiring?: boolean; // isExpiring or isExpired
  isForAuction?: boolean;
  isForSale?: boolean;
  showType?:
    | "SHOW_ALL"
    | "SHOW_REGISTERED"
    | "SHOW_AVAILABLE"
    | "SHOW_FEATURED";
  pageSize?: number;
  offset?: number;
  startWith?: string;
  endWith?: string;
  minLength?: number;
  maxLength?: number;
  minPrice?: number;
  maxPrice?: number;
  contains?: string;
  owner?: string;
  collectionId?: string;
}

interface I_DOMAIN_ACTIVITY_SEARCH_OPTION {
  type?: T_DOMAIN_ACTIVITY_TYPE | "";
  offset?: number;
  pageSize?: number;
  name?: string;
  from?: string;
  to?: string;
  collectionId?: string;
}

type TYPE_ACTIVITY_SORT_VALUE =
  | "AMOUNT_ASC"
  | "AMOUNT_DESC"
  | "TIMESTAMP_ASC"
  | "TIMESTAMP_DESC";

interface I_PROFILE {
  reversedName?: string;
  avatarLink: string;
  address: string;
  totalVolume: number;
  holding: number;
  bookmarkedNames: string[];
}

interface I_COLLECTION_HOLDER {
  _id: string;
  count: number;
}

export const initializeDomainActivity = (): I_DOMAIN_ACTIVITY => {
  return {
    uuid: uuidv4(),
    name: "",
    type: "NEW_OFFER",
    timestamp: new Date(),
    amount: 0,
    txHash: "",
    from: "",
    to: "",
    signature: "",
  };
};

export const initializeDomain = (): TYPE_DOMAIN => {
  let _domain: TYPE_DOMAIN = {
    name: "",
    owner: "",
    tags: [],
    lastSoldAt: new Date(0),
    lastSoldAmount: 0,

    isRegistered: false,
    // registeredAt: new Date(0),
    expiresAt: new Date(0),

    isForSale: false,
    price: 0,
    saleStartedAt: new Date(0),
    saleEndsAt: new Date(0),

    topOffer: 0,
    topOfferer: "",

    isForAuction: false,
    auctionStartedAt: new Date(0),
    auctionEndsAt: new Date(0),
    topBid: 0,
    topBidder: "",

    tokenId: 0,

    collectionId: "",

    isFeatured: false,
    bookmarked: false,

    includingOperator: false,
    offers: [],
    bids: [],

    ownerChanged: true,
  };
  _domain = JSON.parse(JSON.stringify(_domain));
  return _domain;
};

type TYPE_MARKET_SORT_VALUE =
  | "PRICE_ASC"
  | "PRICE_DESC"
  | "NAME_ASC"
  | "NAME_DESC"
  | "LASTSOLDAMOUNT_ASC"
  | "LASTSOLDAMOUNT_DESC"
  | "TOKENID_ASC"
  | "TOKENID_DESC"
  | "EXPIRESAT_ASC"
  | "EXPIRESAT_DESC"
  | "SALESTARTEDAT_ASC"
  | "SALESTARTEDAT_DESC"
  | "SALEENDSAT_ASC"
  | "SALEENDSAT_DESC"
  | "AUCTIONSTARTEDAT_ASC"
  | "AUCTIONSTARTEDAT_DESC"
  | "AUCTIONENDSAT_ASC"
  | "AUCTIONENDSAT_DESC";

export type {
  TYPE_COLLECTION,
  TYPE_DOMAIN_OFFER,
  TYPE_DOMAIN_BID,
  TYPE_DOMAIN,
  TYPE_VIEWMODE,
  TYPE_DOMAIN_CARD,
  TYPE_TX_STATUS,
  T_DOMAIN_ACTIVITY_TYPE,
  I_DOMAIN_ACTIVITY,
  I_DOMAIN_SEARCH_VALUE,
  TYPE_MARKET_SORT_VALUE,
  TYPE_MARKET_ADVANCED_FILTER_VALUE,
  I_DOMAIN_ACTIVITY_SEARCH_OPTION,
  TYPE_ACTIVITY_SORT_VALUE,
  I_PROFILE,
  I_COLLECTION_HOLDER,
};
