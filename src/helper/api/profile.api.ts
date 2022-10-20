import {
  I_DOMAIN_SEARCH_VALUE,
  I_PROFILE,
  TYPE_DOMAIN,
  TYPE_MARKET_ADVANCED_FILTER_VALUE,
  TYPE_MARKET_SORT_VALUE,
} from "helper/interfaces";
import axios from "axios";
import { API_ENDPOINT } from "helper/constants";

export const fetchProfile = async (address: string): Promise<I_PROFILE> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/profile/${address}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return { address, holding: 0, totalVolume: 0, avatarLink: "" };
  }
};
