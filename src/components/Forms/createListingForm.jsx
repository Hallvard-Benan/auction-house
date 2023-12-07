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
      console.log(res);
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

    // Collect data from form components
    const formData = {
      endsAt: date,
      title: title,
      description: description,
      tags: tags,
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
        className=" grid gap-6 max-w-xl mx-auto bg-secondary/40 p-4 sm:p-8 rounded-md"
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

        {status === "pending" && (
          <div className="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        <span className="text-destructive">* Required</span>
      </form>
    );
  else if (status === "success") {
    return <h1>success, navigating to post</h1>;
  }
}
