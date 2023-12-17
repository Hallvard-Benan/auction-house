import { useEffect, useRef, useState } from "react";
import Listings from "../components/Listings";
import SearchBar from "../components/ui/searchBar";
import { fetchAllListings } from "../lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Tags from "../components/CreateListing/tags";
import { Button } from "../components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

function HomePage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(20);
  const [isLastPage, setIsLastPage] = useState(false);
  const queryClient = useQueryClient();
  const limitRef = useRef(20);

  const navigate = useNavigate();

  const {
    status,
    error,
    data: listings,
  } = useQuery({
    queryKey: ["listings", pageNumber],
    queryFn: () =>
      fetchAllListings(pageNumber, limitRef.current, "created", "desc"),
    keepPreviousData: true,
  });
  const handleOnSubmitSearch = async (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    const searchWord = searchValue.trim().toLowerCase();

    if (searchWord.length >= 1) {
      navigate({ to: `/listings?search=${searchWord}` });
    }
  };

  useEffect(() => {
    if (listings) {
      setIsLastPage(listings.length < limit);
    }
  }, [listings, limit]);

  return (
    <main className="grid gap-6">
      <SearchBar onSubmitSearch={handleOnSubmitSearch} />
      <Tags variant="link"></Tags>
      <div className="flex gap-4 mx-auto items-center">
        <Button
          disabled={pageNumber === 1}
          onClick={() => setPageNumber((page) => page - 1)}
        >
          Last page
        </Button>

        <div className="text-xl">Page {pageNumber}</div>
        {!isLastPage && (
          <Button onClick={() => setPageNumber((page) => page + 1)}>
            Next page
          </Button>
        )}
      </div>
      <Select
        onValueChange={(value) => {
          limitRef.current = value;
          setLimit(value);
          queryClient.invalidateQueries({ queryKey: ["listings", pageNumber] });
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={`Per page: ${limit}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={20}>Per page: 20</SelectItem>
          <SelectItem value={50}>Per page: 50</SelectItem>
          <SelectItem value={100}>Per page: 100</SelectItem>
        </SelectContent>
      </Select>
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
