import { useState, useEffect } from "react";
import { fetchAllListings } from "../../lib/api";
import SkeletonListings from "./loading";
import ListingsUi from "./ui";

function Listings() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialListings = await fetchAllListings();
        setListings(initialListings);
      } catch (error) {
        console.error("Error fetching listings:", error);
        console.log(error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (isLoading) {
    return <SkeletonListings />;
  }

  return <ListingsUi listings={listings} />;
}

export default Listings;
