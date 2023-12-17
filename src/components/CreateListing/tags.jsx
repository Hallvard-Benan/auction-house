import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CiCirclePlus } from "react-icons/ci";
import { Label } from "../ui/label";

// icons for popular tags
import { FaCar, FaLaptop, FaMobileAlt, FaWineGlass } from "react-icons/fa";
import { FaHouseChimney, FaShirt } from "react-icons/fa6";

import { useState } from "react";
import Category from "../ui/category";
import { Link } from "@tanstack/react-router";

function Tags({ tags = [], onTagsChange, onTagsAdd, onTagsRemove, variant }) {
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");

  const popularTags = [
    { name: "Fashion", icon: FaShirt },
    { name: "Vehicles", icon: FaCar },
    { name: "Electronics", icon: FaLaptop },
    { name: "Wine", icon: FaWineGlass },
    { name: "Real Estate", icon: FaHouseChimney },
    { name: "Phone", icon: FaMobileAlt },
  ];

  const handleTagChange = function (e) {
    setTag(e.target.value);
  };

  const addTag = function (tagToAdd) {
    const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
    if (
      !lowerCaseTags.includes(tagToAdd.toLowerCase()) &&
      tagToAdd.length > 0
    ) {
      setTag("");
      setError("");
      onTagsChange([...tags, tagToAdd]);
      onTagsAdd();
    } else if (lowerCaseTags.includes(tagToAdd.toLowerCase()))
      setError("Tags must be unique, cannot submit multiple of the same tag");
  };

  if (variant === "form")
    return (
      <>
        <div className="grid gap-4">
          <Label htmlFor="tag">Tags:</Label>
          <div>
            {tags.length < 1 && (
              <h3 className="text-sm text-muted-foreground">
                Select from popular tags, or add you own tag below.
              </h3>
            )}
          </div>
          <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {popularTags.map((item) => (
              <Category
                key={item.name}
                item={item}
                selected={tags.includes(item.name)}
                handleToggleCategory={() => {
                  !tags.includes(item.name)
                    ? addTag(item.name)
                    : onTagsRemove(item.name);
                }}
              />
            ))}
          </div>

          <div>
            <div className="flex">
              <Input
                onChange={handleTagChange}
                placeholder="Add new tag"
                id="tag"
                value={tag}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // Prevents the default action of the enter key in a form
                    addTag(tag);
                  }
                }}
              />

              <Button
                type="button"
                onClick={() => addTag(tag)}
                className="flex gap-1 bg-primary"
              >
                <p>Add tag</p> <CiCirclePlus size={28} />
              </Button>
            </div>
            <p className="text-destructive">{error}</p>
          </div>
        </div>
      </>
    );
  else if (variant === "link")
    return (
      <div className="grid grid-cols-3 md:grid-cols-6 ">
        {popularTags.map((item) => (
          <Link
            className=""
            key={item.name}
            to={`/listings?_tag=${item.name.toLowerCase()}`}
          >
            <Category
              type="link"
              item={item}
              selected={tags.includes(item.name)}
            />
          </Link>
        ))}
      </div>
    );
}

export default Tags;
