import {
  I_DOMAIN_SEARCH_VALUE,
  TYPE_DOMAIN,
  TYPE_MARKET_ADVANCED_FILTER_VALUE,
  TYPE_MARKET_SORT_VALUE,
} from "helper/interfaces";
import axios from "axios";
import { API_ENDPOINT } from "helper/constants";

export const fetchTopSaleDomains = async (): Promise<TYPE_DOMAIN[][]> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/domains/top-sales`);
    response.data.forEach((item: TYPE_DOMAIN) => converStringToDate(item));
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
    response.data.forEach((item: TYPE_DOMAIN) => converStringToDate(item));

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchAuctionedDomains = async (): Promise<TYPE_DOMAIN[]> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/domains/auctions`);
    response.data.forEach((item: TYPE_DOMAIN) => converStringToDate(item));
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

    converStringToDate(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const updateDomain = async (_domain: TYPE_DOMAIN) => {
  try {
    await axios.put(`${API_ENDPOINT}/domains/${_domain.name}`, _domain);
  } catch (error) {
    console.log(error);
  }
};
export const queryDomain = async (
  searchOptions: I_DOMAIN_SEARCH_VALUE,
  advancedFilterValues: TYPE_MARKET_ADVANCED_FILTER_VALUE[],
  sortOption: TYPE_MARKET_SORT_VALUE
): Promise<{ domains: TYPE_DOMAIN[]; count: number }> => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/domains/query`, {
      searchOptions,
      advancedFilterValues,
      sortOption,
    });
    response.data.domains.forEach((item: TYPE_DOMAIN) =>
      converStringToDate(item)
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return { domains: [], count: 0 };
  }
};

export const converStringToDate = (_domains: TYPE_DOMAIN) => {
  _domains.auctionEndsAt = new Date(_domains.auctionEndsAt);
  _domains.auctionStartedAt = new Date(_domains.auctionStartedAt);
  _domains.lastSoldAt = new Date(_domains.lastSoldAt);
  _domains.expiresAt = new Date(_domains.expiresAt);
  _domains.saleStartedAt = new Date(_domains.lastSoldAt);
  _domains.saleEndsAt = new Date(_domains.saleEndsAt);
};
