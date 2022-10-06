import * as TaquitoUtils from "@taquito/utils";
import { MARKETPLACE_CONTRACT_ADDRESS } from "helper/constants";

export const isIncludingOperator = (
  bytes: string,
  operator: string = MARKETPLACE_CONTRACT_ADDRESS
) => {
  return bytes?.includes(TaquitoUtils.b58decode(operator)) || false;
};

export default TaquitoUtils;
