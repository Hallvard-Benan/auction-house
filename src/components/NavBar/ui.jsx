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

function NavBarUi({ loggedIn, visible, fixed, handleLogout, profileLink }) {
  return (
    <nav
      className={`w-calc bg-white flex justify-between border-b-2 transition-translate-y duration-500 ${
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
        <LoginModal />
      )}
    </nav>
  );
}

export default NavBarUi;
