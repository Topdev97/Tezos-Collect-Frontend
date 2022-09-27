interface TYPE_DOMAIN {
  tokenId: number;
  name: string;
  owner: string;
  lastSalePrice?: number;
  price: number;
  collection: string;
  tags: string[];
  registedAt?: Date;
  expiresAt?: Date;
  bookmarked: boolean;
}

type TYPE_VIEWMODE = "VM_LIST" | "VM_COMPACT" | "VM_MASS";

export type { TYPE_DOMAIN, TYPE_VIEWMODE };
