import ListingUi from "./ui";
import { fetchOneListing } from "/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "/src/Context/AuthContext";
import { useEffect, useState } from "react";

function Listing() {
  const [isMyPost, setIsMyPost] = useState(false);

  const searchParams = new URLSearchParams(window.location.search);
  const listingId = searchParams.get("id");

  const { status, data: listing } = useQuery({
    queryKey: ["listing", listingId],
    queryFn: () => fetchOneListing(listingId),
  });

  const { authUser, isLoggedIn } = useAuth();

  useEffect(() => {
    if (status === "success" && listing && listing.seller && authUser) {
      console.log(authUser);
      setIsMyPost(listing.seller.email === authUser.authEmail);
    }
  }, [status, listing, authUser]);

  if (status === "pending") return <div>Loading...</div>;

  if (status === "error") return <div>Error:</div>;
  if (status === "success")
    return (
      <ListingUi
        loggedIn={isLoggedIn}
        myPost={isMyPost}
        title={listing.title}
        description={listing.description}
        media={listing.media}
        tags={listing.tags}
        created={listing.created}
        updated={listing.updated}
        endsAt={listing.endsAt}
        bids={listing.bids}
        seller={listing.seller}
        _count={listing._count}
      />
    );
}

export default Listing;
