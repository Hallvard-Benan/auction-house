import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

function ListingsUi({ listings = [] }) {
  return (
    <section className="w-calc mx-auto">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center align-center">
        {listings.map(({ id, title, description, media, _count }) => (
          <Card key={id} className="overflow-hidden grid justify-between">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              {media[0] && <img src={media[0]} alt={title} />}
              <p>{description}</p>
            </CardContent>
            <CardFooter className="flex w-full justify-between">
              <div>Bids: {_count.bids}</div>
              <Button>
                <a href={`/listing?id=${id}`}>Link to auction</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default ListingsUi;
