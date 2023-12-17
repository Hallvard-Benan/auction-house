import { useEffect, useState } from "react";
import Bids from "../components/Bids";
import { useAuth } from "../Context/AuthContext";
import SkeletonListings from "../components/Listings/loading";

function MyBidsPage() {
  const [name, setName] = useState(null);
  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser) {
      const authName = authUser.name;
      setName(authName);
    }
  }, [authUser]);

  if (name && typeof name === "string")
    return (
      <>
        <h1 className="text-3xl">Listings you have bid on:</h1>
        <Bids user={name} />
      </>
    );
  else return <SkeletonListings></SkeletonListings>;
}

export default MyBidsPage;
