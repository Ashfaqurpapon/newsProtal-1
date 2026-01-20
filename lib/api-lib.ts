import { ApiRouteConstants } from "./api-constant";

const API_KEY = "13356a51ae1b4fecb2256150900704bc";

export const api = {
  async getNewsEveryCountry(
    country: string = "ae",
    pageSize: number = 100
  ) {
    try {
      const url = `${ApiRouteConstants.BASE_URL}?country=${country}&pageSize=${pageSize}&apiKey=${API_KEY}`;

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Failed to fetch news: ${res.status}`);
      }

      const data = await res.json();

      return data.articles; // return only news list
    } catch (error) {
      console.error("getNewsEveryCountry error:", error);
      throw error;
    }
  },
};
