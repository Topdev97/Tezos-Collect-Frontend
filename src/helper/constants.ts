import {
  ColorMode,
  DAppClient,
  Network,
  NetworkType,
} from "@airgap/beacon-sdk";

// Set the network (Mainnet is default)
export const TEZOS_COLLECT_NETWORK: Network = { type: NetworkType.GHOSTNET };
// Create a new DAppClient instance
export const TEZOS_COLLECT_CLIENT = new DAppClient({
  name: "Beacon Docs",
  preferredNetwork: TEZOS_COLLECT_NETWORK.type,
  colorMode: ColorMode.DARK,
});

export const RPC_URL: string = "https://ghostnet.tezos.marigold.dev";
export const TEZOS_PRICE: number = 1.48;

const GHOSTNET_ADDRESS = "KT1Q4nCfd87KnBWmbgBiBchyysEhavf7qt5i";
const MAINNET_ADDRESS = "KT1Q4nCfd87KnBWmbgBiBchyysEhavf7qt5i";

export const MARKETPLACE_CONTRACT_ADDRESS =
  TEZOS_COLLECT_NETWORK.type === NetworkType.GHOSTNET
    ? GHOSTNET_ADDRESS
    : MAINNET_ADDRESS;

export const API_ENDPOINT =
  process.env.NODE_ENV === "development" ? "http://localhost:4000" : "";

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
