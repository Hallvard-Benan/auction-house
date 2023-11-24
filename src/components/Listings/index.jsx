import SkeletonListings from "./loading";
import { fetchAllListings } from "../../lib/api";
import ListingsUi from "./ui";
import { useQuery } from "@tanstack/react-query";

function Listings() {
  const {
    status,
    error,
    data: listings,
  } = useQuery({
    queryKey: ["listings"],
    queryFn: fetchAllListings,
  });

  if (status === "error") {
    return <div>{error.message} </div>;
  }

  if (status === "pending") {
    return <SkeletonListings />;
  }

  return <ListingsUi listings={listings} />;
}

export default Listings;
