import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function ProfileUi({
  name,
  avatar,
  credits,
  wins,
  _count,
  myProfile,
  listings = [],
  isEditing,
  onSubmitAvatar,
  onOpenEdit,
}) {
  return (
    <div>
      {myProfile && !isEditing && <Button onClick={onOpenEdit}>edit</Button>}
      <div className="flex justify-evenly">
        <h1 className="text-4xl">{name}</h1>
        <img
          src={
            avatar
              ? avatar
              : "https://cdn-icons-png.flaticon.com/512/17/17004.png"
          }
          alt=""
          className="h-72"
        />
      </div>
      {isEditing && (
        <form className="flex" onSubmit={onSubmitAvatar}>
          <Input
            type="text"
            placeholder="imageUrl"
            name="avatarUrl"
            className=""
          />
          <Button type="submit">Submit new avatar</Button>
        </form>
      )}
      <p>credits: {credits}</p>
      <p>wins: {wins}</p>
      <p>Listings {_count.listings}</p>

      <section></section>
    </div>
  );
}

export default ProfileUi;
