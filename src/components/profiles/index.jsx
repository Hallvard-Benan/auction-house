import { getProfile } from "/src/lib/api";
import { useAuth } from "/src/Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

import ProfileUi from "./ui";

import ListingsByUser from "../Listings/byUser";
import { updateProfileImage } from "/src/lib/api";

function Profile() {
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const updateAvatarMutation = useMutation({
    mutationFn: (data) => {
      updateProfileImage(data.avatar, data.profileName);
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (res) => {
      console.log(res);
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
      setIsMyProfile(profile.email === authUser.authEmail);
    }
  }, [status, profile, authUser]);

  const handleOnSubmitAvatar = function (e) {
    e.preventDefault();
    const avatar = e.target.avatarUrl.value;

    const data = { avatar, profileName };

    updateAvatarMutation.mutate({ avatar, profileName });

    setIsEditing(false);
  };

  const handleOnOpenEdit = function () {
    setIsEditing(true);
  };

  if (status === "pending") return <div>Loading...</div>;

  if (status === "error") return <div>Error:</div>;
  if (status === "success")
    return (
      <>
        <ProfileUi
          myProfile={isMyProfile}
          name={profile.name}
          avatar={profile.avatar}
          credits={profile.credits}
          wins={profile.wins}
          _count={profile._count}
          isEditing={isEditing}
          onOpenEdit={handleOnOpenEdit}
          onSubmitAvatar={handleOnSubmitAvatar}
        ></ProfileUi>
        <ListingsByUser user={profileName} />
      </>
    );
}

export default Profile;
