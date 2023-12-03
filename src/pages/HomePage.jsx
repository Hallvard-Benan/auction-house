import { useEffect, useState } from "react";
import Listings from "../components/Listings";
import SearchBar from "../components/ui/searchBar";
import { fetchAllListings } from "../lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Button } from "../components/ui/button";

function HomePage() {
  const [listingsToDisplay, setListingsToDisplay] = useState();
  const [pageNumber, setPageNumber] = useState(47);
  const [sortBy, setSortBy] = useState("created");
  const [sortOrder, setSortOrder] = useState("desc");
  const [limit, setLimit] = useState(20);
  const [isLastPage, setIsLastPage] = useState(false);
  const [tag, setTag] = useState("");
  const queryClient = useQueryClient;

  const {
    status,
    error,
    data: listings,
  } = useQuery({
    queryKey: ["listings", pageNumber],
    queryFn: () => fetchAllListings(pageNumber, limit, sortBy, sortOrder, tag),
    keepPreviousData: true,
  });

  const handleOnSubmitSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    const searchWord = searchValue.trim().toLowerCase();

    const filteredListings = listings.filter(
      ({ title, description, seller }) =>
        title.toLowerCase().includes(searchWord) ||
        description?.toLowerCase().includes(searchWord) ||
        seller.name.toLowerCase().includes(searchWord)
    );
    setListingsToDisplay(filteredListings);
    console.log(filteredListings);
  };

  useEffect(() => {
    if (status === "success") {
      setListingsToDisplay(listings);

      setIsLastPage(listings.length < limit);
    }
  }, [status, listings]);

  return (
    <main className="grid gap-6">
      <SearchBar onSubmitSearch={handleOnSubmitSearch} />
      <Listings status={status} error={error} listings={listingsToDisplay} />
      <div className="flex gap-2">
        {pageNumber > 1 && (
          <Button onClick={() => setPageNumber((page) => page - 1)}>
            go back
          </Button>
        )}

        <div>{pageNumber}</div>
        {!isLastPage && (
          <Button onClick={() => setPageNumber((page) => page + 1)}>
            Next page
          </Button>
        )}
      </div>
    </main>
  );
}

export default HomePage;
