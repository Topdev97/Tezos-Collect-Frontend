import { ContractAbstraction, ContractProvider } from "@taquito/taquito";
import { fetchCollections } from "helper/api/collections.api";
import {
  fetchAuctionedDomains,
  fetchDomain,
  fetchFeaturedAuctions,
  fetchTopSaleDomains,
  updateDomain,
} from "helper/api/domains.api";
import {
  DOMAIN_SUFFIX,
  MARKETPLACE_CONTRACT_ADDRESS,
  NAME_REGISTRY_CONTRACT_ADDRESS,
  Tezos,
} from "helper/constants";
import {
  initializeDomain,
  TYPE_COLLECTION,
  TYPE_DOMAIN,
  TYPE_DOMAIN_OFFER,
  TYPE_TX_STATUS,
} from "helper/interfaces";
import TaquitoUtils, {
  isIncludingOperator,
} from "helper/taquito/marketplace-utils";
import { getSignedRandomValue, getUnsignedRandomValue } from "helper/utils";

import create from "zustand";

interface ICurrentTransaction {
  txHash: string | undefined;
  txStatus: TYPE_TX_STATUS;
}
interface IMakeOfferModal {
  visible: boolean;
  tokenId: number;
  callback: any;
}
interface IOpenAuctionModal {
  visible: boolean;
  includingOperator: boolean;
  tokenId: number;
  callback: any;
}
interface IPlaceBidModal {
  visible: boolean;
  tokenId: number;
  callback: any;
  topBid: number;
}

interface IListForSaleModal {
  visible: boolean;
  includingOperator: boolean;
  tokenId: number;
  name: string;
  callback: any;
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
  findCollectionById: { (_collectionId: string): TYPE_COLLECTION | undefined };

  topSaleDomains: TYPE_DOMAIN[][];
  fetchTopSaleDomains: { (): void };

  featuredAuctions: TYPE_DOMAIN[];
  fetchFeaturedAuctions: { (): void };

  auctionedDomains: TYPE_DOMAIN[];
  fetchAuctionedDomains: { (): void };

  findDomainByName: { (name: string): Promise<TYPE_DOMAIN | undefined> };

  fetchOnChainDomainDataByName: {
    (name: string | undefined): Promise<TYPE_DOMAIN>;
  };

  updateCachedDomain: { (_domain: TYPE_DOMAIN): void };

  // interating with Tezos
  contractReady: boolean;
  nameRegistryContract: ContractAbstraction<ContractProvider> | null;
  marketPlaceContract: ContractAbstraction<ContractProvider> | null;
  initializeContracts: { (): void };
  makeOfferToDomain: {
    (tokenId: number, amount: number, durationId: number): Promise<boolean>;
  };
  cancelOfferToDomain: { (tokenId: number): Promise<boolean> };
  sellOfferForOffer: {
    (
      tokenId: number,
      offerer: string,
      includingOperator: boolean
    ): Promise<boolean>;
  };

  makeOfferModal: IMakeOfferModal;
  setMakeOfferModal: { (_makeOfferModal: IMakeOfferModal): void };
  setMakeOfferModalVisible: { (visible: boolean): void };

  openAuctionModal: IOpenAuctionModal;
  setOpenAuctionModal: { (_openAuctionModal: IOpenAuctionModal): void };
  setOpenAuctionModalVisible: { (visible: boolean): void };
  listForAuction: {
    (
      tokenId: number,
      includingOperator: boolean,
      defaultAmount: number,
      durationId: number
    ): Promise<boolean>;
  };

  // auction
  placeBidModal: IPlaceBidModal;
  setPlaceBidModal: { (_placeBidModal: IPlaceBidModal): void };
  setPlaceBidModalVisible: { (visible: boolean): void };
  placeBid: { (tokenId: number, bidAmount: number): void };

  claimWinnedAuction: {
    (
      tokenId: number,
      callback: any,
      includingOperator: boolean,
      isYourDomain: boolean
    ): void;
  };

  // List for Sale
  listForSaleModal: IListForSaleModal;
  setListForSaleModal: { (_listForSaleModal: IListForSaleModal): void };
  setListForSaleModalVisible: { (visible: boolean): void };
  listForSale: {
    (
      tokenId: number,
      includingOperator: boolean,
      defaultAmount: number
      // durationId: number
    ): Promise<boolean>;
  };

  cancelForSale: {
    (tokenId: number): Promise<boolean>;
  };
  buyForSale: {
    (tokenId: number, price: number): Promise<boolean>;
  };
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
    collections: JSON.parse(localStorage.getItem("collections") || "[]") || [],
  },

  fetchCollections: async () => {
    set((state: any) => ({
      ...state,
      collectionStore: {
        loading: true,
        collections: get().collectionStore.collections,
      },
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
    localStorage.setItem("collections", JSON.stringify(collections));
    set((state: any) => ({
      ...state,
      collectionStore: { loading: false, collections },
    }));
  },
  findCollectionById: (_collectionId: string) => {
    return get().collectionStore.collections.find(
      (item) => item._id === _collectionId
    );
  },

  topSaleDomains: [],
  fetchTopSaleDomains: async () => {
    const _topSaleDomains = await fetchTopSaleDomains();
    set((state: any) => ({
      ...state,
      topSaleDomains: _topSaleDomains,
    }));
  },

  featuredAuctions: [],
  fetchFeaturedAuctions: async () => {
    const _featuredAuctions = await fetchFeaturedAuctions();
    _featuredAuctions.forEach((item) => {
      item.auctionEndsAt = new Date(item.auctionEndsAt);
      item.auctionStartedAt = new Date(item.auctionStartedAt);
      item.lastSoldAt = new Date(item.lastSoldAt);
    });
    set((state: any) => ({
      ...state,
      featuredAuctions: _featuredAuctions,
    }));
  },

  auctionedDomains: [],
  fetchAuctionedDomains: async () => {
    const _auctionedDomains = await fetchAuctionedDomains();
    _auctionedDomains.forEach((item) => {
      item.auctionEndsAt = new Date(item.auctionEndsAt);
      item.auctionStartedAt = new Date(item.auctionStartedAt);
      item.lastSoldAt = new Date(item.lastSoldAt);
    });
    set((state: any) => ({
      ...state,
      auctionedDomains: _auctionedDomains,
    }));
  },
  findDomainByName: async (name: string) => {
    let _domain: TYPE_DOMAIN | undefined = get().featuredAuctions.find(
      (item) => item.name === name
    );
    if (_domain) return _domain;
    _domain = get().auctionedDomains.find((item) => item.name === name);
    if (_domain) return _domain;
    _domain = await fetchDomain(name);
    return _domain;
  },

  fetchOnChainDomainDataByName: async (
    name: string | undefined
  ): Promise<TYPE_DOMAIN> => {
    const _initalizedDomain: TYPE_DOMAIN = {
      ...initializeDomain(),
      name: name || "",
    };
    try {
      if (name === undefined) return _initalizedDomain;

      const _nameRegistryContract = get().nameRegistryContract;
      const _marketPlaceContract = get().marketPlaceContract;

      const [_nameRegistryStorage, _marketPlaceStorage]: any[] =
        await Promise.all([
          _nameRegistryContract?.storage(),
          _marketPlaceContract?.storage(),
        ]);

      const [_record, expiresAt] = await Promise.all([
        _nameRegistryStorage.store["records"].get(
          TaquitoUtils.char2Bytes(`${name}${DOMAIN_SUFFIX}`)
        ),
        _nameRegistryStorage.store["expiry_map"].get(
          TaquitoUtils.char2Bytes(`${name}${DOMAIN_SUFFIX}`)
        ),
      ]);
      const [offers_map, orders_map] = await Promise.all([
        _marketPlaceStorage?.offers_map.get(_record.tzip12_token_id),
        _marketPlaceStorage?.orders_map.get(_record.tzip12_token_id),
      ]);

      const offers: TYPE_DOMAIN_OFFER[] = [];
      let topOffer: number = 0;

      if (offers_map)
        for (let offerer of offers_map.keys()) {
          const offer = offers_map.get(offerer);
          offers.push({
            offer_amount: offer.offer_amount.toNumber(),
            offer_made_at: new Date(offer.offer_made_at),
            offer_until: new Date(offer.offer_until),
            offerer: offerer,
          });
          topOffer = Math.max(topOffer, offer.offer_amount / 10 ** 6);
        }

      const _domain: TYPE_DOMAIN = {
        ...initializeDomain(),
        name,
        owner: _record.owner,
        isRegistered: true,
        tokenId: _record.tzip12_token_id.toNumber(),
        expiresAt: new Date(expiresAt),
        includingOperator: isIncludingOperator(
          _record.internal_data.get("operators")
        ),
        offers,
        topOffer,
      };

      if (orders_map) {
        _domain.auctionEndsAt = new Date(orders_map.auction_ends_at);
        _domain.auctionStartedAt = new Date(orders_map.auction_started_at);
        _domain.price = orders_map.default_amount.toNumber() / 10 ** 6;
        _domain.isForAuction = orders_map.is_for_auction;
        _domain.isForSale = orders_map.is_for_sale;
        _domain.topBid = orders_map.last_bid_amount.toNumber() / 10 ** 6;
        _domain.topBidder = orders_map.last_bidder;
        _domain.ownerChanged = _record.owner != orders_map.owner;
      }
      return _domain;
    } catch (error) {
      console.log(error);
    }
    return _initalizedDomain;
  },

  updateCachedDomain: async (_domain: TYPE_DOMAIN) => {
    updateDomain(_domain);
  },

  // Interacting with Tezs
  contractReady: false,
  nameRegistryContract: null,
  marketPlaceContract: null,
  initializeContracts: async () => {
    const [_nameRegistryContract, _marketPlaceContract] = await Promise.all([
      Tezos.wallet.at(NAME_REGISTRY_CONTRACT_ADDRESS),
      Tezos.wallet.at(MARKETPLACE_CONTRACT_ADDRESS),
    ]);

    set((state: any) => ({
      ...state,
      contractReady: true,
      nameRegistryContract: _nameRegistryContract,
      marketPlaceContract: _marketPlaceContract,
    }));
  },
  makeOfferModal: { tokenId: -1, visible: false, callback: null },
  setMakeOfferModal: (_makeOfferModal: IMakeOfferModal) => {
    set((state: any) => ({
      ...state,
      makeOfferModal: _makeOfferModal,
    }));
  },
  setMakeOfferModalVisible: (_visible: boolean) => {
    set((state: any) => ({
      ...state,
      makeOfferModal: {
        ...state.makeOfferModal,
        visible: _visible,
      },
    }));
  },

  makeOfferToDomain: async (
    tokenId: number,
    amount: number,
    durationId: number
  ) => {
    // console.log(tokenId, amount, durationId);
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) return false;

    const _marketPlaceContract = get().marketPlaceContract;
    const _txOp: any = await _marketPlaceContract?.methods
      .make_offer(durationId, tokenId)
      .send({ amount });

    get().setMakeOfferModalVisible(false);
    get().setCurrentTransaction({
      txHash: _txOp.opHash,
      txStatus: "TX_SUBMIT",
    });
    await _txOp.confirmation(1);
    get().setCurrentTransaction({
      txHash: _txOp.opHash,
      txStatus: "TX_SUCCESS",
    });

    return true;
  },
  cancelOfferToDomain: async (tokenId: number) => {
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) return false;

    const _marketPlaceContract = get().marketPlaceContract;
    const _txOp: any = await _marketPlaceContract?.methods
      .cancel_offer(tokenId)
      .send();
    get().setCurrentTransaction({
      txHash: _txOp.opHash,
      txStatus: "TX_SUBMIT",
    });
    await _txOp.confirmation(1);
    get().setCurrentTransaction({
      txHash: _txOp.opHash,
      txStatus: "TX_SUCCESS",
    });
    return true;
  },
  sellOfferForOffer: async (
    tokenId: number,
    offerer: string,
    includingOperator: boolean
  ) => {
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) return false;

    const _marketPlaceContract = get().marketPlaceContract;
    const _nameRegistryContract = get().nameRegistryContract;
    let _txOp: any;

    if (includingOperator === false) {
      _txOp = await Tezos.wallet
        .batch()
        .withContractCall(
          // @ts-ignore
          _nameRegistryContract.methods.update_operators([
            {
              add_operator: {
                owner: get().activeAddress,
                operator: MARKETPLACE_CONTRACT_ADDRESS,
                token_id: tokenId,
              },
            },
          ])
        )
        // @ts-ignore
        .withContractCall(_marketPlaceContract?.methods.sell(offerer, tokenId))
        .send();
    } else {
      console.log("Sell");
      _txOp = await _marketPlaceContract?.methods.sell(offerer, tokenId).send();
    }
    get().setCurrentTransaction({
      txHash: _txOp.opHash,
      txStatus: "TX_SUBMIT",
    });
    await _txOp.confirmation(1);
    get().setCurrentTransaction({
      txHash: _txOp.opHash,
      txStatus: "TX_SUCCESS",
    });
    return true;
  },

  openAuctionModal: {
    tokenId: -1,
    visible: false,
    includingOperator: false,
    callback: null,
  },
  setOpenAuctionModal: (_openAuctionModal: IOpenAuctionModal) => {
    set((state: any) => ({
      ...state,
      openAuctionModal: _openAuctionModal,
    }));
  },
  setOpenAuctionModalVisible: (_visible: boolean) => {
    set((state: any) => ({
      ...state,
      openAuctionModal: {
        ...state.openAuctionModal,
        visible: _visible,
      },
    }));
  },

  listForAuction: async (
    tokenId: number,
    includingOperator: boolean,
    defaultAmount: number,
    durationId: number
  ) => {
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) return false;

    const _marketPlaceContract = get().marketPlaceContract;
    const _nameRegistryContract = get().nameRegistryContract;
    let _txOp: any;
    if (!includingOperator) {
      _txOp = await Tezos.wallet
        .batch()
        .withContractCall(
          // @ts-ignore
          _nameRegistryContract.methods.update_operators([
            {
              add_operator: {
                owner: get().activeAddress,
                operator: MARKETPLACE_CONTRACT_ADDRESS,
                token_id: tokenId,
              },
            },
          ])
        )
        .withContractCall(
          // @ts-ignore
          _marketPlaceContract?.methods.list_for_auction(
            defaultAmount * 10 ** 6,
            durationId,
            tokenId
          )
        )
        .send();
    } else
      _txOp = await _marketPlaceContract?.methods
        .list_for_auction(defaultAmount * 10 ** 6, durationId, tokenId)
        .send();

    get().setOpenAuctionModalVisible(false);
    get().setCurrentTransaction({
      txHash: _txOp.opHash,
      txStatus: "TX_SUBMIT",
    });
    await _txOp.confirmation(1);
    get().setCurrentTransaction({
      txHash: _txOp.opHash,
      txStatus: "TX_SUCCESS",
    });

    return true;
  },

  placeBidModal: { tokenId: -1, visible: false, callback: null, topBid: 0 },
  setPlaceBidModal: (_placeBidModal: IPlaceBidModal) => {
    set((state: any) => ({
      ...state,
      placeBidModal: _placeBidModal,
    }));
  },
  setPlaceBidModalVisible: (_visible: boolean) => {
    set((state: any) => ({
      ...state,
      placeBidModal: {
        ...state.placeBidModal,
        visible: _visible,
      },
    }));
  },

  placeBid: async (tokenId: number, bidAmount: number) => {
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) return false;

    const _marketPlaceContract = get().marketPlaceContract;
    const _txOp: any = await _marketPlaceContract?.methods
      .place_bid(tokenId)
      .send({ amount: bidAmount });

    get().setPlaceBidModalVisible(false);
    get().setCurrentTransaction({
      txHash: _txOp.opHash,
      txStatus: "TX_SUBMIT",
    });
    await _txOp.confirmation(1);
    get().setCurrentTransaction({
      txHash: _txOp.opHash,
      txStatus: "TX_SUCCESS",
    });

    return true;
  },

  claimWinnedAuction: async (
    tokenId: number,
    callback: any,
    includingOperator: boolean,
    isYourDomain: boolean
  ) => {
    console.log(includingOperator, isYourDomain);
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) return false;

    const _marketPlaceContract = get().marketPlaceContract;
    const _nameRegistryContract = get().nameRegistryContract;
    let _txOp: any;
    if (isYourDomain === true && includingOperator === false) {
      _txOp = await Tezos.wallet
        .batch()
        .withContractCall(
          // @ts-ignore
          _nameRegistryContract.methods.update_operators([
            {
              add_operator: {
                owner: get().activeAddress,
                operator: MARKETPLACE_CONTRACT_ADDRESS,
                token_id: tokenId,
              },
            },
          ])
        )
        .withContractCall(
          // @ts-ignore
          _marketPlaceContract?.methods.claim_winned_auction(tokenId)
        )
        .send();
    } else
      _txOp = await _marketPlaceContract?.methods
        .claim_winned_auction(tokenId)
        .send();

    get().setPlaceBidModalVisible(false);
    get().setCurrentTransaction({
      txHash: _txOp.opHash,
      txStatus: "TX_SUBMIT",
    });
    await _txOp.confirmation(1);
    get().setCurrentTransaction({
      txHash: _txOp.opHash,
      txStatus: "TX_SUCCESS",
    });

    if (callback) callback();
    return true;
  },

  listForSaleModal: {
    tokenId: -1,
    name: "",
    visible: false,
    includingOperator: false,
    callback: null,
  },

  setListForSaleModal: (_listForSaleModal: IListForSaleModal) => {
    set((state: any) => ({
      ...state,
      listForSaleModal: _listForSaleModal,
    }));
  },
  setListForSaleModalVisible: (_visible: boolean) => {
    set((state: any) => ({
      ...state,
      listForSaleModal: {
        ...state.listForSaleModal,
        visible: _visible,
      },
    }));
  },

  listForSale: async (
    tokenId: number,
    includingOperator: boolean,
    defaultAmount: number
    // durationId: number
  ) => {
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) return false;

    const _marketPlaceContract = get().marketPlaceContract;
    const _nameRegistryContract = get().nameRegistryContract;
    let _txOp: any;
    if (!includingOperator) {
      _txOp = await Tezos.wallet
        .batch()
        .withContractCall(
          // @ts-ignore
          _nameRegistryContract.methods.update_operators([
            {
              add_operator: {
                owner: get().activeAddress,
                operator: MARKETPLACE_CONTRACT_ADDRESS,
                token_id: tokenId,
              },
            },
          ])
        )
        .withContractCall(
          // @ts-ignore
          _marketPlaceContract?.methods.list_for_sale(
            defaultAmount * 10 ** 6,
            // durationId,
            tokenId
          )
        )
        .send();
    } else
      _txOp = await _marketPlaceContract?.methods
        .list_for_sale(defaultAmount * 10 ** 6, tokenId)
        .send();

    get().setListForSaleModalVisible(false);
    get().setCurrentTransaction({
      txHash: _txOp.opHash,
      txStatus: "TX_SUBMIT",
    });
    await _txOp.confirmation(1);
    get().setCurrentTransaction({
      txHash: _txOp.opHash,
      txStatus: "TX_SUCCESS",
    });

    return true;
  },
  cancelForSale: async (
    tokenId: number
    // durationId: number
  ) => {
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) return false;

    const _marketPlaceContract = get().marketPlaceContract;
    const _txOp: any = await _marketPlaceContract?.methods
      .cancel_for_sale(tokenId)
      .send();

    get().setCurrentTransaction({
      txHash: _txOp.opHash,
      txStatus: "TX_SUBMIT",
    });
    await _txOp.confirmation(1);
    get().setCurrentTransaction({
      txHash: _txOp.opHash,
      txStatus: "TX_SUCCESS",
    });

    return true;
  },
  buyForSale: async (
    tokenId: number,
    price: number
    // durationId: number
  ) => {
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) return false;

    const _marketPlaceContract = get().marketPlaceContract;
    const _txOp: any = await _marketPlaceContract?.methods
      .buy(tokenId)
      .send({ amount: price });

    get().setCurrentTransaction({
      txHash: _txOp.opHash,
      txStatus: "TX_SUBMIT",
    });
    await _txOp.confirmation(1);
    get().setCurrentTransaction({
      txHash: _txOp.opHash,
      txStatus: "TX_SUCCESS",
    });

    return true;
  },
}));
