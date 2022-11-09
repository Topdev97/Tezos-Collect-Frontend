import axios from "axios";
import { BSC_TEZOS_ADDRESS, CONVALENT_KEY } from "helper/constants";

// export const getTezosPrice = async (): Promise<number> => {
//   try {
//     const response = await axios.get(
//       `https://api.pancakeswap.info/api/v2/tokens/${BSC_TEZOS_ADDRESS}`
//     );
//     return parseFloat(response.data.data.price);
//   } catch (error) {
//     console.log(error);
//     return 0;
//   }
// };
export const getTezosPrice = async (): Promise<number> => {
  try {
    const response = await axios.get(
      `https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/56/USD/${BSC_TEZOS_ADDRESS}/?quote-currency=USD&format=JSON&page-size=1&key=${CONVALENT_KEY}`
    );
    return parseFloat(response.data.data[0].prices[0].price);
  } catch (error) {
    console.log(error);
    return 0;
  }
};
