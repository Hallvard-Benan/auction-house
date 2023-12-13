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
    console.error("Error searching through pages:", error);

    console.log("Error array:", error);
  }

  return allListings;
}

export const filterSearch = function (listings, query) {
  query = query.toUpperCase();

  return listings.filter(({ title, description }) => {
    return (
      toUpperCase(title).includes(query) ||
      toUpperCase(description).includes(query)
    );
  });
};

function toUpperCase(str) {
  return str ? str.toUpperCase() : "";
}
