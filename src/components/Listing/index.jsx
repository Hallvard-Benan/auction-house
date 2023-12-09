import ListingUi from "./ui";
import { fetchOneListing } from "/src/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "/src/Context/AuthContext";
import { useEffect, useState } from "react";
import { makeBid } from "/src/lib/api";

function Listing() {
  const [isMyPost, setIsMyPost] = useState(false);
  const [error, setError] = useState(null);
  const { authUser, isLoggedIn } = useAuth();
  const queryClient = useQueryClient();
  const [availableCredits, setAvailableCredits] = useState(0);

  useEffect(() => {
    if (authUser) setAvailableCredits(authUser.credits);
  }, [authUser]);

  const searchParams = new URLSearchParams(window.location.search);
  const listingId = searchParams.get("id");

  const submitBidMutation = useMutation({
    mutationFn: makeBid,
    onError: (err) => console.log(err),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["listing", listingId],
      });
    },
  });

  const handleOnSubmitBid = (e) => {
    e.preventDefault();
    const bidAmount = parseInt(e.target.bid.value);
    const availableFunds = authUser.credits;
    if (bidAmount <= availableFunds) {
      submitBidMutation.mutate(bidAmount);
      setAvailableCredits((prev) => prev - bidAmount);
      e.target.reset();
    } else setError("not enough funds");
  };

  const { status, data: listing } = useQuery({
    queryKey: ["listing", listingId],
    queryFn: () => fetchOneListing(listingId),
  });

  useEffect(() => {
    if (status === "success" && listing && listing.seller && authUser) {
      setIsMyPost(listing.seller.email === authUser.email);
    }
  }, [status, listing, authUser]);

  if (status === "pending") return <div>Loading...</div>;

  if (status === "error") return <div>Error:</div>;
  if (status === "success")
    return (
      <ListingUi
        loggedIn={isLoggedIn}
        myPost={isMyPost}
        id={listing.id}
        title={listing.title}
        description={listing.description}
        media={listing.media}
        tags={listing.tags}
        created={listing.created}
        updated={listing.updated}
        error={error}
        endsAt={listing.endsAt}
        bids={listing.bids}
        seller={listing.seller}
        onSubmitBid={handleOnSubmitBid}
        _count={listing._count}
        availableCredits={availableCredits}
      />
    );
}

export default Listing;
