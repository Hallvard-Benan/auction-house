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
import LoginModal from "../Modals/LoginModal";

function NavBarUi({ loggedIn, visible, fixed }) {
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
        <LoginModal />
      )}
    </nav>
  );
}

export default NavBarUi;
