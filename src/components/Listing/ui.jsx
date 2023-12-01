import { Input } from "../ui/input";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import Tag from "../ui/tag";
import CountdownTimer from "../ui/countDown";
function ListingUi({
  title = "",
  description = "",
  media = "",
  tags = [],
  created = "",
  updated = "",
  endsAt = "",
  bids = [],
  seller = {},
  _count = {},
  myPost = false,
  error = null,
  loggedIn = false,
  onSubmitBid = () => {},
}) {
  const sortedBids = bids.sort((a, b) => b.amount - a.amount);

  const highestBid = bids.reduce((maxBid, currentBid) => {
    return currentBid.amount > maxBid.amount ? currentBid : maxBid;
  }, bids[0]);

  const profileLink = `/profile?name=${seller.name}`;

  return (
    <div className="grid grid-cols-2 gap-6">
      {myPost && <div>edit content</div>}
      <div className="col-span-2 grid grid-cols-2 h-72 overflow-hidden gap-6">
        <div className="bg-secondary object-contain flex justify-center h-full rounded-lg">
          <img src={media[0]} className="h-auto max-h-72" />
        </div>
        <div className="grid h-72 items-stretch">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl">{title}</h1>

            {loggedIn ? (
              <Link to={profileLink}>
                <div className="flex gap-1">
                  <p>{seller.name}</p>
                  <img src={seller.avatar} alt="" className="h-8" />
                </div>
              </Link>
            ) : (
              <div className="flex gap-1">
                <p>{seller.name}</p>
                <img src={seller.avatar} alt="" className="h-8" />
              </div>
            )}
          </div>

          <p>2 days left</p>
          <div className="grid gap-2">
            <div className="flex">
              {_count.bids > 0 && <h3>Highest bid: ${highestBid.amount}</h3>}
            </div>
            {!myPost && (
              <div>
                <form className="flex" onSubmit={onSubmitBid}>
                  <Input type="number" name="bid" />{" "}
                  <Button type="submit">place bid</Button>
                </form>
                <p>available funds: 1234$</p>
                {error && <p>{error}</p>}
              </div>
            )}
          </div>
        </div>
      </div>

      <section>
        <h2 className="text:xl md:text-2xl">Description</h2>
        <p>{description}</p>
        <h3 className="text-lg">Tags:</h3>
        <div className="flex">
          {tags.map((tagName, index) => (
            <Tag editable={false} key={index} text={tagName} />
          ))}
        </div>
        <p>{created}</p>
        <p>{tags[0]}</p>
        <p>{updated}</p>
        <CountdownTimer endsAt={endsAt} />
        <p>{endsAt}</p>
      </section>
      <section>
        <h2>Bid history:</h2>
        {_count.bids > 0 ? (
          <div>
            <p> bids {_count.bids}</p>
            <p>
              {sortedBids.map((bid, index) => (
                <div key={index}>{bid.amount}</div>
              ))}
            </p>
          </div>
        ) : (
          <p>No bids yet</p>
        )}
      </section>
    </div>
  );
}

export default ListingUi;
