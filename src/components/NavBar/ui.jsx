import { Link } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

import imageUrl from "../../assets/auctionlogofirst.svg";

import { TfiMenu, TfiPlus } from "react-icons/tfi";
import { FiLogOut } from "react-icons/fi";
import { LuUser2 } from "react-icons/lu";
import { FaPlus } from "react-icons/fa";

import LoginModal from "../Modals/LoginModal";

function NavBarUi({ loggedIn, visible, fixed, handleLogout, profileLink }) {
  return (
    <nav
      className={`w-calc bg-white fixed flex justify-between border-b-2 py-1 transition-translate-y duration-500 z-50 ${
        visible ? "" : "-translate-y-16"
      } ${fixed && visible ? "fixed w-calc z-50" : "static"}`}
    >
      <Link to="/">
        <img src={imageUrl} alt="logo and home button" className="w-[6rem] " />
      </Link>
      {loggedIn ? (
        <>
          <Link
            to="/create"
            className="flex justify-center items-center gap-1 text-x group"
          >
            <p className="font-thin text-2xl bg-primary text-primary-foreground p-2 rounded-md">
              <FaPlus />
            </p>
            <p className="hidden md:block text-base text-foreground/70 absolute top-16 bg-muted p-2 z-40 rounded-md -translate-y-10 scale-0 md:group-hover:translate-y-0 md:group-hover:scale-100 transition-all duration-200">
              Make a new listing
            </p>
          </Link>
          <div className="flex items-center w-[6rem]">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-xl">
                Menu
                <TfiMenu />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link to={profileLink}>
                  <DropdownMenuItem className=" hover:cursor-pointer">
                    <p>My Profile</p> <LuUser2></LuUser2>
                  </DropdownMenuItem>
                </Link>
                <Link to="/my-bids">
                  <DropdownMenuItem className="hover:cursor-pointer">
                    My bids
                  </DropdownMenuItem>
                </Link>

                <Link to="/my-listings">
                  <DropdownMenuItem className="hover:cursor-pointer">
                    My listings
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-700 hover:cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout <FiLogOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>{" "}
        </>
      ) : (
        <LoginModal link={"/"} />
      )}
    </nav>
  );
}

export default NavBarUi;
