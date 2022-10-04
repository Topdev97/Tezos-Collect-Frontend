import { TYPE_COLLECTION, TYPE_DOMAIN } from "helper/interfaces";
import axios from "axios";
import { API_ENDPOINT } from "helper/constants";

export const fetchTopSaleDomains = async (): Promise<TYPE_DOMAIN[][]> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/domains/top-sales`);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchFeaturedAuctions = async (): Promise<TYPE_DOMAIN[]> => {
  try {
    const response = await axios.get(
      `${API_ENDPOINT}/domains/featured-auctions`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchAuctionedDomains = async (): Promise<TYPE_DOMAIN[]> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/domains/auctions`);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchDomain = async (
  name: string
): Promise<TYPE_DOMAIN | undefined> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/domains/find/${name}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
