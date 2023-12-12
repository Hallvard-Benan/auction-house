import { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import NavBarUi from "./ui";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

function NavBar() {
  const { isLoggedIn, logout, authUser } = useAuth();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fixed, setFixed] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (authUser && isLoggedIn) {
      const nameOfUser = authUser.name;
      setUserName(nameOfUser);
    }
  }, [authUser, isLoggedIn]);

  useEffect(() => {
    const handleScroll = () => {
      console.log("scrolling", window.scrollY);
      if (window.scrollY > 60) {
        const currentScrollPos = window.scrollY;
        setVisible(
          (scrollPosition > currentScrollPos && window.scrollY !== 20) ||
            (currentScrollPos < 10 && window.scrollY !== 20)
        );
        setScrollPosition(currentScrollPos);
        setFixed(true);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

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

  const profileLink = `/profile?name=${userName}`;

  return (
    <NavBarUi
      profileLink={profileLink}
      loggedIn={isLoggedIn}
      visible={visible}
      fixed={fixed}
      handleLogout={handleLogout}
    />
  );
}

export default NavBar;
