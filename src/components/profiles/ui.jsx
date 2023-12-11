import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FaEdit } from "react-icons/fa";
import { Label } from "../ui/label";
import { X } from "lucide-react";
import { FaCheck } from "react-icons/fa";

import {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogContent,
} from "../ui/dialog";
import { useState } from "react";

function ProfileUi({
  name,
  avatar,
  credits,
  wins,
  _count,
  myProfile,
  onSubmitAvatar,
}) {
  const [newAvatar, setNewAvatar] = useState(avatar);

  return (
    <div className="max-w-full grid gap-4 overflow-hidden">
      <div className="grid md:flex md:justify-center gap-2 md:gap-4">
        <div className="grid gap-2 justify-items-center">
          <img
            src={
              avatar
                ? avatar
                : "https://cdn-icons-png.flaticon.com/512/17/17004.png"
            }
            alt=""
            className={` h-44 rounded-lg md:h-72 transition-opacity duration-200 `}
          />
          {myProfile && (
            <Dialog>
              <DialogTrigger>
                <Button className="flex gap-1">
                  Edit profile image <FaEdit />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <div className="flex justify-end">
                  <DialogClose>
                    <X></X>
                  </DialogClose>
                </div>
                <div className="w-full h-96">
                  <img
                    className="object-contain"
                    src={newAvatar}
                    alt="new avatar"
                  />
                </div>
                <form className="grid gap-3" onSubmit={onSubmitAvatar}>
                  <Label htmlFor="avatarUrl">Image url:</Label>
                  <Input
                    defaultValue={avatar}
                    type="text"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setNewAvatar(e.target.value);
                    }}
                    placeholder="Image URL"
                    name="avatarUrl"
                    className="h-10 md:h-14"
                  />
                  <div className="flex justify-between h-10 md:h-14">
                    <DialogClose>
                      <Button
                        className="h-full bg-muted text-destructive hover:bg-destructive/10"
                        type="button"
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button className="h-full flex gap-2 group" type="submit">
                      <p>Confirm change</p>
                      <p className="group-hover:text-green-400 transition-all duration-200">
                        <FaCheck />
                      </p>
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="flex flex-col justify-center gap-4">
          <h1 className="text-4xl md:text-5xl break-all text-center md:w-[400px]">
            {name}
          </h1>
          <div className="bg-white rounded-lg p-4 flex justify-evenly gap-16 md:gap-20 mx-auto">
            <div>
              <p className="text-lg font-medium text-center md:text-xl">
                {_count.listings}
              </p>
              <p className="text-muted-foreground text-sm md:text-base">
                Listings
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-center md:text-xl">
                ${credits}
              </p>
              <p className="text-muted-foreground text-sm md:text-base">
                Credits
              </p>
            </div>
            <div>
              <p className="text-lg md:text-xl font-medium text-center">
                {wins.length}
              </p>
              <p className="text-muted-foreground text-sm md:text-base">Wins</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUi;
