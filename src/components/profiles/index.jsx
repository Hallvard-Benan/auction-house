import { getProfile } from "/src/lib/api";
import { useAuth } from "/src/Context/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { validateAvatar } from "/src/lib/validation";
import { useNavigate } from "@tanstack/react-router";

import ProfileUi from "./ui";

import ListingsByUser from "../Listings/byUser";
import { updateProfileImage } from "/src/lib/api";
import SkeletonProfile from "./loading";

function Profile() {
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [profileName, setProfileName] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { authUser } = useAuth();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const name = searchParams.get("name");
    setProfileName(name);
  }, []);

  const {
    error,
    status,
    data: profile,
  } = useQuery({
    queryKey: ["profile", profileName],
    queryFn: () => {
      console.log("getting profile");
      return getProfile(profileName);
    },
    enabled: !!profileName,
  });

  useEffect(() => {
    if (status === "success" && profile && authUser) {
      setIsMyProfile(profile.email === authUser.email);
    }
  }, [status, profile, authUser]);

  const handleOnSubmitAvatar = async function (e) {
    e.preventDefault();
    const avatar = e.target.avatarUrl.value;
    const validatedImageUrl = await validateAvatar(avatar);

    if (!validatedImageUrl) {
      toast.error("Invalid Image url", { duration: 2000 });
    } else if (validatedImageUrl && avatar !== profile.avatar) {
      updateAvatarMutation.mutate({ avatar, profileName });
    } else toast.error("New image must be different", { duration: 2000 });
  };

  const updateAvatarMutation = useMutation({
    mutationFn: (data) => {
      updateProfileImage(data.avatar, data.profileName);
    },
    onError: () => {
      toast.error("Failed to update avatar");
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["profile", profileName] });
      }, 200);

      navigate({ to: `/profile`, search: { name: profileName } });
    },
  });

  if (status === "pending") return <SkeletonProfile />;

  if (status === "error")
    return (
      <div>
        Something went wrong!{" "}
        {error.message.includes("401")
          ? "Not authorized, Please log in"
          : error.message.includes("404")
          ? "Profile does not exist"
          : error.message}
      </div>
    );
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
