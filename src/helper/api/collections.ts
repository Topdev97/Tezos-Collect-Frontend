import { TYPE_COLLECTION } from "helper/interfaces";
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
