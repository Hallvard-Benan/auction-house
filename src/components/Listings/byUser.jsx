import SkeletonListings from "./loading";
import { fetchAllListingsByUser } from "/src/lib/api";
import Listings from ".";
import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "../ui/errorMessage";

function ListingsByUser({ user }) {
  const {
    status,
    error,
    data: listings,
  } = useQuery({
    queryKey: ["listings by user", user],
    queryFn: () => fetchAllListingsByUser(user),
    enabled: !!user,
  });

  if (status === "error") {
    return <ErrorMessage error={error} />;
  }

  if (status === "pending") {
    return <SkeletonListings />;
  }

  return <Listings listings={listings} error={error} status={status} />;
}

export default ListingsByUser;
