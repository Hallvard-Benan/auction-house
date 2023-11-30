import { useState } from "react";
import { Button } from "../ui/button";
import Tags from "./Tags";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { TfiClose } from "react-icons/tfi";
import { createListing } from "/src/lib/api";
import Tag from "../ui/tag";
import Images from "./images";
import { useMutation } from "@tanstack/react-query";

export default function CreateListingForm() {
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [validated, setValidated] = useState(false);
  const [description, setDescription] = useState("");
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [isAddingTag, setIsAddingTag] = useState(false);

  const createListingMutation = useMutation({
    mutationFn: createListing,
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (res) => {
      console.log(res);
    },
  });
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
      endsAt: date,
      title: title,
      description: description,
      tags: tags,
      media: images,
    };

    createListingMutation.mutate(formData);
  };

  return (
    <form onSubmit={onSubmit} className=" grid gap-4 ">
      <Tags
        tags={tags}
        onTagsChange={handleTagsChange}
        active={isAddingTag}
        onTagsAdd={handleTagsAdd}
        onTagsRemove={removeTag}
      />
      {!isAddingTag && (
        <Button type="button" onClick={() => setIsAddingTag(true)}>
          Add a new Tag
        </Button>
      )}
      {tags.length > 0 && (
        <div id="tagBox" className="flex flex-wrap gap-2">
          {tags.map((tagName) => (
            <Tag
              text={tagName}
              key={tagName}
              editable={true}
              handleOnRemove={() => removeTag(tagName)}
            />
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
      <Input type="date" onChange={(e) => setDate(e.target.value)}></Input>
      <Button
        type="submit"
        value={date}
        variant={validated ? "primary" : "secondary"}
      >
        Create this listing
      </Button>
    </form>
  );
}
