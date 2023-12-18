import { Input } from "../ui/input";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import Tag from "../ui/tag";
import CountdownTimer from "../ui/countDown";
import Carousel from "../ui/carousel";
import LoginModal from "../Modals/LoginModal";
import {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogContent,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

function ListingUi({
  title = "",
  description = "",
  media = [],
  tags = [],
  created = "",
  updated = "",
  endsAt = "",
  id,
  highestBid,
  sortedBids = [],
  seller = {},
  _count = {},
  myPost = false,
  error = null,
  loggedIn = false,
  availableCredits,
  onSubmitBid = () => {},
  onDelete = () => {},
}) {
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
        <Dialog>
          <DialogTrigger className="border-2 w-fit px-4 py-2 rounded-md border-destructive text-destructive mx-auto">
            Delete this listing
          </DialogTrigger>
          <DialogContent className="gap-16">
            <h2 className="text-2xl text-center">
              Permanently delete listing?
            </h2>
            <div className="flex justify-between">
              <DialogClose className="bg-secondary px-4 rounded-md">
                cancel
              </DialogClose>
              <Button variant="destructive" onClick={onDelete}>
                {" "}
                Confirm Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
      <div className="grid grid-cols-1 justify-items-center md:justify-items-stretch md:grid-cols-2 gap-6 overflow-hidden">
        <div className="cols-span-1 md:col-span-2 grid md:grid-cols-5 md:h-96 gap-4 md:gap-8">
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
          <div className="grid md:col-span-2 md:h-96 items-stretch gap-6">
            <div className="flex flex-col gap-4 overflow-hidden">
              <h1 className="text-3xl md:text-4xl break-words ">{title}</h1>
              {loggedIn ? (
                <Link to={profileLink}>
                  <div className="flex gap-2 group bg-primary/10 p-2 rounded-md">
                    <img
                      src={seller.avatar}
                      alt={"avatar image for " + seller.name}
                      className="h-12 w-12 rounded-full"
                    />
                    <div>
                      <p className="text-xl font-medium  group-hover:text-primary">
                        {seller.name}
                      </p>
                      <p className="text-sm font-medium text-secondary-foreground/70">
                        Posted on {formattedDate(created)}
                      </p>
                    </div>
                  </div>
                </Link>
              ) : (
                <div>
                  <div className="flex gap-2 group">
                    <img
                      src={seller.avatar}
                      alt={"avatar image for " + seller.name}
                      className="h-12 w-12 rounded-full"
                    />
                    <div>
                      <p className="text-xl font-medium">{seller.name}</p>
                      <p className="text-sm font-medium text-secondary-foreground/70">
                        Posted on {formattedDate(created)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <CountdownTimer
              endsAt={endsAt}
              longFormat={true}
              className="text-lg md:text-xl"
            />

            <div className="grid gap-2">
              <div className="flex text-lg font-semibold text-neutral-700">
                {_count.bids > 0 ? (
                  <h3 data-cy="currentBid">
                    <span className="text-primary text-2xl">
                      ${highestBid?.amount}
                    </span>{" "}
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
                    <Input
                      data-cy="bidInput"
                      type="number"
                      name="bid"
                      placeholder="$"
                    />
                    <Button data-cy="bidSubmit" type="submit">
                      place bid
                    </Button>
                  </form>
                  <p>Available funds: ${availableCredits}</p>
                  {error && <p className="text-destructive">{error}</p>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* mer info */}
        <section className="w-full md:col-span-2">
          <Tabs
            defaultValue="details"
            className="w-full grid border-2 rounded-md"
          >
            <TabsList className="w-full justify-evenly md:p-6 ">
              <TabsTrigger className="md:text-xl" value="details">
                Details
              </TabsTrigger>
              <TabsTrigger data-cy="bidTab" className="md:text-xl" value="bids">
                Bid History
              </TabsTrigger>
            </TabsList>

            <TabsContent className="grid gap-6" value="details">
              <div className="grid gap-2">
                <h2 className="text:xl md:text-2xl font-medium">
                  Description:
                </h2>
                <p>{description}</p>
              </div>

              <div className="grid gap-2">
                <h2 className="text:xl md:text-2xl font-medium">Tags:</h2>
                <div className="flex flex-wrap gap-1">
                  {tags.map((tagName, index) => (
                    <Link
                      key={index}
                      to={`/listings?_tag=${tagName.toLowerCase()}`}
                    >
                      <Tag editable={false} text={tagName} />
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p>Last updated: {updated}</p>
                <p>Auction ends: {formattedDate(endsAt)}</p>
              </div>
            </TabsContent>

            <TabsContent className="grid gap-4" value="bids">
              <h2 className="text:xl md:text-2xl font-medium">Bids:</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="">Date</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead className="">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedBids.map((bid, index) => (
                    <TableRow key={index} data-cy={`bid-${bid.amount}`}>
                      <TableCell className="font-medium">
                        {formattedDate(bid.created)}
                      </TableCell>
                      <TableCell>{bid.bidderName}</TableCell>
                      <TableCell>{bid.amount} $</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </>
  );
}

export default ListingUi;
