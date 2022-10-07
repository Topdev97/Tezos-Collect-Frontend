interface TYPE_DOMAIN_OFFER {
  offer_amount: number;
  offer_made_at: Date;
  offer_until: Date;
  offerer: string;
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
}

interface TYPE_COLLECTION {
  _id: string;
  slug: string;
  avatar: string;
  label: string;
  description: string;
  discordLink: string;
  numberOfItems: number;
  numberOfOwners: number;
  totalVolume: number;
  topSale: number;
  floorPrice: number;
  volumeDay: number;
  volumeChange: number;
  floorPriceChange: number;
}

type TYPE_VIEWMODE = "VM_LIST" | "VM_COMPACT" | "VM_MASS";
type TYPE_DOMAIN_CARD =
  | "DC_AUCTION"
  | "DC_CART"
  | "DC_PREMIUM"
  | "DC_SOLD"
  | "DC_PURCHASE"
  | "DC_LISTING"
  | "DC_OFFER"
  | undefined;

type TYPE_TX_STATUS = "TX_NONE" | "TX_SUBMIT" | "TX_FAILED" | "TX_SUCCESS";

export type {
  TYPE_COLLECTION,
  TYPE_DOMAIN_OFFER,
  TYPE_DOMAIN,
  TYPE_VIEWMODE,
  TYPE_DOMAIN_CARD,
  TYPE_TX_STATUS,
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
  };
  _domain = JSON.parse(JSON.stringify(_domain));
  return _domain;
};
