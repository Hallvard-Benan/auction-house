import Listings from "../components/Listings";
import SearchBar from "../components/ui/searchBar";

function Home() {
  return (
    <main className="grid gap-6">
      <SearchBar />
      <Listings />
    </main>
  );
}

export default Home;
