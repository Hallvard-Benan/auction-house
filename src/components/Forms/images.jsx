import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TfiClose } from "react-icons/tfi";
import { CiCirclePlus } from "react-icons/ci";

function Images({ images = [], onImagesChange, active, onImageAdd }) {
  const [image, setImage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = function (e) {
    setImage(e.target.value);
    console.log(e.target.value);
  };

  const isValidImageUrl = (url) => {
    // Regular expression to match common image file extensions
    const imageExtensions = /\.(jpeg|jpg|gif|png|webp)$/i;

    // Check if the URL ends with a valid image extension
    if (url.match(imageExtensions)) {
      return true;
    }

    // Alternatively, you can also perform a more robust check by attempting to load the image
    const img = new Image();
    img.src = url;

    // If the image can be loaded successfully, consider it a valid image URL
    return img.complete && img.naturalWidth > 0;
  };
  const addImage = function (imageToAdd) {
    if (
      isValidImageUrl(imageToAdd) &&
      !images.includes(imageToAdd) &&
      imageToAdd.length > 0
    ) {
      onImagesChange([...images, imageToAdd]);
      setError(null);
    } else if (images.includes(imageToAdd)) {
      setError("Cannot submit same image multiple times");
    } else if (!isValidImageUrl(imageToAdd)) {
      setError(
        "Must be a valid URL to a publicly available image, ending in .jpg .png etc."
      );
    }
    setImage("");
  };

  const removeImage = function (imageToRemove) {
    const upToDateImages = images.filter((img) => img !== imageToRemove);
    onImagesChange(upToDateImages);
  };

  return (
    <div className="grid gap-3">
      {active && (
        <div>
          <div className="grid gap-4">
            <div className="flex">
              <Input
                onChange={handleImageChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={
                  isFocused ? "write the URL to the image" : "add image"
                }
                id="image"
                value={image}
              />
              <Button
                type="button"
                onClick={() => addImage(image)}
                className="flex gap-1 bg-primary"
              >
                <p>Add image</p>
                <CiCirclePlus size={28} />
              </Button>
            </div>
          </div>
          {error && <div className="text-destructive">{error}</div>}
        </div>
      )}
      {images.length > 0 && (
        <div id="imageBox" className="flex flex-wrap gap-8">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative h-20 ">
              <img
                src={imageUrl}
                alt="image you have added"
                className="rounded-md max-h-full"
              />
              <Button
                onClick={() => removeImage(imageUrl)}
                className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/2 rounded-full aspect-square p-0 bg-muted hover:bg-destructive-1/2 hover:text-destructive text-muted-foreground w-8 h-8"
              >
                <TfiClose />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Images;
