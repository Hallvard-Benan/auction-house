import SkeletonListings from "./loading";
import { fetchAllListingsByUser } from "/src/lib/api";
import Listings from ".";
import { useQuery } from "@tanstack/react-query";

function ListingsByUser({ user }) {
  const {
    status,
    error,
    data: listings,
  } = useQuery({
    queryKey: ["listings by user"],
    queryFn: () => fetchAllListingsByUser(user),
  });

  if (status === "error") {
    return <div>{error.message} </div>;
  }

  if (status === "pending") {
    return <SkeletonListings />;
  }

  return <Listings listings={listings} error={error} status={status} />;
}

export default ListingsByUser;
