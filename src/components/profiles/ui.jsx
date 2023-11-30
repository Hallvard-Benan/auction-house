import React from "react";

function ProfileUi({
  name,
  avatar,
  credits,
  wins,
  _count,
  myProfile,
  listings = [],
}) {
  return (
    <div>
      {myProfile && <div>edit</div>}
      {name}
      <img src={avatar} alt="" />
      <p>credits: {credits}</p>
      <p>wins: {wins}</p>
      <p>Listings {_count.listings}</p>

      <section></section>
    </div>
  );
}

export default ProfileUi;
