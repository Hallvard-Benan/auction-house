import { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";

function Carousel({ images = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleInactiveSlideClick = (image) => {
    setCurrentSlide(images.indexOf(image));
  };

  const activeSlideStyles = "object-contain w-full h-full";

  const imageButtonStyles =
    "object-cover w-12 h-12 cursor-pointer transition-opacity transition duration-300";
  const currentImageButtonStyles = `${imageButtonStyles} opacity-10 ease-outs`;

  return (
    <div className="w-full h-full grid grid-rows-4 gap-2">
      <div className="row-span-3 bg-secondary/50 rounded-md overflow-hidden">
        <img
          src={images[currentSlide]}
          alt="product image"
          className={activeSlideStyles}
        />
      </div>
      <div
        className={
          images.length < 2
            ? "flex justify-center items-center"
            : "flex justify-between items-center "
        }
      >
        {images.length > 1 && (
          <button
            className="text-2xl -rotate-180 hover:text-primary"
            onClick={() => {
              if (currentSlide !== 0) {
                setCurrentSlide((prev) => prev - 1);
              } else setCurrentSlide(images.length - 1);
            }}
          >
            <FaChevronRight />
          </button>
        )}
        <div className={images.length > 3 ? "flex sm:hidden" : "hidden"}>
          {currentSlide + 1} / {images.length}
        </div>
        <div
          className={
            images.length <= 3
              ? "flex gap-2"
              : "hidden sm:flex flex-shrink sm:gap-2 "
          }
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={
                image
                  ? image
                  : "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
              }
              className={
                index === currentSlide
                  ? currentImageButtonStyles
                  : imageButtonStyles
              }
              onClick={() => handleInactiveSlideClick(image)}
            />
          ))}
        </div>
        {images.length > 1 && (
          <button
            className="text-2xl hover:text-primary"
            onClick={() => {
              if (currentSlide !== images.length - 1) {
                setCurrentSlide((prev) => prev + 1);
              } else setCurrentSlide(0);
            }}
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
}

export default Carousel;
