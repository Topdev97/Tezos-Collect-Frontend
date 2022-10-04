interface TYPE_DOMAIN {
  name: string;
  owner: string;
  tags: string[];
  lastSoldAt: Date;
  lastSoldAmount: number;

  isRegisterd: boolean;
  registeredAt: Date;
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
}

interface TYPE_COLLECTION {
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
  TYPE_DOMAIN,
  TYPE_VIEWMODE,
  TYPE_DOMAIN_CARD,
  TYPE_TX_STATUS,
};
