// import React from "react";

// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { TfiClose } from "react-icons/tfi";
// import { CiCirclePlus } from "react-icons/ci";

// // icons for popular tags
// import { FaCar, FaLaptop, FaMobileAlt, FaWineGlass } from "react-icons/fa";
// import { FaHouseChimney, FaShirt } from "react-icons/fa6";

// import { useState } from "react";

// function Images({ images = [], onImagesChange }) {
//   const [image, setImage] = useState("");

//   const handleTagChange = function (e) {
//     setImage(e.target.value);
//     console.log(e.target.value);
//   };

//   const addImage = function (imageToAdd) {
//     if (!images.includes(imageToAdd) && imageToAdd.length > 0) {
//       onImagesChange([...images, imageToAdd]);
//     }
//     setImage("");
//   };

//   const removeImage = function (tagToRemove) {
//     const upToDateTags = images.filter((tag) => tag !== tagToRemove);
//     onImagesChange(upToDateTags);
//   };

//   return (
//     <>
//       <div className="grid gap-4">
//         <div className="flex">
//           <Input
//             onChange={handleTagChange}
//             placeholder="Add an image url"
//             id="tag"
//             value={image}
//           />
//           <Button
//             type="button"
//             onClick={() => addImage(image)}
//             className="flex gap-1 bg-primary"
//           >
//             <p>Add tag</p> <CiCirclePlus size={28} />
//           </Button>
//         </div>
//       </div>
//       {images.length > 0 && (
//         <div id="tagBox" className="flex flex-wrap gap-2">
//           {images.map((imageUrl) => (
//             <div key={imageUrl}>
//               <img src={imageUrl} alt="" />
//               <Button
//                 onClick={() => removeImage(imageUrl)}
//                 className="rounded-full aspect-square p-0 bg-muted hover:bg-destructive-1/2 hover:text-destructive text-muted-foreground w-8 h-8"
//               >
//                 <TfiClose />
//                 <Input className="hidden"></Input>
//               </Button>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// }

// export default Images;
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

  const addImage = function (imageToAdd) {
    if (!images.includes(imageToAdd) && imageToAdd.length > 0) {
      onImagesChange([...images, imageToAdd]);
      onImageAdd();
    } else setError("Cannot submit same image multiple times");
    setImage("");
  };

  const removeImage = function (imageToRemove) {
    const upToDateImages = images.filter((img) => img !== imageToRemove);
    onImagesChange(upToDateImages);
  };

  return (
    <>
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
    </>
  );
}

export default Images;
