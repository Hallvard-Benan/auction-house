import { useEffect, useState } from "react";
import Bids from "../components/Bids";
import { useAuth } from "../Context/AuthContext";

function MyBidsPage() {
  const [name, setName] = useState(null);
  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser) {
      const authName = authUser.name;
      setName(authName);
    }
  }, [authUser]);

  if (name && typeof name === "string") return <Bids user={name} />;
  else return <div>loading...</div>;
}

export default MyBidsPage;
