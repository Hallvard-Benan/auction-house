import Listings from "../components/Listings";
import { filterSearch, search } from "../lib/search";
import FilterForm from "../components/FilterForm";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import SearchBar from "../components/ui/searchBar";
import { useQuery } from "@tanstack/react-query";
import Tag from "../components/ui/tag";
import ErrorMessage from "../components/ui/errorMessage";

function ListingsPage() {
  const [sortBy, setSortBy] = useState("created");
  const [sortOrder, setSortOrder] = useState("desc");
  const [initialListings, setInitialListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tag, setTag] = useState("");
  const [listingsToDisplay, setListingsToDisplay] = useState([]);
  const [active, setActive] = useState(true);
  const navigate = useNavigate();

  const {
    status,
    error,
    data: listings,
  } = useQuery({
    queryKey: ["all listings", tag, active, sortBy, sortOrder],
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

      if (windowParams.get("_tag")) {
        setTag(windowParams.get("_tag"));
      } else setTag("");

      if (windowParams.get("active") === "false") {
        setActive(false);
      } else setActive(true);
      return search(tag, active, sortBy, sortOrder);
    },
  });

  useEffect(() => {
    if (status === "success" && listings) {
      setInitialListings(listings);
      if (listings && searchQuery) {
        const filteredListings = filterSearch(initialListings, searchQuery);
        setListingsToDisplay(filteredListings);
      } else {
        setListingsToDisplay(initialListings);
      }
    }
  }, [listings, initialListings, searchQuery, status]);

  const handleOnRemoveSearch = async () => {
    setSearchQuery("");
    navigate({ to: "/listings" });
    setListingsToDisplay(initialListings);
  };

  const handleOnRemoveTag = () => {
    navigate({
      to: `/listings?search=${searchQuery}&sortBy=${sortBy}&sortOrder=${sortOrder}&active=${active}`,
    });
    setTag("");
  };

  const handleOnSubmitFilters = (e) => {
    e.preventDefault();
    const sortByValue = e.target.sortBy.value;
    const sortOrderValue = e.target.sortOrder.value;
    const tagValue = e.target.tag.value;
    const activePostsValue = e.target.activePostsOnly[1].checked;
    let tagParam = "";

    if (tagValue.length > 0) {
      tagParam = `&_tag=${tagValue}`;
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
    e.target.reset();
  };

  return (
    <>
      <SearchBar onSubmitSearch={handleOnSubmitSearch} />
      <div className="flex flex-col-reverse gap-2 md:flex-row justify-between">
        <div className="flex items-center gap-1 flex-wrap">
          <h2>Results for:</h2>
          {searchQuery && (
            <div className="flex gap-1 items-center">
              <h2>Search term: </h2>
              <Tag
                text={searchQuery}
                editable={true}
                handleOnRemove={handleOnRemoveSearch}
              />
            </div>
          )}

          {tag && (
            <div className="flex gap-1 items-center">
              <h2>Tag: </h2>
              <Tag
                text={tag}
                editable={true}
                handleOnRemove={handleOnRemoveTag}
              />
            </div>
          )}
          {!searchQuery && !tag && <h2>All posts</h2>}
        </div>
        <div className="flex flex-col items-center md:items-end">
          <div className=" p-2 flex justify-center">
            <FilterForm
              onSubmitFilters={handleOnSubmitFilters}
              defaultActive={active}
              defaultSort={sortBy}
              defaultOrder={sortOrder}
              defaultTag={tag}
            ></FilterForm>
          </div>
          <div className="flex gap-2">
            <p className="text-muted-foreground">
              Sorting by: {sortBy === "created" ? "Date" : "Title"}
            </p>
            <p className="text-muted-foreground">
              {sortOrder === "asc" && sortBy === "created"
                ? "Oldest"
                : sortOrder === "asc" && sortBy === "title"
                ? "A-Z"
                : sortOrder === "desc" && sortBy === "title"
                ? "Z-A"
                : "Newest"}
            </p>
            <p className="text-muted-foreground">
              {active ? "Active listings only" : "Include inactive listings"}
            </p>
          </div>
        </div>
      </div>
      {status === "error" && <ErrorMessage error={error}></ErrorMessage>}
      {status === "success" && !listings && listingsToDisplay.length < 1 && (
        <h2>Could not find any matching listings</h2>
      )}
      <Listings listings={listingsToDisplay} status={status} error={error} />
    </>
  );
}

export default ListingsPage;
