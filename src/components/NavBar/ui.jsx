import { Link } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

import imageUrl from "../../assets/auctionlogofirst.svg";

import { TfiMenu } from "react-icons/tfi";
import { FiLogOut } from "react-icons/fi";
import { LuUser2 } from "react-icons/lu";
import { FaPlus } from "react-icons/fa";

import LoginModal from "../Modals/LoginModal";

function NavBarUi({
  loggedIn,
  visible,
  handleLogout,
  profileLink,
  avatar,
  userName,
  userEmail,
}) {
  return (
    <nav
      className={`w-calc rounded-full md:rounded-t-none md:rounded-b-lg  bg-white fixed grid border-b-2 py-1 px-4 transition-translate duration-500 z-50 bottom-0 md:bottom-auto ${
        visible ? "" : "md:-translate-y-full"
      }`}
    >
      <div className="flex justify-between w-full">
        <Link to="/">
          <img
            src={imageUrl}
            alt="logo and home button"
            className="w-[6rem] "
          />
        </Link>
        {loggedIn ? (
          <>
            <Link
              to="/create"
              className="flex justify-center items-center gap-1 text-x group"
            >
              <p className="font-thin text-2xl bg-accent-foreground text-primary-foreground p-2 rounded-full">
                <FaPlus />
              </p>
              <p className="hidden md:block text-base text-foreground/70 absolute top-16 bg-muted p-2 z-40 rounded-md -translate-y-10 scale-0 md:group-hover:translate-y-0 md:group-hover:scale-100 transition-all duration-200">
                Make a new listing
              </p>
            </Link>
            <div className="flex items-center justify-center w-[6rem]">
              <DropdownMenu>
                <DropdownMenuTrigger
                  data-cy="open-menu-button"
                  className="flex gap-1 items-center text-2xl"
                >
                  <TfiMenu className="" />
                  <img
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-contain"
                    src={
                      avatar
                        ? avatar
                        : "https://cdn-icons-png.flaticon.com/512/17/17004.png"
                    }
                    alt="your avatar"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-col-reverse md:flex-col ">
                  <Link to={profileLink}>
                    <DropdownMenuItem className="flex flex-col md:flex-col-reverse hover:cursor-pointer">
                      <div className="flex gap-1 items-center px-6">
                        <p>My Profile</p> <LuUser2></LuUser2>
                      </div>
                      <div className="text-muted-foreground grid justify-items-center">
                        <p>{userName}</p>
                        <p className="text-sm">{userEmail}</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </Link>
                  <Link to="/my-bids">
                    <DropdownMenuItem className="px-8 hover:cursor-pointer">
                      My bids
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <Link to="/my-listings">
                    <DropdownMenuItem className="px-8 hover:cursor-pointer">
                      My listings
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    data-cy="logout-button"
                    className="px-8 text-red-700 hover:cursor-pointer"
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
      </div>
    </nav>
  );
}

export default NavBarUi;
