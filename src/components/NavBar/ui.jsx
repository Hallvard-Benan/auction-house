import { Link } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

import { Button } from "../ui/button";

import imageUrl from "../../assets/auctionlogofirst.svg";

import { TfiMenu, TfiPlus } from "react-icons/tfi";
import { FiLogOut } from "react-icons/fi";
import { LuUser2 } from "react-icons/lu";
import LoginModal from "../Modals/LoginModal";
import { useState } from "react";
function NavBarUi({ loggedIn, visible, fixed }) {
  const [modalVersion, setModalVersion] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = function (modalVersion) {
    setModalOpen(true);
    setModalVersion(modalVersion);
  };

  return (
    <nav
      className={`w-calc bg-white flex justify-between border-b-2 transition-all duration-500 ${
        visible ? "" : "-translate-y-16"
      } ${fixed && visible ? "fixed w-calc z-10" : "static"}`}
    >
      <Link to="/">
        <img src={imageUrl} alt="logo and home button" className="h-16" />
      </Link>
      {loggedIn ? (
        <>
          <Link to="/create" className="flex items-center gap-1 text-xl">
            <p>New Listing</p> <TfiPlus className="text-2xl" />
          </Link>
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-xl">
                Menu
                <TfiMenu />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <p>My Profile</p> <LuUser2></LuUser2>
                </DropdownMenuItem>
                <DropdownMenuItem>Watchlist</DropdownMenuItem>
                <DropdownMenuItem>My listings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-700">
                  Logout <FiLogOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>{" "}
        </>
      ) : (
        <div className="flex gap-2 items-center">
          <Button onClick={() => openModal("register")}>Register</Button>
          <Button variant="secondary" onClick={() => openModal("login")}>
            Login
          </Button>
          <LoginModal
            closeModal={() => setModalOpen((prev) => !prev)}
            open={modalOpen}
            type={modalVersion}
            changeModalType={() =>
              setModalVersion((prev) =>
                prev === "login" ? "register" : "login"
              )
            }
          ></LoginModal>
        </div>
      )}
    </nav>
  );
}

export default NavBarUi;
