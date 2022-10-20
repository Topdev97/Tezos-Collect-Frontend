// Import the NFTStorage class and File constructor from the 'nft.storage' package
// @ts-ignore
import { NFTStorage } from "nft.storage/dist/bundle.esm.min.js";
import { NFT_STORAGE_KEY } from "./constants";

export const getSignedRandomValue = (range: number = 50) => {
  return Math.random() * range - range / 2;
};
export const getUnsignedRandomValue = (range: number = 50) => {
  return Math.random() * range;
};

export const pinToIpfs = async (file: File): Promise<string> => {
  // create a new NFTStorage client using our API key
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

  // call client.store, passing in the image & metadata
  return await nftstorage.storeBlob(file);
};
