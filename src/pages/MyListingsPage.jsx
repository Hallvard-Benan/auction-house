import { useAuth } from "../Context/AuthContext";
import ListingsByUser from "../components/Listings/byUser";

function MyListingsPage() {
  const { authUser } = useAuth();

  if (authUser)
    return (
      <>
        <h1 className="text-3xl">My Listings:</h1>
        <ListingsByUser user={authUser.name} />
      </>
    );
}

export default MyListingsPage;
