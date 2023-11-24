import { useState } from "react";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import RegisterModal from "./RegisterModal";

function LoginModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Log in</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log in</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="">
              Email
            </Label>
            <Input
              id="email"
              placeHolder="Email@stud.noroff.no"
              className="col-span-4"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="">
              Password
            </Label>
            <Input
              id="password"
              placeHolder="Password"
              className="col-span-4"
            />
          </div>
        </div>
        <DialogFooter className="grid gap-6 grid-cols-2">
          <Button type="submit" className="col-span-2">
            Log in
          </Button>
          <div className="flex col-span-2 items-center gap-2">
            Not a user?
            <Button>Sign up</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
