import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FaEdit } from "react-icons/fa";
import { X } from "lucide-react";
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
      <div className="grid justify-items-center md:justify-items-stretch md:grid-cols-2 gap-2">
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
                <form className="flex gap-1 md:h-12" onSubmit={onSubmitAvatar}>
                  <Input
                    defaultValue={avatar}
                    type="text"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setNewAvatar(e.target.value);
                    }}
                    placeholder="Image URL"
                    name="avatarUrl"
                    className="h-full md:w-64"
                  />
                  <Button className="h-full" type="submit">
                    Submit change
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="grid gap-2">
          <h1 className="text-3xl md:text-4xl break-all">{name}</h1>
          <div>
            <p>
              Available Credits:{" "}
              <span className="text-lg font-medium">${credits}</span>
            </p>
            <p>
              Wins: <span className="text-lg font-medium">{wins.length}</span>
            </p>
            <p>
              Listings{" "}
              <span className="text-lg font-medium">{_count.listings}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUi;
