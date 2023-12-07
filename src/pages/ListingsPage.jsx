import React from "react";
import Listings from "../components/Listings";
import { search } from "../lib/search";
import FilterForm from "../components/FilterForm";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import SearchBar from "../components/ui/searchBar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../components/ui/button";

function ListingsPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [sortBy, setSortBy] = useState("created");
  const [sortOrder, setSortOrder] = useState("desc");
  const [limit, setLimit] = useState(100);
  const [searchQuery, setSearchQuery] = useState("");
  const [tag, setTag] = useState("");
  const [listingsToDisplay, setListingsToDisplay] = useState([]);
  const [active, setActive] = useState(true);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const fetchMutation = useMutation({
    mutationFn: search,
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (data) => {
      setListingsToDisplay(data), setSearchQuery("");
    },
  });

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

  const handleOnRemoveSearch = async () => {
    fetchMutation.mutate(sortBy, sortOrder, null, active, "");
    navigate({ to: "/listings" });
  };

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

  useEffect(() => {
    status === "success" && setListingsToDisplay(listings);
  }, [status, listings]);

  return (
    <>
      <SearchBar onSubmitSearch={handleOnSubmitSearch} />
      <div className="flex justify-between">
        <div>
          <h2>Results for: {searchQuery ? searchQuery : "all posts"}</h2>{" "}
          <Button onClick={handleOnRemoveSearch}>x</Button>
          <Button
            onClick={() => {
              console.log(searchQuery);
            }}
          >
            test
          </Button>
        </div>

        <FilterForm
          onSubmitFilters={handleOnSubmitFilters}
          defaultActive={active}
          defaultSort={sortBy}
          defaultOrder={sortOrder}
          defaultTag={tag}
        ></FilterForm>
      </div>
      <Listings listings={listingsToDisplay} status={status} error={error} />
    </>
  );
}

export default ListingsPage;
