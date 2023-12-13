import { useState } from "react";
import { Button } from "../ui/button";
import Tags from "../Forms/tags";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { createListing } from "/src/lib/api";
import Tag from "../ui/tag";
import Images from "./images";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import Spinner from "../ui/spinner";

export default function CreateListingForm() {
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("idle");
  const [date, setDate] = useState("");
  const [titleError, setTitleError] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [isAddingTag, setIsAddingTag] = useState(false);

  const createListingMutation = useMutation({
    mutationFn: createListing,
    onMutate: () => setStatus("pending"),
    onError: (err) => {
      console.log(err);
      setStatus("error");
    },
    onSuccess: (res) => {
      setStatus("success");
      setTimeout(() => navigate({ to: `/listing?id=${res.id}` }), 2000);
    },
  });
  const handleTagsChange = (newTags) => {
    setTags(newTags);
  };

  const handleTagsAdd = () => {
    setIsAddingTag(false);
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
    const formattedTags = tags.map((tag) => tag.toLowerCase());

    const formData = {
      endsAt: date,
      title: title,
      description: description,
      tags: formattedTags,
      media: images,
    };

    const now = new Date();

    const endDate = new Date(formData.endsAt);

    if (!formData.endsAt) {
      setDateError("End Date is required");
    } else if (new Date(formData.endsAt) < new Date()) {
      setDateError("End date must be set to the future");
    }

    if (!formData.title) {
      setTitleError("Title is required");
    }

    if (formData.title && formData.endsAt && now < endDate) {
      createListingMutation.mutate(formData);
    }
  };

  if (status === "idle")
    return (
      <form
        onSubmit={onSubmit}
        className=" grid gap-6  mx-auto bg-secondary/40 p-4 sm:p-8 rounded-md"
      >
        <fieldset>
          <Label htmlFor="title">
            <span className="text-destructive">*</span> Title:
          </Label>
          <Input
            id="title"
            placeholder="Title"
            className={titleError && "border-destructive"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <p className="text-destructive">{titleError && titleError}</p>
        </fieldset>
        <fieldset>
          <Label htmlFor="">Description:</Label>
          <Textarea
            name="description"
            placeholder="Your description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </fieldset>
        <fieldset className="grid gap-1">
          <Label htmlFor="images">Images:</Label>

          <Images
            id="images"
            onExit
            images={images}
            onImagesChange={handleImagesChange}
            active={true}
          ></Images>
        </fieldset>
        <fieldset className="grid gap-4">
          <div>
            <Label htmlFor="tags">Tags:</Label>
            {tags.length < 1 && (
              <h3 className="text-sm text-muted-foreground">
                Select from popular tags, or add you own tag below.
              </h3>
            )}
          </div>
          <Tags
            tags={tags}
            onTagsChange={handleTagsChange}
            active={isAddingTag}
            onTagsAdd={handleTagsAdd}
            onTagsRemove={removeTag}
            variant={"form"}
            id="tags"
          />
          {!isAddingTag && (
            <Button type="button" onClick={() => setIsAddingTag(true)}>
              Add your own tag
            </Button>
          )}
          <div>
            {tags.length > 1 && <h3>Chosen tags: </h3>}

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
          </div>
        </fieldset>

        <fieldset>
          <Label htmlFor="date">
            <span className="text-destructive">*</span> End date:{" "}
          </Label>
          <Input
            className={titleError && "border-destructive"}
            id="date"
            type="datetime-local"
            onChange={(e) => {
              console.log(e.target.value);
              setDate(e.target.value);
            }}
          ></Input>
          <p className="text-destructive">{dateError && dateError}</p>
        </fieldset>

        {status === "idle" && (
          <Button
            type="submit"
            className={!(date && title) ? "bg-primary/50" : ""}
          >
            Create this listing
          </Button>
        )}

        {status === "pending" && <Spinner></Spinner>}

        <span className="text-destructive">* Required</span>
      </form>
    );
  else if (status === "success") {
    return <h1>success, navigating to post</h1>;
  }
}
