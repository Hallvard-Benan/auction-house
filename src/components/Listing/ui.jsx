import { Input } from "../ui/input";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import Tag from "../ui/tag";
import { useAuth } from "/src/Context/AuthContext";
import CountdownTimer from "../ui/countDown";
import Carousel from "../ui/carousel";
import LoginModal from "../Modals/LoginModal";

import { useEffect, useState } from "react";
function ListingUi({
  title = "",
  description = "",
  media = [],
  tags = [],
  created = "",
  updated = "",
  endsAt = "",
  id,
  bids = [],
  seller = {},
  _count = {},
  myPost = false,
  error = null,
  loggedIn = false,
  availableCredits,
  onSubmitBid = () => {},
}) {
  const sortedBids = bids.sort((a, b) => b.amount - a.amount);

  const highestBid = bids.reduce((maxBid, currentBid) => {
    return currentBid.amount > maxBid.amount ? currentBid : maxBid;
  }, bids[0]);

  const profileLink = `/profile?name=${seller.name}`;

  const formattedDate = function (originalDate) {
    const dateToFormat = new Date(originalDate);
    const formattedDate = `${String(dateToFormat.getDate()).padStart(
      2,
      "0"
    )}.${String(dateToFormat.getMonth() + 1).padStart(
      2,
      "0"
    )}.${dateToFormat.getFullYear()}`;
    return formattedDate;
  };

  return (
    <>
      {myPost && (
        <Button onClick={() => setIsEditing(true)}>Edit listing</Button>
      )}
      <div className="grid grid-cols-1 justify-items-center md:justify-items-stretch md:grid-cols-2 gap-6 overflow-hidden">
        <div className="cols-span-1 md:col-span-2 grid md:grid-cols-5 md:h-96 gap-6 md:gap-8">
          {/* venstre side / carousel */}
          <div className="h-72 w-calc md:h-96 md:w-auto col-span-1 md:col-span-3">
            <Carousel
              images={
                media.length > 0
                  ? media
                  : [
                      "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg",
                    ]
              }
            />
          </div>
          {/* høyre side */}
          <div className="grid md:col-span-2 md:h-80 items-stretch">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl md:text-4xl">{title}</h1>
              {loggedIn ? (
                <Link to={profileLink}>
                  <div className="flex gap-2 group">
                    <img
                      src={seller.avatar}
                      alt={"avatar image for " + seller.name}
                      className="h-12 w-12 rounded-full"
                    />
                    <div>
                      <p className="text-xl font-medium group-hover:text-primary">
                        {seller.name}
                      </p>
                      <p className="text-sm font-medium text-secondary-foreground/70">
                        Posted on {formattedDate(created)}
                      </p>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="flex gap-1">
                  <p>{seller.name}</p>
                  <img src={seller.avatar} alt="" className="h-8" />
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <p>Auction ends in: </p>
              <CountdownTimer endsAt={endsAt} />
            </div>
            <div className="grid gap-2">
              <div className="flex text-xl font-semibold text-neutral-700">
                {_count.bids > 0 ? (
                  <h3>
                    <span className="text-primary">${highestBid.amount}</span>{" "}
                    Current bid
                  </h3>
                ) : (
                  <h3>No bids yet</h3>
                )}
              </div>
              {!loggedIn && (
                <div>
                  <LoginModal link={`/listing?id=${id}`}></LoginModal>Log in to
                  bid on this auction
                </div>
              )}

              {!myPost && loggedIn && (
                <div>
                  <form className="flex" onSubmit={onSubmitBid}>
                    <Input type="number" name="bid" placeholder="$" />
                    <Button type="submit">place bid</Button>
                  </form>
                  <p>Available funds: ${availableCredits}</p>
                  {error && <p>{error}</p>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* mer info */}
        <section>
          <h2 className="text:xl md:text-2xl">Description</h2>
          <p>{description}</p>
          <h3 className="text-lg">Tags:</h3>
          <div className="flex">
            {tags.map((tagName, index) => (
              <Tag editable={false} key={index} text={tagName} />
            ))}
          </div>
          <p>created: {created}</p>
          <p>{tags[0]}</p>
          <p>{updated}</p>
          <p>{endsAt}</p>
        </section>
        <section>
          <h2>Bid history:</h2>
          {_count.bids > 0 ? (
            <div>
              <p> bids {_count.bids}</p>
              <div>
                {sortedBids.map((bid, index) => (
                  <div key={index}>{bid.amount}</div>
                ))}
              </div>
            </div>
          ) : (
            <p>No bids yet</p>
          )}
        </section>
        {/* {JSON.stringify(bids)} */}
      </div>
    </>
  );
}

export default ListingUi;
