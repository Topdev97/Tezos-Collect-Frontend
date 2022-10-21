import {
  I_COLLECTION_HOLDER,
  TYPE_COLLECTION,
  TYPE_DOMAIN,
} from "helper/interfaces";
import axios from "axios";
import { API_ENDPOINT } from "helper/constants";

export const fetchCollections = async (): Promise<TYPE_COLLECTION[]> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/collections`);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchCollectionHoldersInfo = async (
  slug: string
): Promise<I_COLLECTION_HOLDER[]> => {
  try {
    const response = await axios.get(
      `${API_ENDPOINT}/collections/holder/${slug}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
