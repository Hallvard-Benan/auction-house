import { Button } from "../ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import LoginModal from "./LoginModal";

function RegisterModal({ variant }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Register</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register a new account</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="">
              Name
            </Label>
            <Input id="name" placeHolder="Username" className="col-span-4" />
          </div>
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="avatar" className="">
              Avatar image:
            </Label>
            <Input id="avatar" placeHolder="image url" className="col-span-4" />
          </div>
        </div>
        <DialogFooter className="grid gap-6 grid-cols-2">
          <Button type="submit" className="col-span-2">
            Register
          </Button>
          <div className="flex col-span-2 items-center gap-2">
            Already a user?
            <LoginModal variant="secondary">Log in</LoginModal>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RegisterModal;
