import {
  I_DOMAIN_ACTIVITY,
  I_DOMAIN_ACTIVITY_SEARCH_OPTION,
  TYPE_ACTIVITY_SORT_VALUE,
  TYPE_DOMAIN,
} from "helper/interfaces";
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
      `${API_ENDPOINT}/domain-activity/domain/${_name}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getDomainActivityByAddress = async (address: string) => {
  try {
    const response = await axios.get(
      `${API_ENDPOINT}/domain-activity/address/${address}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const queryDomainActivity = async (
  searchOptions: I_DOMAIN_ACTIVITY_SEARCH_OPTION,
  sortOption: TYPE_ACTIVITY_SORT_VALUE
): Promise<{ domainActivities: I_DOMAIN_ACTIVITY[]; count: number }> => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/domain-activity/query`, {
      searchOptions,
      sortOption,
    });
    response.data.domainActivities.forEach((item: I_DOMAIN_ACTIVITY) =>
      converStringToDate(item)
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return { domainActivities: [], count: 0 };
  }
};

export const converStringToDate = (_activity: I_DOMAIN_ACTIVITY) => {
  _activity.timestamp = new Date(_activity.timestamp);
};
