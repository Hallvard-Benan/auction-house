import { fetchAllListings } from "./api";

export async function search(params, query) {
  let allFilteredListings = [];
  let pageNumber = 1;

  try {
    while (true) {
      console.log(pageNumber);
      console.log(
        params.get("limit"),
        params.get("sortBy"),
        params.get("sortOrder"),
        params.get("tag")
      );
      const response = await fetchAllListings(
        pageNumber,
        params.get("limit"),
        params.get("sortBy"),
        params.get("sortOrder"),
        params.get("tag")
      );

      console.log(response);
      if (response.length === 0) {
        break;
      }

      // Filter listings based on the query
      const filteredListings = filterSearch(response, query);
      console.log("filteredLIistings>>>", filteredListings);

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
