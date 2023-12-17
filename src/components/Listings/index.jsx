import SkeletonListings from "./loading";

import ListingsUi from "./ui";
import ErrorMessage from "../ui/errorMessage";

function Listings({ status, error, listings, variant }) {
  if (status === "error") {
    return <ErrorMessage error={error} />;
  }

  if (status === "pending") {
    return <SkeletonListings />;
  }

  return (
    <ListingsUi variant={variant ? variant : "default"} listings={listings} />
  );
}

export default Listings;
