import { useAuth } from "../Context/AuthContext";
import ListingsByUser from "../components/Listings/byUser";

function MyListingsPage() {
  const { authUser } = useAuth();

  if (authUser) return <ListingsByUser user={authUser.name} />;
}

export default MyListingsPage;
