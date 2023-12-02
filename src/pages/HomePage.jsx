import Listings from "../components/Listings";
import SearchBar from "../components/ui/searchBar";
import { fetchAllListings } from "../lib/api";
import { useQuery } from "@tanstack/react-query";

function HomePage() {
  const {
    status,
    error,
    data: listings,
  } = useQuery({
    queryKey: ["listings"],
    queryFn: fetchAllListings,
  });

  return (
    <main className="grid gap-6">
      <SearchBar />
      <Listings status={status} error={error} listings={listings} />
    </main>
  );
}

export default HomePage;
