import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TfiClose } from "react-icons/tfi";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";

function Tags({ tags = [], onTagsChange }) {
  const [tag, setTag] = useState("");

  const handleTagChange = function (e) {
    setTag(e.target.value);
    console.log(e.target.value);
  };

  const addTag = function () {
    const tagToAdd = tag;
    if (!tags.includes(tagToAdd) && tagToAdd.length > 0) {
      onTagsChange([...tags, tagToAdd]);
    }
    setTag("");
  };

  const removeTag = function (tagToRemove) {
    const upToDateTags = tags.filter((tag) => tag !== tagToRemove);
    onTagsChange(upToDateTags);
  };

  return (
    <>
      <div className="flex">
        <Input
          onChange={handleTagChange}
          placeholder="Add new tag"
          id="tag"
          value={tag}
        />
        <Button
          type="button"
          onClick={addTag}
          className="flex gap-1 bg-primary"
        >
          <p>Add tag</p> <CiCirclePlus size={28} />
        </Button>
      </div>
      <div id="tagBox" className="flex flex-wrap gap-2">
        {tags.map((tagName) => (
          <div
            key={tagName}
            className="bg-secondary px-4 py-1 rounded-lg flex items-center gap-1 "
          >
            <p className="text-secondary-foreground text-sm">{tagName}</p>
            <Button
              onClick={() => removeTag(tagName)}
              className="rounded-full aspect-square p-0 bg-muted hover:bg-destructive-1/2 hover:text-destructive text-muted-foreground w-8 h-8"
            >
              <TfiClose />
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Tags;
