import React from "react";
import Listings from "../components/Listings";
import { search } from "../lib/search";
import FilterForm from "../components/FilterForm";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import SearchBar from "../components/ui/searchBar";
import { useQuery } from "@tanstack/react-query";

function ListingsPage() {
  const [listingsToDisplay, setListingsToDisplay] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [sortBy, setSortBy] = useState("created");
  const [sortOrder, setSortOrder] = useState("desc");
  const [limit, setLimit] = useState(100);
  const [searchQuery, setSearchQuery] = useState("");
  const [tag, setTag] = useState("");
  const [active, setActive] = useState(true);
  const navigate = useNavigate();

  const {
    status,
    error,
    data: listings,
  } = useQuery({
    queryKey: ["all listings", tag, active, sortBy, sortOrder, searchQuery],
    queryFn: () => {
      const windowParams = new URLSearchParams(window.location.search);

      if (windowParams.get("search")) {
        setSearchQuery(windowParams.get("search"));
      }

      if (windowParams.get("sortBy")) {
        setSortBy(windowParams.get("sortBy"));
      }

      if (windowParams.get("sortOrder")) {
        setSortOrder(windowParams.get("sortOrder"));
      }

      if (windowParams.get("tag")) {
        setTag(windowParams.get("tag"));
      }

      if (windowParams.get("active")) {
        setActive(windowParams.get("active"));
      }
      return search(sortBy, sortOrder, tag, active, searchQuery);
    },
  });

  const handleOnSubmitFilters = (e) => {
    e.preventDefault();
    const sortByValue = e.target.sortBy.value;
    const sortOrderValue = e.target.sortOrder.value;
    const tagValue = e.target.tag.value;
    const activePostsValue = e.target.activePostsOnly[1].checked;
    console.log(activePostsValue);
    let tagParam = "";

    if (tagValue.length > 0) {
      tagParam = `&_tag?${tagValue}`;
    }

    setSortBy(sortByValue);
    setSortOrder(sortOrderValue);
    setTag(tagValue);
    setActive(activePostsValue);
    navigate({
      to: `/listings?search=${searchQuery}&sortBy=${sortByValue}&sortOrder=${sortOrderValue}&active=${activePostsValue}${tagParam}`,
    });
    console.log("value of active posts:::", activePostsValue);
  };

  const handleOnSubmitSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    const searchWord = searchValue.trim().toLowerCase();

    if (searchWord.length > 0) {
      navigate({
        to: `/listings?search=${searchWord}&sortBy=${sortBy}&sortOrder=${sortOrder}&active=${active}&tag=${tag}`,
      });
    }
    setSearchQuery(searchWord);
  };

  return (
    <>
      <SearchBar onSubmitSearch={handleOnSubmitSearch} />
      <div className="flex justify-between">
        {searchQuery && <h2>Results for: {searchQuery}</h2>}
        <FilterForm
          onSubmitFilters={handleOnSubmitFilters}
          defaultActive={active}
          defaultSort={sortBy}
          defaultOrder={sortOrder}
          defaultTag={tag}
        ></FilterForm>
      </div>
      <Listings listings={listings} status={status} error={error} />
    </>
  );
}

export default ListingsPage;
