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
import InputGroup from "../ui/InputGroup";
import { useState } from "react";
import {
  validateName,
  validateAvatar,
  validateEmail,
  validatePassword,
} from "/src/lib/validation";

function LoginModalUi({
  type,
  open,
  closeModal,
  handleOnSubmitLogin,
  handleOnSubmitRegister,
  changeModalType,
  loading,
  error,
}) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [avatar, setAvatar] = useState("");
  const [avatarError, setAvatarError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [passwordRepeatError, setPasswordRepeatError] = useState("");

  const handleOnValidate = (input) => {
    console.log(input);
    if (input === "email" || input === "emailRegister") {
      if (!validateEmail(email)) {
        setEmailError("Email must end in @stud.noroff.no.");
        return;
      } else {
        setEmailError("");
      }
    } else if (input === "name" || input === "nameRegister") {
      if (!validateName(name)) {
        setNameError(
          "Name must not contain punctuation symbols apart from underscore (_)"
        );
      } else {
        setNameError("");
      }
    } else if (input === "avatarRegister") {
      if (!validateAvatar(avatar)) {
        setAvatarError(
          "avatar must be a link to a publicly available image, ending in .jpg, .png etc "
        );
      } else {
        setAvatarError("");
      }
    } else if (input === "password" || input === "passwordRegister") {
      if (!validatePassword(password)) {
        setPasswordError("Password must be at least 8 characters");
      } else {
        setPasswordError("");
      }
    } else if (input === "passwordRepeat") {
      if (password !== passwordRepeat) {
        setPasswordRepeatError("Passwords do not match");
      } else {
        setPasswordRepeatError("Passwords do not match");
      }
    }
  };

  const loginFormInputs = [
    {
      index: 1,
      label: "Email",
      id: "email",
      type: "email",
      errorMessage: emailError,
      placeholder: "...@stud.noroff.no",
      required: true,
      value: email,
      onChange: (e) => {
        setEmail(e.target.value);
        setEmailError("");
      },
    },
    {
      index: 2,
      label: "Password",
      id: "password",
      placeholder: "********",
      required: true,
      type: "password",
      value: password,
      errorMessage: passwordError,
      onChange: (e) => {
        setPassword(e.target.value);
        setPasswordError("");
      },
    },
  ];

  const registerFormInputs = [
    {
      index: 1,
      label: "Name",
      id: "nameRegister",
      placeholder: "Your username",
      required: true,
      errorMessage: nameError,
      value: name,
      onChange: (e) => {
        setName(e.target.value);
        setNameError("");
      },
    },
    {
      index: 2,
      label: "Email",
      id: "emailRegister",
      type: "email",
      placeholder: "...@stud.noroff.no",
      required: true,
      errorMessage: emailError,
      value: email,
      onChange: (e) => {
        setEmail(e.target.value);
        setEmailError("");
      },
    },
    {
      index: 3,
      label: "Avatar",
      id: "avatarRegister",
      placeholder: "URL to your avatar image",
      required: false,
      errorMessage: avatarError,
      value: avatar,
      onChange: (e) => {
        setAvatar(e.target.value);
        setAvatarError("");
      },
    },
    {
      index: 4,
      label: "Password",
      id: "passwordRegister",
      placeholder: "********",
      type: "password",
      required: true,
      value: password,
      errorMessage: passwordError,
      onChange: (e) => {
        setPassword(e.target.value);
        setPasswordError("");
      },
    },
    {
      index: 5,
      label: "Repeat Password",
      id: "passwordRepeat",
      placeholder: "********",
      type: "password",
      required: true,
      value: passwordRepeat,
      errorMessage: passwordRepeatError,
      onChange: (e) => {
        setPasswordRepeat(e.target.value);
        setPasswordRepeatError("");
      },
    },
  ];

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
          <form onSubmit={handleOnSubmitLogin} className="grid">
            <div className="grid gap-4 py-4">
              {loginFormInputs.map(
                ({
                  label,
                  id,
                  required,
                  placeholder,
                  type,
                  index,
                  errorMessage,
                  value,
                  onChange,
                }) => (
                  <InputGroup
                    onBlur={() => handleOnValidate(id)}
                    key={index}
                    label={label}
                    id={id}
                    required={required}
                    placeholder={placeholder}
                    type={type}
                    errorMessage={errorMessage}
                    value={value}
                    onChange={onChange}
                  />
                )
              )}
            </div>
            <div className="text-destructive">{error}</div>
            <Button type="submit" className="">
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
            <div className="grid gap-6 py-4">
              {registerFormInputs.map(
                ({
                  label,
                  id,
                  required,
                  placeholder,
                  type,
                  index,
                  errorMessage,
                  value,
                  onChange,
                }) => (
                  <InputGroup
                    onBlur={() => handleOnValidate(id)}
                    key={index}
                    label={label}
                    id={id}
                    value={value}
                    required={required}
                    placeholder={placeholder}
                    type={type}
                    errorMessage={errorMessage}
                    onChange={onChange}
                  />
                )
              )}
            </div>
            <div className="text-destructive">{error}</div>
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
