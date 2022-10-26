import { RequestSignPayloadInput, SigningType } from "@airgap/beacon-sdk";
import { ContractAbstraction, ContractProvider } from "@taquito/taquito";
import { char2Bytes } from "@taquito/utils";
import { fetchCollections } from "helper/api/collections.api";
import {
  fetchAuctionedDomains,
  fetchDomain,
  fetchFeaturedAuctions,
  fetchTopSaleDomains,
  queryDomain,
  updateDomain,
} from "helper/api/domains.api";
import {
  createDomainActivity,
  fetchDomainActivityByName,
  getDomainActivityByAddress,
  queryDomainActivity,
} from "helper/api/domain_activity.api";
import { getTezosPrice } from "helper/api/other.api";
import {
  fetchProfile,
  updateBookmarkedNamesByAddress,
  fetchBookmarkedNamesByAddress,
} from "helper/api/profile.api";
import {
  DOMAIN_SUFFIX,
  MARKETPLACE_CONTRACT_ADDRESS,
  NAME_REGISTRY_CONTRACT_ADDRESS,
  Tezos,
  TEZOS_COLLECT_WALLET,
} from "helper/constants";
import {
  initializeDomain,
  initializeDomainActivity,
  I_DOMAIN_ACTIVITY,
  I_DOMAIN_ACTIVITY_SEARCH_OPTION,
  I_DOMAIN_SEARCH_VALUE,
  I_PROFILE,
  TYPE_ACTIVITY_SORT_VALUE,
  TYPE_COLLECTION,
  TYPE_DOMAIN,
  TYPE_DOMAIN_OFFER,
  TYPE_MARKET_ADVANCED_FILTER_VALUE,
  TYPE_MARKET_SORT_VALUE,
  TYPE_TX_STATUS,
} from "helper/interfaces";
import TaquitoUtils, {
  isIncludingOperator,
} from "helper/taquito/marketplace-utils";

import create from "zustand";

interface ICurrentTransaction {
  txHash: string | undefined;
  txStatus: TYPE_TX_STATUS;
}
interface IMakeOfferModal {
  visible: boolean;
  tokenId: number;
  name?: "";
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
  tezosPrice: number;
  fetcTezosPrice: { (): void };
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
  findCollectionBySlug: { (_slug: string): TYPE_COLLECTION | undefined };

  bookmarkedNames: string[];
  toggleBookmark: { (_name: string): void };
  fetchBookmarkedNamesByAddress: { (_name: string): Promise<string[]> };

  cachedDomains: TYPE_DOMAIN[];
  cacheDomain: { (_domain: TYPE_DOMAIN): void };
  updateCachedDomain: { (_domain: TYPE_DOMAIN): void };
  getDomainActivityByName: { (name: string): Promise<I_DOMAIN_ACTIVITY[]> };
  getDomainActivityByAddress: {
    (address: string): Promise<I_DOMAIN_ACTIVITY[]>;
  };
  queryDomainActivity: {
    (
      _searchOptions: I_DOMAIN_ACTIVITY_SEARCH_OPTION,
      _sortOption: TYPE_ACTIVITY_SORT_VALUE
    ): Promise<{ domainActivities: I_DOMAIN_ACTIVITY[]; count: number }>;
  };

  queryDomain: {
    (
      _searchOptions: I_DOMAIN_SEARCH_VALUE,
      _advancedFilterValues: TYPE_MARKET_ADVANCED_FILTER_VALUE[],
      sortOption: TYPE_MARKET_SORT_VALUE
    ): Promise<{ domains: TYPE_DOMAIN[]; count: number }>;
  };

  topSaleDomains: TYPE_DOMAIN[][];
  fetchTopSaleDomains: { (): void };

  featuredAuctions: TYPE_DOMAIN[];
  fetchFeaturedAuctions: { (): void };

  auctionedDomains: TYPE_DOMAIN[];
  fetchAuctionedDomains: { (): void };

  findDomainByName: { (name: string): Promise<TYPE_DOMAIN | undefined> };
  findDomainByTokenId: { (token_id: number): TYPE_DOMAIN | undefined };

  fetchOnChainDomainDataByName: {
    (name: string | undefined): Promise<TYPE_DOMAIN>;
  };
  fetchOnChainReverseRecord: {
    (name: string): Promise<string>;
  };

  // interating with Tezos
  contractReady: boolean;
  nameRegistryContract: ContractAbstraction<ContractProvider> | null;
  marketPlaceContract: ContractAbstraction<ContractProvider> | null;
  initializeContracts: { (): void };
  requestSignMessage: {
    (input: string): Promise<{
      signature: string;
      payloadBytes: string;
      publicKey: string;
    }>;
  };

  makeOfferToDomain: {
    (tokenId: number, amount: number, offer_until: Date): Promise<boolean>;
  };
  cancelOfferToDomain: { (tokenId: number): Promise<boolean> };
  sellOfferForOffer: {
    (
      tokenId: number,
      offerer: string,
      amoumt: number,
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
      auction_started_at: Date,
      auction_ends_at: Date
      // durationId: number
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
      defaultAmount: number,
      sale_started_at: Date,
      sale_ends_at: Date
    ): Promise<boolean>;
  };

  cancelForSale: {
    (tokenId: number): Promise<boolean>;
  };
  buyForSale: {
    (tokenId: number, price: number): Promise<boolean>;
  };

  profile: I_PROFILE;
  fetchProfile: {
    (address: string): Promise<I_PROFILE>;
  };
}

export const useTezosCollectStore = create<ITezosCollectState>((set, get) => ({
  tezosPrice: 0,
  fetcTezosPrice: async () => {
    const udpateTezosPrice = async () => {
      const _price = await getTezosPrice();
      set((state) => ({
        ...state,
        tezosPrice: _price,
      }));
    };
    udpateTezosPrice();
    setInterval(() => udpateTezosPrice(), 20000);
  },
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
    // collections.forEach(
    //   (item) => (item.totalVolume = getUnsignedRandomValue(1000) + 500)
    // );
    // collections.forEach(
    //   (item) =>
    //     (item.numberOfOwners =
    //       parseInt(getUnsignedRandomValue(1000).toFixed(0)) + 1000)
    // );
    // collections.forEach(
    //   (item) =>
    //     (item.numberOfItems = parseInt(
    //       getUnsignedRandomValue(10000).toFixed(0)
    //     ))
    // );
    // collections.forEach(
    //   (item) => (item.floorPrice = getUnsignedRandomValue(300))
    // );
    // collections.forEach((item) => (item.volumeDayChange = getSignedRandomValue()));
    // collections.forEach(
    //   (item) => (item.floorPriceChange = getSignedRandomValue())
    // );
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
  findCollectionBySlug: (_slug: string) => {
    return get().collectionStore.collections.find(
      (item) => item.slug === _slug
    );
  },

  bookmarkedNames: JSON.parse(localStorage.getItem("bookmarkedNames") || "[]"),
  toggleBookmark: (_name: string) => {
    const indexOf = get().bookmarkedNames.indexOf(_name);
    if (indexOf >= 0) {
      get().bookmarkedNames.splice(indexOf, 1);
    } else get().bookmarkedNames.push(_name);

    set((state: any) => ({
      ...state,
      bookmarkedNames: get().bookmarkedNames,
    }));
    localStorage.setItem(
      "bookmarkedNames",
      JSON.stringify(get().bookmarkedNames)
    );
    updateBookmarkedNamesByAddress(get().activeAddress, get().bookmarkedNames);
  },

  fetchBookmarkedNamesByAddress: async (_address: string) => {
    return await fetchBookmarkedNamesByAddress(_address);
  },

  cachedDomains: [],
  cacheDomain: (_domain: TYPE_DOMAIN) => {
    const index = get().cachedDomains.findIndex(
      (item) => item.name === _domain.name
    );
    if (index !== -1) get().cachedDomains.splice(index, 1);
    get().cachedDomains.push(_domain);
  },
  updateCachedDomain: async (_domain: TYPE_DOMAIN) => {
    get().cacheDomain(_domain);
    updateDomain(_domain);
  },

  getDomainActivityByName: async (name: string) => {
    const result: I_DOMAIN_ACTIVITY[] = await fetchDomainActivityByName(name);
    result.forEach((item) => (item.timestamp = new Date(item.timestamp)));
    return result.sort((b, a) => a.timestamp.getTime() - b.timestamp.getTime());
  },
  getDomainActivityByAddress: async (address: string) => {
    const result: I_DOMAIN_ACTIVITY[] = await getDomainActivityByAddress(
      address
    );
    result.forEach((item) => (item.timestamp = new Date(item.timestamp)));
    return result.sort((b, a) => a.timestamp.getTime() - b.timestamp.getTime());
  },

  queryDomainActivity: async (
    _searchOptions: I_DOMAIN_ACTIVITY_SEARCH_OPTION,
    _sortOption: TYPE_ACTIVITY_SORT_VALUE
  ) => {
    const result = await queryDomainActivity(_searchOptions, _sortOption);
    return result;
  },

  queryDomain: async (
    _searchOptions: I_DOMAIN_SEARCH_VALUE,
    _advancedFilterValues: TYPE_MARKET_ADVANCED_FILTER_VALUE[],
    _sortOption: TYPE_MARKET_SORT_VALUE
  ) => {
    const result = await queryDomain(
      _searchOptions,
      _advancedFilterValues,
      _sortOption
    );
    return result;
  },
  topSaleDomains: [],
  fetchTopSaleDomains: async () => {
    const _topSaleDomains = await fetchTopSaleDomains();
    _topSaleDomains.forEach((itemArr) => {
      itemArr.forEach((item) => get().cacheDomain(item));
    });
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
      get().cacheDomain(item);
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
      get().cacheDomain(item);
    });

    set((state: any) => ({
      ...state,
      auctionedDomains: _auctionedDomains,
    }));
  },
  findDomainByName: async (name: string) => {
    let _domain: TYPE_DOMAIN | undefined = get().cachedDomains.find(
      (item) => item.name === name
    );
    if (_domain) return _domain;
    _domain = await fetchDomain(name);
    if (_domain) get().cacheDomain(_domain);
    return _domain;
  },

  findDomainByTokenId: (tokenId: number) => {
    let _domain: TYPE_DOMAIN | undefined = get().cachedDomains.find(
      (item) => item.tokenId === tokenId
    );
    if (_domain) return _domain;
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
        _marketPlaceStorage?.offers_map?.get(_record.tzip12_token_id),
        _marketPlaceStorage?.orders_map?.get(_record.tzip12_token_id),
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
        _domain.price = orders_map.default_amount.toNumber() / 10 ** 6;
        _domain.isForAuction = orders_map.is_for_auction;
        _domain.isForSale = orders_map.is_for_sale;
        _domain.topBid = orders_map.last_bid_amount.toNumber() / 10 ** 6;
        _domain.topBidder = orders_map.last_bidder;
        _domain.ownerChanged = _record.owner != orders_map.owner;
        if (orders_map.is_for_auction) {
          _domain.auctionEndsAt = new Date(orders_map.auction_ends_at);
          _domain.auctionStartedAt = new Date(orders_map.auction_started_at);
        }
        if (orders_map.is_for_sale) {
          _domain.saleEndsAt = new Date(orders_map.auction_ends_at);
          _domain.saleStartedAt = new Date(orders_map.auction_started_at);
        }
      }
      return _domain;
    } catch (error) {
      console.log(error);
    }
    return _initalizedDomain;
  },

  fetchOnChainReverseRecord: async (address: string) => {
    try {
      const _nameRegistryContract = get().nameRegistryContract;
      const _nameRegistryStorage: any = await _nameRegistryContract?.storage();
      const obj = await _nameRegistryStorage.store["reverse_records"].get(
        address
      );
      return TaquitoUtils.bytes2Char(obj.name);
    } catch (error) {
      console.log(error);
      return address.substring(0, 8);
    }
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
  requestSignMessage: async (input: string) => {
    // The data to format

    const ISO8601formatedTimestamp = new Date().toISOString();

    // The full string
    const formattedInput: string = [
      "Tezos Signed Message: \n",
      ISO8601formatedTimestamp,
      input,
    ].join(" ");

    // The bytes to sign
    const bytes = char2Bytes(formattedInput);
    const payloadBytes =
      "05" + "0100" + char2Bytes(bytes.length.toString()) + bytes;

    // The payload to send to the wallet
    const payload: RequestSignPayloadInput = {
      signingType: SigningType.MICHELINE,
      payload: payloadBytes,
      sourceAddress: get().activeAddress,
    };

    // The signing
    const signedPayload = await TEZOS_COLLECT_WALLET.client.requestSignPayload(
      payload
    );

    // The signature
    const { signature } = signedPayload;
    return {
      signature,
      payloadBytes,
      publicKey:
        (await TEZOS_COLLECT_WALLET.client.getActiveAccount())?.publicKey || "",
    };
  },

  makeOfferModal: { tokenId: -1, name: "", visible: false, callback: null },
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
    offer_until: Date
  ) => {
    // console.log(tokenId, amount, durationId);
    if (get().activeAddress === "") {
      alert("Need to connect wallet first!");
      return false;
    }
    if (get().contractReady === false) return false;

    const _marketPlaceContract = get().marketPlaceContract;
    const _txOp: any = await _marketPlaceContract?.methods
      .make_offer(offer_until, tokenId)
      .send({ amount });

    get().setMakeOfferModalVisible(false);
    get().setCurrentTransaction({
      txHash: _txOp.opHash,
      txStatus: "TX_SUBMIT",
    });
    await _txOp.confirmation(1);

    const _domain = get().findDomainByTokenId(tokenId);
    createDomainActivity({
      ...initializeDomainActivity(),
      name: _domain?.name || "",
      type: "NEW_OFFER",
      txHash: _txOp.opHash,
      amount,
      from: get().activeAddress,
      to: _domain?.owner || "",
    });
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

    const _domain = get().findDomainByTokenId(tokenId);
    createDomainActivity({
      ...initializeDomainActivity(),
      name: _domain?.name || "",
      type: "CANCEL_OFFER",
      txHash: _txOp.opHash,
      amount: 0,
      from: get().activeAddress,
      to: _domain?.owner || "",
    });
    get().setCurrentTransaction({
      txHash: _txOp.opHash,
      txStatus: "TX_SUCCESS",
    });
    return true;
  },
  sellOfferForOffer: async (
    tokenId: number,
    offerer: string,
    amount: number,
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

    const _domain = get().findDomainByTokenId(tokenId);
    createDomainActivity({
      ...initializeDomainActivity(),
      name: _domain?.name || "",
      type: "SELL_ON_OFFER",
      txHash: _txOp.opHash,
      amount: amount,
      from: offerer,
      to: get().activeAddress,
    });
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
    auction_started_at: Date,
    auction_ends_at: Date
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
            auction_started_at,
            auction_ends_at,
            defaultAmount * 10 ** 6,
            tokenId
          )
        )
        .send();
    } else
      _txOp = await _marketPlaceContract?.methods
        .list_for_auction(
          auction_started_at,
          auction_ends_at,
          defaultAmount * 10 ** 6,
          tokenId
        )
        .send();

    get().setOpenAuctionModalVisible(false);
    get().setCurrentTransaction({
      txHash: _txOp.opHash,
      txStatus: "TX_SUBMIT",
    });
    await _txOp.confirmation(1);

    const _domain = get().findDomainByTokenId(tokenId);
    createDomainActivity({
      ...initializeDomainActivity(),
      name: _domain?.name || "",
      type: "LIST_FOR_AUCTION",
      txHash: _txOp.opHash,
      amount: defaultAmount,
      from: get().activeAddress,
      to: get().activeAddress,
    });
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

    const _domain = get().findDomainByTokenId(tokenId);
    createDomainActivity({
      ...initializeDomainActivity(),
      name: _domain?.name || "",
      type: "PLACE_BID",
      txHash: _txOp.opHash,
      amount: bidAmount,
      from: get().activeAddress,
      to: _domain?.owner || "",
    });

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

    const _domain = get().findDomainByTokenId(tokenId);
    createDomainActivity({
      ...initializeDomainActivity(),
      name: _domain?.name || "",
      type: "COMPLETE_AUCTION",
      txHash: _txOp.opHash,
      amount: _domain?.topBid || 0,
      from: get().activeAddress,
      to: _domain?.owner || "",
    });

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
    defaultAmount: number,
    sale_started_at: Date,
    sale_ends_at: Date
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
            sale_ends_at,
            sale_started_at,
            tokenId
          )
        )
        .send();
    } else
      _txOp = await _marketPlaceContract?.methods
        .list_for_sale(
          defaultAmount * 10 ** 6,
          sale_ends_at,
          sale_started_at,
          tokenId
        )
        .send();

    get().setListForSaleModalVisible(false);
    get().setCurrentTransaction({
      txHash: _txOp.opHash,
      txStatus: "TX_SUBMIT",
    });
    await _txOp.confirmation(1);

    const _domain = get().findDomainByTokenId(tokenId);
    createDomainActivity({
      ...initializeDomainActivity(),
      name: _domain?.name || "",
      type: "LIST_FOR_SALE",
      txHash: _txOp.opHash,
      amount: defaultAmount,
      from: get().activeAddress,
      to: get().activeAddress,
    });

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

    const _domain = get().findDomainByTokenId(tokenId);
    createDomainActivity({
      ...initializeDomainActivity(),
      name: _domain?.name || "",
      type: "DELIST_FOR_SALE",
      txHash: _txOp.opHash,
      amount: _domain?.price || 0,
      from: get().activeAddress,
      to: _domain?.owner || "",
    });
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

    const _domain = get().findDomainByTokenId(tokenId);
    createDomainActivity({
      ...initializeDomainActivity(),
      name: _domain?.name || "",
      type: "BUY_FROM_SALE",
      txHash: _txOp.opHash,
      amount: price,
      from: _domain?.owner || "",
      to: get().activeAddress,
    });

    get().setCurrentTransaction({
      txHash: _txOp.opHash,
      txStatus: "TX_SUCCESS",
    });

    return true;
  },

  profile: {
    address: "",
    holding: 0,
    totalVolume: 0,
    avatarLink: "",
    bookmarkedNames: JSON.parse(
      localStorage.getItem("bookmarkedNames") || "[]"
    ),
  },
  fetchProfile: async (_address: string) => {
    let reversedName: string;
    let profile: I_PROFILE;
    [reversedName, profile] = await Promise.all([
      get().fetchOnChainReverseRecord(_address),
      fetchProfile(_address),
    ]);

    profile = {
      ...profile,
      reversedName,
    };

    if (profile.address === get().activeAddress) {
      set((state: any) => ({
        ...state,
        profile,
      }));
    }

    return profile;
  },
}));
