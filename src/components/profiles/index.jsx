import { getProfile } from "/src/lib/api";
import { useAuth } from "/src/Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

import ProfileUi from "./ui";

function Profile() {
  const [isMyProfile, setIsMyProfile] = useState(false);

  const searchParams = new URLSearchParams(window.location.search);
  const profileName = searchParams.get("name");

  const { status, data: profile } = useQuery({
    queryKey: ["profile", profileName],
    queryFn: () => getProfile(profileName),
  });

  const { authUser } = useAuth();

  useEffect(() => {
    if (status === "success" && profile && authUser) {
      console.log(authUser);
      setIsMyProfile(profile.email === authUser.authEmail);
    }
  }, [status, profile, authUser]);

  if (status === "pending") return <div>Loading...</div>;

  if (status === "error") return <div>Error:</div>;
  if (status === "success")
    return (
      <ProfileUi
        myProfile={isMyProfile}
        name={profile.name}
        avatar={profile.avatar}
        credits={profile.credits}
        wins={profile.wins}
        _count={profile._count}
      ></ProfileUi>
    );
}

export default Profile;
