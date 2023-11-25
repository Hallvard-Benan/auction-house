import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function LoginModalUi({
  type,
  open,
  closeModal,
  handleOnSubmitLogin,
  handleOnSubmitRegister,
  changeModalType,
}) {
  return (
    <Dialog open={open} onEscapeKeyPress={() => closeModal()}>
      {type === "login" && open ? (
        <DialogContent className="sm:max-w-[425px]">
          <DialogPrimitive.Close
            onClick={() => closeModal()}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
          <DialogHeader>
            <DialogTitle>Log in</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleOnSubmitLogin}>
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
            <Button type="submit" className="col-span-2">
              Log in
            </Button>
          </form>
          <DialogFooter className="grid gap-6 grid-cols-2">
            <div className="flex col-span-2 items-center gap-2">
              Not a user?
              <Button onClick={() => changeModalType("register")}>
                Sign up
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      ) : (
        <DialogContent data-state="open" className="sm:max-w-[425px]">
          <DialogPrimitive.Close
            onClick={() => closeModal()}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
          <DialogHeader>
            <DialogTitle>Register a new account</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleOnSubmitRegister}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="">
                  Name
                </Label>
                <Input
                  id="name"
                  placeHolder="Username"
                  className="col-span-4"
                />
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
                <Input
                  id="avatar"
                  placeHolder="image url"
                  className="col-span-4"
                />
              </div>
            </div>
            <Button type="submit" className="col-span-2">
              Register
            </Button>
          </form>
          <DialogFooter className="grid gap-6 grid-cols-2">
            <div className="flex col-span-2 items-center gap-2">
              Already a user?
              <Button
                variant="secondary"
                onClick={() => changeModalType("login")}
              >
                Log in
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default LoginModalUi;
