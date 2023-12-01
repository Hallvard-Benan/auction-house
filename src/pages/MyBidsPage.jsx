import { useEffect, useState } from "react";
import Bids from "../components/Bids";
import { useAuth } from "../Context/AuthContext";

function MyBidsPage() {
  const [name, setName] = useState(null);
  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser) {
      const { authUserName } = authUser;
      setName(authUserName);
    }
  }, [authUser]);

  return <Bids user={name} />;
}

export default MyBidsPage;
