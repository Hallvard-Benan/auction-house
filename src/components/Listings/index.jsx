import SkeletonListings from "./loading";

import ListingsUi from "./ui";

function Listings({ status, error, listings, variant }) {
  if (status === "error") {
    return <div>{error.message} </div>;
  }

  if (status === "pending") {
    return <SkeletonListings />;
  }

  return (
    <ListingsUi variant={variant ? variant : "default"} listings={listings} />
  );
}

export default Listings;
