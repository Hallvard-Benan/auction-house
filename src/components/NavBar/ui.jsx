import { Link } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

import LoginModal from "../Modals/LoginModal";
import { Button } from "../ui/button";

import { TfiMenu, TfiPlus } from "react-icons/tfi";
import { FiLogOut } from "react-icons/fi";
import { LuUser2 } from "react-icons/lu";
import RegisterModal from "../Modals/RegisterModal";
function NavBarUi({ loggedIn, visible, fixed }) {
  return (
    <nav
      className={`w-calc flex justify-between border-b-2 transition-all duration-500 ${
        visible ? "bg-white z-10" : "hidden"
      } ${fixed && visible ? "fixed w-calc" : "static"}`}
    >
      <Link to="/">
        <img
          src="./src/assets/auctionlogofirst.svg"
          alt="logo and home button"
          className="h-16"
        />
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
          <RegisterModal variant="primary"></RegisterModal>
          <LoginModal></LoginModal>
        </div>
      )}
    </nav>
  );
}

export default NavBarUi;
