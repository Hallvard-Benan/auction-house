import { getBidsByProfile } from "/src/lib/api";
import { useQuery } from "@tanstack/react-query";
import Listings from "../Listings";

function Bids({ user }) {
  const {
    status,
    error,
    data: bids,
  } = useQuery({
    queryKey: ["bids", user],
    queryFn: () => getBidsByProfile(user),
    select: (bids) => bids.map((bid) => bid.listing),
  });

  return <Listings listings={bids} status={status} error={error} />;
}

export default Bids;
