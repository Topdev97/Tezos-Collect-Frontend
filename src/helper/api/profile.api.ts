import { I_PROFILE } from "helper/interfaces";
import axios from "axios";
import { API_ENDPOINT } from "helper/constants";

export const fetchProfile = async (address: string): Promise<I_PROFILE> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/profile/${address}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      address,
      holding: 0,
      totalVolume: 0,
      avatarLink: "",
      bookmarkedNames: [],
    };
  }
};

export const updateBookmarkedNamesByAddress = async (
  address: string,
  bookmarkedNames: string[]
) => {
  try {
    await axios.put(`${API_ENDPOINT}/profile/favorites/${address}`, {
      bookmarkedNames,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchBookmarkedNamesByAddress = async (
  address: string
): Promise<string[]> => {
  try {
    const result = await axios.get(
      `${API_ENDPOINT}/profile/favorites/${address}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
