import { fetchAllListings } from "./api";

export async function search(sortBy, sortOrder, tag, active, query) {
  let allFilteredListings = [];
  let pageNumber = 1;
  const searchLimit = 100;
  const searchTag = tag;

  try {
    while (true) {
      const response = await fetchAllListings(
        pageNumber,
        searchLimit,
        sortBy,
        sortOrder,
        searchTag,
        active
      );

      if (!response || response.length === 0) {
        break;
      }

      // Filter listings based on the query
      const filteredListings =
        query?.length > 0 ? filterSearch(response, query) : response;

      // Concatenate the filtered listings to the result
      allFilteredListings = [...allFilteredListings, ...filteredListings];

      // Update page number for the next iteration
      pageNumber++;
    }
  } catch (error) {
    console.error("Error searching through pages:", error);

    // Log the error array directly
    console.log("Error array:", error);
  }

  return allFilteredListings;
}

function filterSearch(listings, query) {
  query = query.toUpperCase();

  return listings.filter(({ title, description, tags }) => {
    return (
      toUpperCase(title).includes(query) ||
      toUpperCase(description).includes(query) ||
      toUpperCase(tags.join()).includes(query)
    );
  });
}

function toUpperCase(str) {
  return str ? str.toUpperCase() : "";
}
