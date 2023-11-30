import SkeletonListings from "./loading";
import { fetchAllListingsByUser } from "/src/lib/api";
import ListingsUi from "./ui";
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

  return <ListingsUi listings={listings} />;
}

export default ListingsByUser;
