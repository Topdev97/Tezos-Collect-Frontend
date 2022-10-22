import axios from "axios";
import { BSC_TEZOS_ADDRESS } from "helper/constants";

export const getTezosPrice = async (): Promise<number> => {
  try {
    const response = await axios.get(
      `https://api.pancakeswap.info/api/v2/tokens/${BSC_TEZOS_ADDRESS}`
    );
    return parseFloat(response.data.data.price);
  } catch (error) {
    console.log(error);
    return 0;
  }
};
