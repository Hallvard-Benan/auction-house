import { Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "../ui/card";

import CountdownTimer from "../ui/countDown";

function ListingsUi({ listings = [], variant }) {
  const limitLength = function (str, max) {
    return str.length > max ? str.slice(0, max) : str;
  };

  return (
    <section className="w-calc mx-auto">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center align-center">
        {listings.map(({ id, title, media, bids, endsAt }, index) => {
          let highestBid = { amount: 0 };

          if (bids?.length > 0) {
            highestBid = bids.reduce((maxBid, currentBid) =>
              currentBid.amount > maxBid.amount ? currentBid : maxBid
            );
          }

          return (
            <Card
              key={index}
              className="overflow-hidden grid h-[28rem] grid-cols-1 relative"
            >
              <Link
                to={`/listing?id=${id}`}
                className="col-span-1 grow-0 grid grid-cols-1 max-h-full"
              >
                <CardContent className="px-0 col-span-1 overflow-hidden h-[20rem]">
                  <img
                    loading="lazy"
                    src={
                      media && media[0]
                        ? media[0]
                        : "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
                    }
                    alt={title}
                    className="w-full h-[20rem] object-cover"
                  />
                </CardContent>
                <CardFooter className="row-span-1 w-full grid">
                  <CardTitle>
                    {title.length < 20 ? title : limitLength(title, 55) + "..."}
                  </CardTitle>
                  {variant !== "bid" ? (
                    <CardDescription>
                      {highestBid.amount > 0 ? (
                        <h3 className="text-lg text-primary">
                          <span className="font-medium">
                            {highestBid.amount}$
                          </span>{" "}
                        </h3>
                      ) : (
                        <h3 className="text-lg">No bids</h3>
                      )}
                    </CardDescription>
                  ) : (
                    <CardDescription>
                      <CountdownTimer
                        endsAt={endsAt}
                        mediumFormat={true}
                      ></CountdownTimer>
                    </CardDescription>
                  )}
                </CardFooter>
              </Link>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export default ListingsUi;
