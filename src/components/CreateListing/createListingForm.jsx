import { useState } from "react";
import { Button } from "../ui/button";
import Tags from "./tags";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { createListing } from "/src/lib/api";
import Tag from "../ui/tag";
import Images from "./images";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import Spinner from "../ui/spinner";
import { toast } from "sonner";

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

  const createListingMutation = useMutation({
    mutationFn: createListing,
    onMutate: () => setStatus("pending"),
    onError: () => {
      setStatus("error");
      toast.error("Something went Wrong", { duration: 2000 });
    },
    onSuccess: (res) => {
      setStatus("success");
      toast.success("Successfully created post", { duration: 2000 });
      setTimeout(() => navigate({ to: `/listing?id=${res.id}` }), 1000);
    },
  });
  const handleTagsChange = (newTags) => {
    setTags(newTags);
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

  return (
    <form
      onSubmit={onSubmit}
      className=" grid gap-6 mx-auto bg-secondary/40 p-4 sm:p-8 rounded-md max-w-[740px] overflow-hidden"
    >
      <div
        className={
          status !== "idle" && status !== "error"
            ? "fixed h- w-full inset-0 bg-slate-200/50"
            : "hidden bg-transparent transition-colors duration-200"
        }
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 ">
          <h2 className="text-xl md:text-2xl font-medium">
            {status === "success" && " Navigating to post"}
          </h2>
          {status === "pending" && <Spinner></Spinner>}
        </div>
      </div>
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
        <Label htmlFor="description">Description:</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Your description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </fieldset>
      <fieldset className="grid gap-1">
        <Images
          onExit
          images={images}
          onImagesChange={handleImagesChange}
          active={true}
        ></Images>
      </fieldset>
      <fieldset className="grid gap-4">
        <Tags
          tags={tags}
          onTagsChange={handleTagsChange}
          onTagsRemove={removeTag}
          variant={"form"}
        />
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
          name="date"
          id="date"
          type="datetime-local"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        ></Input>
        <p className="text-destructive">{dateError && dateError}</p>
      </fieldset>

      <Button
        type="submit"
        disabled={status !== "idle"}
        className={!(date && title) ? "bg-primary/50" : ""}
      >
        Create this listing
      </Button>

      {status === "pending" && <Spinner></Spinner>}

      <span className="text-destructive">* Required</span>
    </form>
  );
}
