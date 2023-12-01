import { useAuth } from "../Context/AuthContext";
import ListingsByUser from "../components/Listings/byUser";

function MyListingsPage() {
  const { authUser } = useAuth();
  return <ListingsByUser user={authUser.authUserName} />;
}

export default MyListingsPage;
