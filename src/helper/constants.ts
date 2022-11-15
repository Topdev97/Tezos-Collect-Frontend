import { ColorMode, Network, NetworkType } from "@airgap/beacon-sdk";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import {
  TYPE_MARKET_ADVANCED_FILTER_VALUE,
  TYPE_MARKET_SORT_VALUE,
} from "./interfaces";

// Set the network (Mainnet is default)
export const TEZOS_COLLECT_NETWORK: Network = {
  type:
    // process.env.NODE_ENV === "development"
    // ? NetworkType.GHOSTNET:
    NetworkType.MAINNET,
};

export const NFT_STORAGE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEZlOTRmMzBFRDQzMzkwQUVkMDBGQTNCY2E3NzY3Nzg2NjhiMDA3ZGQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MTM3MDI4MjE5MSwibmFtZSI6IkVya2tpIFBhcHVuZW4ifQ.W3e0ulvqTpj3lxnph-dBi8fL5Ja3mM9pI7jzd0LwT_k";
export const CONVALENT_KEY = "ckey_09503fb8f80d43a1b46a5b9da34";
export const TEZOS_COLLECT_SECRET = "TEZOS_COLLECT_SECRET";

const MAINNET_RPC_URL: string = "https://mainnet.api.tez.ie";
const GHOSTNET_RPC_URL: string = "https://ghostnet.tezos.marigold.dev";
const KATHMANDUNET_RPC_URL: string = "https://rpc.tzkt.io/kathmandunet";

const TEZOS_COLLECT_RPC_URL =
  TEZOS_COLLECT_NETWORK.type === NetworkType.GHOSTNET
    ? GHOSTNET_RPC_URL
    : TEZOS_COLLECT_NETWORK.type === NetworkType.KATHMANDUNET
    ? KATHMANDUNET_RPC_URL
    : MAINNET_RPC_URL;
export const Tezos = new TezosToolkit(TEZOS_COLLECT_RPC_URL);

// Create a new DAppClient instance
export const TEZOS_COLLECT_WALLET = new BeaconWallet({
  name: "Tezos Collect",
  preferredNetwork: TEZOS_COLLECT_NETWORK.type,
  colorMode: ColorMode.DARK,
});

export const DOMAIN_SUFFIX = {
  ghostnet: ".gho",
  kathmandunet: ".kat",
  mainnet: ".tez",
  mondaynet: "",
  dailynet: "",
  delphinet: "",
  edonet: "",
  florencenet: "",
  granadanet: "",
  hangzhounet: "",
  ithacanet: "",
  jakartanet: "",
  custom: "",
}[TEZOS_COLLECT_NETWORK.type];

const MARKETPLACE_ADDRESSES = {
  ghostnet: "KT1NimfkpwDU6avikgin6RG9KZVwRtKiFvAT",
  kathmandunet: "KT1MoWntSgh7c6mVeja7wjNLavRkni4JyNgp",
  mainnet: "KT1DvqD1ajyvgK6vPMhji2Mb5oBgm8uEXhCG",
  mondaynet: "",
  dailynet: "",
  delphinet: "",
  edonet: "",
  florencenet: "",
  granadanet: "",
  hangzhounet: "",
  ithacanet: "",
  jakartanet: "",
  custom: "",
};

const VAULT_ADDRESSES = {
  ghostnet: "KT1NCMAbF1TNBnKKUQFgjPpjA7pXK27Dc2Gq",
  kathmandunet: "KT1MoWntSgh7c6mVeja7wjNLavRkni4JyNgp",
  mainnet: "KT1QxvJdCBetaivDz4kaRoCekaf9Srjgn8KD",
  mondaynet: "",
  dailynet: "",
  delphinet: "",
  edonet: "",
  florencenet: "",
  granadanet: "",
  hangzhounet: "",
  ithacanet: "",
  jakartanet: "",
  custom: "",
};

const NAME_REGISTRY_ADDRESSES = {
  ghostnet: "KT1REqKBXwULnmU6RpZxnRBUgcBmESnXhCWs",
  kathmandunet: "KT1EAhRiHGUreBfbz7AC3881h5Fr9wrBoPzY",
  mainnet: "KT1GBZmSxmnKJXGMdMLbugPfLyUPmuLSMwKS",
  mondaynet: "",
  dailynet: "",
  delphinet: "",
  edonet: "",
  florencenet: "",
  granadanet: "",
  hangzhounet: "",
  ithacanet: "",
  jakartanet: "",
  custom: "",
};

const TEZOS_DOMAIN_MARKET_ADDRESSES = {
  ghostnet: "KT1HavuWyozSXPzbmyUUpU6L92jagMQD28DT",
  kathmandunet: "KT1EAhRiHGUreBfbz7AC3881h5Fr9wrBoPzY",
  mainnet: "KT1Evxe1udtPDGWrkiRsEN3vMDdB6gNpkMPM",
  mondaynet: "",
  dailynet: "",
  delphinet: "",
  edonet: "",
  florencenet: "",
  granadanet: "",
  hangzhounet: "",
  ithacanet: "",
  jakartanet: "",
  custom: "",
};

export const MARKETPLACE_CONTRACT_ADDRESS =
  MARKETPLACE_ADDRESSES[TEZOS_COLLECT_NETWORK.type];

export const NAME_REGISTRY_CONTRACT_ADDRESS =
  NAME_REGISTRY_ADDRESSES[TEZOS_COLLECT_NETWORK.type];

export const VAULT_ADDRESS = VAULT_ADDRESSES[TEZOS_COLLECT_NETWORK.type];

export const TEZOSDOMAINS_MARKET_CONTRACT_ADDRESS =
  TEZOS_DOMAIN_MARKET_ADDRESSES[TEZOS_COLLECT_NETWORK.type];

export const API_ENDPOINT =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://api1.tezoscollect.io";

export const TOP_SALE_DURATIONS = [
  {
    label: "24h",
    duration: 87600,
  },
  {
    label: "7d",
    duration: 87600 * 7,
  },
  {
    label: "30d",
    duration: 87600 * 30,
  },
  {
    label: "all time",
    duration: 0,
  },
];

export const MARKETPLACE_FEE = "2.5%";

export const MARKETPLACE_AUCTION_DURATIONS = [
  { id: 0, label: "10 mins", seconds: 600 },
  { id: 1, label: "1 day", seconds: 86400 },
  { id: 2, label: "3 days", seconds: 259200 },
  { id: 3, label: "1 week", seconds: 604800 },
  { id: 4, label: "2 weeks", seconds: 1296000 },
  { id: 5, label: "1 month", seconds: 2592000 },
];

export const domainMarketFilters: {
  label: string;
  options: { label: string; value: TYPE_MARKET_ADVANCED_FILTER_VALUE }[];
}[] = [
  {
    label: "Letters",
    options: [
      { label: "---", value: "" },
      { label: "Yes", value: "LETTERS_YES" },
      { label: "No", value: "LETTERS_NO" },
    ],
  },
  {
    label: "Numbers",
    options: [
      { label: "---", value: "" },
      { label: "Yes", value: "NUMBERS_YES" },
      { label: "No", value: "NUMBERS_NO" },
    ],
  },
  {
    label: "Palindromes",
    options: [
      { label: "---", value: "" },
      { label: "Yes", value: "PALINDROMES_YES" },
      { label: "No", value: "PALINDROMES_NO" },
    ],
  },
  {
    label: "Hypen",
    options: [
      { label: "---", value: "" },
      { label: "Yes", value: "HYPEN_YES" },
      { label: "No", value: "HYPEN_NO" },
    ],
  },
];

export const marketSortOptions: {
  label: string;
  value: TYPE_MARKET_SORT_VALUE;
}[] = [
  {
    label: "Sort: Price Low to high",
    value: "PRICE_ASC",
  },
  {
    label: "Sort: Price High to low",
    value: "PRICE_DESC",
  },
  {
    label: "Sort: Name asc",
    value: "NAME_ASC",
  },
  {
    label: "Sort: Name desc",
    value: "NAME_DESC",
  },
  {
    label: "Sort: Last Sale High to Low",
    value: "LASTSOLDAMOUNT_DESC",
  },
  {
    label: "Sort: Last Sale Low to High",
    value: "LASTSOLDAMOUNT_ASC",
  },
  {
    label: "Sort: Registration Date desc",
    value: "TOKENID_DESC",
  },
  {
    label: "Sort: Registration Date asc",
    value: "TOKENID_ASC",
  },
  {
    label: "Sort: Expiration Date desc",
    value: "EXPIRESAT_DESC",
  },
  {
    label: "Sort: Expiration Date asc",
    value: "EXPIRESAT_ASC",
  },
];

export const DEFAULT_PAGE_SIZE = 40;

export const BSC_TEZOS_ADDRESS = "0x16939ef78684453bfdfb47825f8a5f714f12623a";
