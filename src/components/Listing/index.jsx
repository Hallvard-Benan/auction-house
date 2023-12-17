import ListingUi from "./ui";
import { fetchOneListing } from "/src/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "/src/Context/AuthContext";
import { useEffect, useState } from "react";
import { makeBid } from "/src/lib/api";
import SkeletonListing from "./loading";
import ErrorMessage from "../ui/errorMessage";

function Listing() {
  const [isMyPost, setIsMyPost] = useState(false);
  const [error, setError] = useState(null);
  const { authUser, isLoggedIn } = useAuth();
  const queryClient = useQueryClient();
  const [availableCredits, setAvailableCredits] = useState(0);
  const [highestBid, setHighestBid] = useState([]);
  const [sortedBids, setSortedBids] = useState([]);

  useEffect(() => {
    if (authUser) setAvailableCredits(authUser.credits);
  }, [authUser]);

  const searchParams = new URLSearchParams(window.location.search);
  const listingId = searchParams.get("id");

  const submitBidMutation = useMutation({
    mutationFn: makeBid,
    onError: () => setError("something went wrong, please try again later"),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["listing", listingId],
      });
    },
  });

  const handleOnSubmitBid = (e) => {
    e.preventDefault();
    setError(null);

    const bidAmount = parseInt(e.target.bid.value);
    const availableFunds = authUser.credits;
    let bidToBeat;
    if (!highestBid) {
      bidToBeat = 0;
    } else {
      bidToBeat = highestBid.amount;
    }

    if (bidAmount <= availableFunds && bidAmount > bidToBeat) {
      submitBidMutation.mutate(bidAmount);
      setAvailableCredits((prev) => prev - bidAmount);
      e.target.reset();
    } else if (bidAmount <= bidToBeat) {
      setError(`Bid must be higher than the current bid of: $${bidToBeat}`);
    } else if (bidAmount > availableFunds) {
      setError("Not enough funds");
    }
  };

  const {
    status,
    data: listing,
    error: dataError,
  } = useQuery({
    queryKey: ["listing", listingId],
    queryFn: () => fetchOneListing(listingId),
  });

  useEffect(() => {
    if (status === "success" && listing && listing.seller && authUser) {
      setIsMyPost(listing.seller.email === authUser.email);
      setHighestBid(
        listing.bids.reduce((maxBid, currentBid) => {
          return currentBid.amount > maxBid.amount ? currentBid : maxBid;
        }, listing.bids[0])
      );
      setSortedBids(listing.bids.sort((a, b) => b.amount - a.amount));
    }
  }, [status, listing, authUser]);

  if (status === "pending") return <SkeletonListing />;

  if (status === "error") return <ErrorMessage error={dataError} />;
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
        sortedBids={sortedBids}
        highestBid={highestBid}
        seller={listing.seller}
        onSubmitBid={handleOnSubmitBid}
        _count={listing._count}
        availableCredits={availableCredits}
      />
    );
}

export default Listing;
