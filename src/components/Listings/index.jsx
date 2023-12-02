import SkeletonListings from "./loading";

import ListingsUi from "./ui";

function Listings({ status, error, listings }) {
  if (status === "error") {
    return <div>{error.message} </div>;
  }

  if (status === "pending") {
    return <SkeletonListings />;
  }

  return <ListingsUi listings={listings} />;
}

export default Listings;
