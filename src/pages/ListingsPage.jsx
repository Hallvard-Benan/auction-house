import React from "react";
import Listings from "../components/Listings";
import { search } from "../lib/search";
import FilterForm from "../components/FilterForm";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import SearchBar from "../components/ui/searchBar";
function ListingsPage() {
  const [status, setStatus] = useState("pending");

  const [listingsToDisplay, setListingsToDisplay] = useState();
  const [error, setError] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [sortBy, setSortBy] = useState("created");
  const [sortOrder, setSortOrder] = useState("desc");
  const [limit, setLimit] = useState(100);
  const [searchQuery, setSearchQuery] = useState("");
  const [tag, setTag] = useState("");
  const navigate = useNavigate();
  const params = new URLSearchParams({
    limit,
    sortBy,
    sortOrder,
  });

  const handleOnSubmitSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    const searchWord = searchValue.trim().toLowerCase();

    if (searchWord.length >= 1) {
      navigate({ to: `/listings?search=${searchWord}` });
    }
    setSearchQuery(searchWord);
  };

  useEffect(() => {
    setStatus("pending");
    const windowParams = new URLSearchParams(window.location.search);
    const urlSearchQuery = windowParams.get("search");
    console.log("url search query>>>", urlSearchQuery);

    if (urlSearchQuery) {
      setSearchQuery(urlSearchQuery);
      const filterListings = async () => {
        const searchWord = urlSearchQuery.trim().toLowerCase();
        const filteredListings = await search(params, searchWord);
        setListingsToDisplay(filteredListings);
        setStatus("success");
      };

      filterListings();
    } else {
      setError("an error has occured");
    }
  }, [searchQuery]);
  return (
    <>
      <SearchBar onSubmitSearch={handleOnSubmitSearch} />
      {searchQuery && <h2>Results for: {searchQuery}</h2>}
      <FilterForm></FilterForm>
      <Listings listings={listingsToDisplay} status={status} error={error} />
    </>
  );
}

export default ListingsPage;
