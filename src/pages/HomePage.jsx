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
  const [pageNumber, setPageNumber] = useState(1);
  const [sortBy, setSortBy] = useState("created");
  const [sortOrder, setSortOrder] = useState("desc");
  const [limit, setLimit] = useState(20);
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
  const handleOnSubmitSearch = async (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    const searchWord = searchValue.trim().toLowerCase();

    if (searchWord.length >= 1) {
      setSearchQuery(searchWord);
      navigate({ to: `/listings?search=${searchWord}` });
    }
  };

  return (
    <main className="grid gap-6">
      <SearchBar onSubmitSearch={handleOnSubmitSearch} />
      <Tags variant="link"></Tags>
      <div className="flex gap-4 mx-auto items-center">
        {pageNumber > 1 && (
          <Button onClick={() => setPageNumber((page) => page - 1)}>
            Last page
          </Button>
        )}

        <div className="text-xl">Page {pageNumber}</div>
        {!isLastPage && (
          <Button onClick={() => setPageNumber((page) => page + 1)}>
            Next page
          </Button>
        )}
      </div>
      <Listings status={status} error={error} listings={listings} />
      <div className="flex gap-4 mx-auto items-center">
        {pageNumber > 1 && (
          <Button onClick={() => setPageNumber((page) => page - 1)}>
            Last page
          </Button>
        )}

        <div className="text-xl">Page {pageNumber}</div>
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
