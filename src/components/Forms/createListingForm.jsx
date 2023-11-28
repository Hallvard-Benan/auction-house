import { useState } from "react";
import { Button } from "../ui/button";
import Tags from "./Tags";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { TfiClose } from "react-icons/tfi";

import Images from "./images";

export default function CreateListingForm() {
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [validated, setValidated] = useState(false);
  const [description, setDescription] = useState("");
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [isAddingTag, setIsAddingTag] = useState(false);

  const handleTagsChange = (newTags) => {
    setTags(newTags);
  };

  const handleTagsAdd = () => {
    setIsAddingTag(false);
  };

  const handleImageAdd = () => {
    setIsAddingImage(false);
  };
  const handleImagesChange = (newImages) => {
    setImages(newImages);
  };

  const removeTag = function (tagToRemove) {
    const upToDateTags = tags.filter((tag) => tag !== tagToRemove);
    handleTagsChange(upToDateTags);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Collect data from form components
    const formData = {
      title: title,
      description: description,
      tags: tags,
      images: images,
    };

    // Make a fetch request
    console.log(JSON.stringify(formData));
  };

  return (
    <form onSubmit={onSubmit} className=" grid gap-4 ">
      <Tags
        tags={tags}
        onTagsChange={handleTagsChange}
        active={isAddingTag}
        onTagsAdd={handleTagsAdd}
      />
      {!isAddingTag && (
        <Button type="button" onClick={() => setIsAddingTag(true)}>
          Add a new Tag
        </Button>
      )}
      {tags.length > 0 && (
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
                <Input className="hidden"></Input>
              </Button>
            </div>
          ))}
        </div>
      )}
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Your description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {!isAddingImage && (
        <Button
          type="button"
          onClick={() => {
            setIsAddingImage(true);
          }}
        >
          Add new image
        </Button>
      )}
      <Images
        onExit
        images={images}
        onImagesChange={handleImagesChange}
        onImageAdd={handleImageAdd}
        active={isAddingImage}
      ></Images>
      <Button type="submit" variant={validated ? "primary" : "secondary"}>
        Create this listing
      </Button>
    </form>
  );
}
