import { I_DOMAIN_ACTIVITY, TYPE_DOMAIN } from "helper/interfaces";
import axios from "axios";
import { API_ENDPOINT, TEZOS_COLLECT_SECRET } from "helper/constants";
import { encryptAnyWithAES } from "helper/text-crypt";

export const createSigature = (_domain_activity: I_DOMAIN_ACTIVITY) => {
  delete _domain_activity.signature;
  _domain_activity.signature = encryptAnyWithAES(
    JSON.stringify(_domain_activity),
    TEZOS_COLLECT_SECRET
  );
};

export const createDomainActivity = async (
  _domain_activity: I_DOMAIN_ACTIVITY
) => {
  try {
    createSigature(_domain_activity);
    console.log(_domain_activity);
    await axios.post(`${API_ENDPOINT}/domain-activity`, _domain_activity);
  } catch (error) {
    console.log(error);
  }
};
export const fetchDomainActivityByName = async (_name: string) => {
  try {
    const response = await axios.get(
      `${API_ENDPOINT}/domain-activity/${_name}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
