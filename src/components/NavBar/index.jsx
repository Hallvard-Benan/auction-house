import { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import NavBarUi from "./ui";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

function NavBar() {
  const { isLoggedIn, logout } = useAuth();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fixed, setFixed] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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

  const handleLogout = () => {
    logout();
    localStorage.removeItem("access_token");
    navigate({ to: "/" });
    queryClient.invalidateQueries({ queryKey: ["listings"] });
  };

  return (
    <NavBarUi
      loggedIn={isLoggedIn}
      visible={visible}
      fixed={fixed}
      handleLogout={handleLogout}
    />
  );
}

export default NavBar;
