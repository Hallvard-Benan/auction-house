import React from "react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CiCirclePlus } from "react-icons/ci";

// icons for popular tags
import { FaCar, FaLaptop, FaMobileAlt, FaWineGlass } from "react-icons/fa";
import { FaHouseChimney, FaShirt } from "react-icons/fa6";

import { useState } from "react";
import Category from "../ui/category";

function Tags({ tags = [], onTagsChange, active, onTagsAdd }) {
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
    console.log(e.target.value);
  };

  const addTag = function (tagToAdd) {
    if (!tags.includes(tagToAdd) && tagToAdd.length > 0) {
      onTagsChange([...tags, tagToAdd]);
      onTagsAdd();
    } else if (tags.includes(tagToAdd)) setError("tags must be unique");
    setTag("");
  };

  return (
    <>
      <div className="grid gap-4">
        <div className="flex  flex-wrap gap-4">
          {popularTags.map((item) => (
            <Category
              key={item.name}
              item={item}
              selected={tags.includes(item.name)}
              handleToggleCategory={() => {
                !tags.includes(item.name)
                  ? addTag(item.name)
                  : removeTag(item.name);
              }}
            />
          ))}
        </div>
        {active && (
          <div className="flex">
            <Input
              onChange={handleTagChange}
              placeholder="Add new tag"
              id="tag"
              value={tag}
            />
            <Button
              type="button"
              onClick={() => addTag(tag)}
              className="flex gap-1 bg-primary"
            >
              <p>Add tag</p> <CiCirclePlus size={28} />
            </Button>
            <div>{error}</div>
          </div>
        )}
      </div>
    </>
  );
}

export default Tags;
