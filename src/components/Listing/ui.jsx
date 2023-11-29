import { Input } from "../ui/input";
import { Button } from "../ui/button";

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
}) {
  return (
    <div className="grid grid-cols-2">
      <div className="col-span-2 grid grid-cols-2 h-72 overflow-hidden gap-6">
        <div className="bg-secondary object-contain flex justify-center h-full rounded-lg">
          <img src={media[0]} className="h-auto max-h-72" />
        </div>
        <div className="grid items-stretch">
          <h1 className="text-2xl md:text-3xl">{title}</h1>
          <p>{description}</p>
          <p>2 days left</p>
          <p>{seller.name}</p>
          <div>
            <div className="flex">
              <Input type="number" /> <Button>place bid</Button>
            </div>
            <p>available funds: 1234 kr</p>
          </div>
        </div>
      </div>

      <div className="col-span-2 flex flex-wrap">
        <p>{tags[0]}</p>
        <p>{created}</p>
        <p>{updated}</p>
        <p>{endsAt}</p>
        <p> bids {_count.bids}</p>
        <p> price {bids[0].amount}kr</p>
        <img src={seller.avatar} alt="" />
      </div>
    </div>
  );
}

export default ListingUi;
