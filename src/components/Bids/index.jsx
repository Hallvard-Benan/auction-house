import { getBidsByProfile } from "/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import Listings from "../Listings";
import { useEffect, useState } from "react";

function Bids({ user }) {
  const [bidsToDisplay, setBidsToDisplay] = useState([]);

  const {
    status,
    error,
    data: bids,
  } = useQuery({
    queryKey: ["bids", user],
    queryFn: () => getBidsByProfile(user),
  });

  useEffect(() => {
    // To avoid rendering the same listing multiple times, show only the one with highest bid amount
    if (bids) {
      const uniqueBids = bids
        ? Object.values(
            bids.reduce((acc, bid) => {
              const listingId = bid.listing.id;
              if (!acc[listingId] || bid.amount > acc[listingId].amount) {
                acc[listingId] = bid;
              }

              return acc;
            }, {})
          )
        : [];

      setBidsToDisplay(uniqueBids.map((listing) => listing.listing));
    }
  }, [bids]);

  return (
    <Listings
      listings={bidsToDisplay}
      variant="bid"
      status={status}
      error={error}
    />
  );
}

export default Bids;
