import { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import NavBarUi from "./ui";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

function NavBar() {
  const { isLoggedIn, logout, authUser } = useAuth();
  const [visible, setVisible] = useState(true);
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userCredits, setUserCredits] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (authUser) {
      setUserName(authUser.name);
      setAvatar(authUser.avatar);
      setUserCredits(authUser.credits);
    }
  }, [authUser]);

  // To handle scroll effect
  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > 60) {
        setVisible(prevScrollPos > currentScrollPos);
      } else {
        setVisible(true);
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call it once to set the initial state

    // Return the cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("access_token");
    navigate({ to: "/" });
    queryClient.invalidateQueries({ queryKey: ["listings"] });
  };

  const profileLink = `/profile?name=${userName}`;

  return (
    <NavBarUi
      avatar={avatar}
      userCredits={userCredits}
      profileLink={profileLink}
      userName={userName}
      loggedIn={isLoggedIn}
      visible={visible}
      handleLogout={handleLogout}
    />
  );
}

export default NavBar;
