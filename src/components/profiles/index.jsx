import { getProfile } from "/src/lib/api";
import { useAuth } from "/src/Context/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

import ProfileUi from "./ui";

import ListingsByUser from "../Listings/byUser";
import { updateProfileImage } from "/src/lib/api";
import SkeletonProfile from "./loading";

function Profile() {
  const [isMyProfile, setIsMyProfile] = useState(false);
  const queryClient = useQueryClient();

  const updateAvatarMutation = useMutation({
    mutationFn: (data) => {
      updateProfileImage(data.avatar, data.profileName);
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"], profileName);
    },
  });

  const searchParams = new URLSearchParams(window.location.search);
  const profileName = searchParams.get("name");

  const { status, data: profile } = useQuery({
    queryKey: ["profile", profileName],
    queryFn: () => getProfile(profileName),
  });

  const { authUser } = useAuth();

  useEffect(() => {
    if (status === "success" && profile && authUser) {
      setIsMyProfile(profile.email === authUser.email);
    }
  }, [status, profile, authUser]);

  const handleOnSubmitAvatar = function (e) {
    e.preventDefault();
    const avatar = e.target.avatarUrl.value;

    updateAvatarMutation.mutate({ avatar, profileName });
  };

  if (status === "pending") return <SkeletonProfile />;

  if (status === "error") return <div>Error:</div>;
  if (status === "success")
    return (
      <div className="grid gap-10">
        <ProfileUi
          myProfile={isMyProfile}
          name={profile.name}
          avatar={profile.avatar}
          credits={profile.credits}
          wins={profile.wins}
          _count={profile._count}
          onSubmitAvatar={handleOnSubmitAvatar}
        ></ProfileUi>
        <section className="grid gap-4">
          <h2 className="text-2xl">Recent posts from {profileName}:</h2>
          <ListingsByUser user={profileName} />
        </section>
      </div>
    );
}

export default Profile;
