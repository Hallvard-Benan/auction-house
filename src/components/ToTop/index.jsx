import { useState, useEffect } from "react";
import { IoIosArrowDropupCircle } from "react-icons/io";

export default function ToTopBtn() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 200 ? setIsVisible(true) : setIsVisible(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return isVisible ? (
    <div className="bottom-20 fixed w-calc z-40 flex justify-end pointer-events-none">
      <button
        className="h-12 pointer-events-auto text-[2.5rem]  flex justify-center items-center pointer-event-all cursor-pointer visible desktop-lg:translate-x-full"
        onClick={scrollToTop}
      >
        <IoIosArrowDropupCircle className="bg-white p-0 rounded-full text-stone-400" />
      </button>
    </div>
  ) : null;
}
