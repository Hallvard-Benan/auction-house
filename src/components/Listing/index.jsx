import ListingUi from "./ui";
import { fetchOneListing } from "/src/lib/api";
import { useQuery } from "@tanstack/react-query";

function Listing() {
  // Get the id from the search params
  const searchParams = new URLSearchParams(window.location.search);
  const listingId = searchParams.get("id");

  const { status, data: listing } = useQuery({
    queryKey: ["listing", listingId],
    queryFn: () => fetchOneListing(listingId),
  });

  if (status === "pending") return <div>Loading...</div>;

  if (status === "error") return <div>Error:</div>;

  // Render the listing details
  if (status === "success")
    return (
      <ListingUi
        title={listing.title}
        description={listing.description}
        media={listing.media}
        tags={listing.tags}
        created={listing.created}
        updated={listing.updated}
        endsAt={listing.endsAt}
        bids={listing.bids}
        seller={listing.seller}
      />
    );
}

export default Listing;
