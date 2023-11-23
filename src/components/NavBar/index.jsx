import { useState, useEffect } from "react";

import NavBarUi from "./ui";

function NavBar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fixed, setFixed] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        const currentScrollPos = window.scrollY;
        setVisible(
          (scrollPosition > currentScrollPos && window.scrollY !== 61) ||
            (currentScrollPos < 10 && window.scrollY !== 61)
        );
        setScrollPosition(currentScrollPos);
        setFixed(true);
      } else setFixed(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  return <NavBarUi loggedIn={loggedIn} visible={visible} fixed={fixed} />;
}

export default NavBar;
