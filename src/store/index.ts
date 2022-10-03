import { fetchCollections } from "helper/api/collections";
import {
  TYPE_COLLECTION,
  TYPE_DOMAIN,
  TYPE_TX_STATUS,
} from "helper/interfaces";
import { getSignedRandomValue, getUnsignedRandomValue } from "helper/utils";
import create from "zustand";

interface ICurrentTransaction {
  txHash: string | undefined;
  txStatus: TYPE_TX_STATUS;
}
interface IDomainCart {
  cartDrawerVisible: boolean;
  cartContents: TYPE_DOMAIN[];
}

interface ICollectionStore {
  loading: boolean;
  collections: TYPE_COLLECTION[];
}

interface ITezosCollectState {
  activeAddress: string;
  setActiveAddress: { (_activeAddress: string): void };

  currentTransaction: ICurrentTransaction;
  setCurrentTransaction: { (_currentTransaction: ICurrentTransaction): void };

  domainCart: IDomainCart;
  setDomainCart: { (_domainCart: IDomainCart): void };
  setCartDrawerVisible: { (_cartDrawerVisible: boolean): void };
  setCartContents: { (_cartContents: TYPE_DOMAIN[]): void };

  collectionStore: ICollectionStore;
  fetchCollections: { (): void };
}

export const useTezosCollectStore = create<ITezosCollectState>((set, get) => ({
  currentTransaction: {
    txHash: undefined,
    txStatus: "TX_NONE",
  },
  setCurrentTransaction: (_currentTransaction: ICurrentTransaction) => {
    set((state: any) => ({
      ...state,
      currentTransaction: _currentTransaction,
    }));
  },
  setCurrentTransactionHash: (txHash: string) => {
    set((state: any) => ({
      ...state,
      currentTransaction: { ...state.currentTransaction, txHash },
    }));
  },
  setCurrentTransactionStatus: (txStatus: TYPE_TX_STATUS) => {
    set((state: any) => ({
      ...state,
      currentTransaction: { ...state.currentTransaction, txStatus },
    }));
  },

  domainCart: {
    cartDrawerVisible: false,
    cartContents: [],
  },
  setDomainCart: (_domainCart: IDomainCart) => {
    set((state: any) => ({
      ...state,
      domainCart: _domainCart,
    }));
  },
  setCartContents: (_cartContents: TYPE_DOMAIN[]) => {
    set((state: any) => ({
      ...state,
      domainCart: {
        ...state.domainCart,
        cartContents: _cartContents,
      },
    }));
  },
  setCartDrawerVisible: (_cartDrawerVisible: boolean) => {
    set((state: any) => ({
      ...state,
      domainCart: {
        ...state.domainCart,
        cartDrawerVisible: _cartDrawerVisible,
      },
    }));
  },

  activeAddress: "",
  setActiveAddress: (_activeAddress: string) => {
    set((state: any) => ({
      ...state,
      activeAddress: _activeAddress,
    }));
  },

  collectionStore: {
    loading: true,
    collections: [],
  },

  fetchCollections: async () => {
    set((state: any) => ({
      ...state,
      collectionStore: { loading: true, collections: [] },
    }));
    const collections = await fetchCollections();
    collections.forEach(
      (item) => (item.totalVolume = getUnsignedRandomValue(1000) + 500)
    );
    collections.forEach(
      (item) =>
        (item.numberOfOwners =
          parseInt(getUnsignedRandomValue(1000).toFixed(0)) + 1000)
    );
    collections.forEach(
      (item) =>
        (item.numberOfItems = parseInt(
          getUnsignedRandomValue(10000).toFixed(0)
        ))
    );
    collections.forEach(
      (item) => (item.floorPrice = getUnsignedRandomValue(300))
    );
    collections.forEach((item) => (item.volumeChange = getSignedRandomValue()));
    collections.forEach(
      (item) => (item.floorPriceChange = getSignedRandomValue())
    );
    set((state: any) => ({
      ...state,
      collectionStore: { loading: false, collections },
    }));
  },
}));