import { useState } from "react";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FaFilter } from "react-icons/fa";

import { Checkbox } from "../ui/checkbox";

function FilterForm() {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [isActivePostsChecked, setIsActivePostsChecked] = useState(true);
  const togglePopoverOpen = () => {
    setPopoverOpen((prev) => !prev);
  };

  return (
    <Popover open={popoverOpen}>
      <PopoverTrigger
        onClick={togglePopoverOpen}
        className="flex items-center gap-1"
      >
        <h3 className="text-lg">Filters</h3>
        <p className="text-lg">
          <FaFilter />
        </p>
      </PopoverTrigger>
      <PopoverContent>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="grid gap-4"
        >
          <Select
            onValueChange={(value) => {
              setSortBy(value);
            }}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Sort by:" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created">Time created</SelectItem>
              <SelectItem value="title">Title</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Sort order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">
                Descending{" "}
                {sortBy === "title"
                  ? " (A-Z)"
                  : sortBy === "created"
                  ? " (Newest)"
                  : null}
              </SelectItem>
              <SelectItem value="asc">
                Ascending{" "}
                {sortBy === "title"
                  ? " (Z-A)"
                  : sortBy === "created"
                  ? " (Oldest)"
                  : null}
              </SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-1 h-6 items-center">
            <Checkbox
              onClick={() => {
                setIsActivePostsChecked((prev) => !prev);
              }}
              id="activePostsOnly"
              className=""
              checked={isActivePostsChecked}
              value={isActivePostsChecked}
            />
            <Label
              htmlFor="activePostsOnly"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Only show active listings
            </Label>
          </div>

          <div>
            <Label htmlFor="tag">Chose a tag:</Label>
            <Input id="tag" placeholder="'phone', 'fashion' etc. "></Input>
          </div>
          <div className="flex justify-between">
            <Button
              type="button"
              variant="secondary"
              onClick={togglePopoverOpen}
            >
              cancel
            </Button>
            <Button type="submit" onClick={togglePopoverOpen}>
              Update filters
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}

export default FilterForm;
