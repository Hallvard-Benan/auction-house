import { useEffect, useState } from "react";
import Listings from "../components/Listings";
import SearchBar from "../components/ui/searchBar";
import { search } from "../lib/search";
import { fetchAllListings } from "../lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Tags from "../components/Forms/tags";
import { Button } from "../components/ui/button";
import { useNavigate } from "@tanstack/react-router";

function HomePage() {
  const [listingsToDisplay, setListingsToDisplay] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [sortBy, setSortBy] = useState("created");
  const [sortOrder, setSortOrder] = useState("desc");
  const [limit, setLimit] = useState(100);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLastPage, setIsLastPage] = useState(false);
  const [tag, setTag] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    status,
    error,
    data: listings,
  } = useQuery({
    queryKey: ["listings", pageNumber],
    queryFn: () => fetchAllListings(pageNumber, limit, sortBy, sortOrder, tag),
    keepPreviousData: true,
  });
  useEffect(() => {
    const windowParams = new URLSearchParams(window.location.search);
    const urlSearchQuery = windowParams.get("search");

    if (urlSearchQuery) {
      setSearchQuery(urlSearchQuery);
      const filterListings = async () => {
        const params = new URLSearchParams({
          limit,
          sortBy,
          sortOrder,
        });

        // Check if listings is defined before using it
        if (listings) {
          const searchWord = urlSearchQuery.trim().toLowerCase();
          const filteredListings = await search(params, searchWord);
          setListingsToDisplay(filteredListings);
          setIsLastPage(filteredListings.length < limit);
        }
      };

      filterListings();
    } else if (!urlSearchQuery) {
      // Check if listings is defined before using it
      if (listings) {
        setListingsToDisplay(listings);
      }
    }
  }, [searchQuery, limit, sortBy, sortOrder, listings]); // Add searchQuery to the dependencies

  const handleOnSubmitSearch = async (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    const searchWord = searchValue.trim().toLowerCase();

    if (searchWord.length >= 1) {
      setSearchQuery(searchWord);
      navigate({ to: `/listings?search=${searchWord}` });
    }
  };

  useEffect(() => {
    if (status === "success") {
      setListingsToDisplay(listings);
      setIsLastPage(listings.length < limit);
    }
  }, [status, listings, limit]);

  return (
    <main className="grid gap-6">
      <SearchBar onSubmitSearch={handleOnSubmitSearch} />
      <Tags variant="link"></Tags>
      {searchQuery && <h2>Results for: {searchQuery}</h2>}
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
