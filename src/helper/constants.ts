import {
  ColorMode,
  DAppClient,
  Network,
  NetworkType,
} from "@airgap/beacon-sdk";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";

// Set the network (Mainnet is default)
export const TEZOS_COLLECT_NETWORK: Network = {
  type: NetworkType.KATHMANDUNET,
};

const MAINNET_RPC_URL: string = "https://rpc.tzkt.io/mainnet";
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

export const TEZOS_PRICE: number = 1.48;

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
  ghostnet: "KT1Q4nCfd87KnBWmbgBiBchyysEhavf7qt5i",
  kathmandunet: "KT1Fkta5G3RbpxrzA18GiR5PU6325WQonzfC",
  mainnet: "KT1Q4nCfd87KnBWmbgBiBchyysEhavf7qt5i",
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

export const MARKETPLACE_CONTRACT_ADDRESS =
  MARKETPLACE_ADDRESSES[TEZOS_COLLECT_NETWORK.type];

export const NAME_REGISTRY_CONTRACT_ADDRESS =
  NAME_REGISTRY_ADDRESSES[TEZOS_COLLECT_NETWORK.type];

export const API_ENDPOINT =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://tezos-collect-staging.herokuapp.com";

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
];
