import { fetchAllListings } from "./api";

export async function search(tag, active, sortBy, sortOrder) {
  let allListings = [];
  let pageNumber = 1;
  const searchLimit = 100;
  const searchTag = tag;
  const searchActive = active;
  const searchSortBy = sortBy;
  const searchSortOrder = sortOrder;

  try {
    while (true) {
      const response = await fetchAllListings(
        pageNumber,
        searchLimit,
        searchSortBy,
        searchSortOrder,
        searchTag,
        searchActive
      );

      if (!response || response.length === 0) {
        break;
      }

      allListings = [...allListings, ...response];

      pageNumber++;
    }
  } catch (error) {
    return error;
  }

  return allListings;
}

export const filterSearch = function (listings, query) {
  query = query.toLowerCase();

  return listings.filter(({ title }) => {
    return title.toLowerCase().includes(query);
  });
};
