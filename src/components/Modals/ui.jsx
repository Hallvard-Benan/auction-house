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
import Spinner from "../ui/spinner";

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
  const [nameSuccess, setNameSuccess] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState(false);

  const [avatar, setAvatar] = useState("");
  const [avatarDescription, setAvatarDescription] = useState(
    "Url to a publicly available image"
  );
  const [avatarError, setAvatarError] = useState("");
  const [avatarSuccess, setAvatarSuccess] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const verifiedRegister =
    validateAvatar(avatar) &&
    validateEmail(email) &&
    !avatarError &&
    validatePassword(password);

  const verifiedLogin = validateEmail(email) && validatePassword(password);

  const handleOnValidate = async (input) => {
    if (input === "email" || input === "emailRegister") {
      if (!validateEmail(email)) {
        setEmailError("Email must end in @stud.noroff.no.");
        setEmailSuccess(false);
        return;
      } else {
        setEmailError("");
        setEmailSuccess(true);
      }
    } else if (input === "name" || input === "nameRegister") {
      if (!validateName(name)) {
        setNameError(
          "Name must not contain punctuation symbols apart from underscore (_)"
        );
        setNameSuccess(false);
      } else {
        setNameError("");
        setNameSuccess(true);
      }
    } else if (input === "avatarRegister" && avatar.length > 0) {
      setAvatarDescription("Checking image source...");
      const validatedImageUrl = await validateAvatar(avatar);
      if (!validatedImageUrl) {
        setAvatarDescription("");
        setAvatarError("Avatar must be a link to a publicly available image");
        setAvatarSuccess(false);
      } else {
        setAvatarDescription("Avatar validated");
        setAvatarError("");
        setAvatarSuccess(true);
      }
    } else if (input === "password" || input === "passwordRegister") {
      if (!validatePassword(password)) {
        setPasswordError("Password must be at least 8 characters");
        setPasswordSuccess(false);
      } else {
        setPasswordError("");
        setPasswordSuccess(true);
      }
    } else if (input === "avatarRegister" && avatar.length === 0) {
      setAvatarSuccess(false);
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
      success: emailSuccess,
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
      success: passwordSuccess,
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
      success: nameSuccess,
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
      success: emailSuccess,
      value: email,
      onChange: (e) => {
        setEmail(e.target.value);
        setEmailError("");
      },
    },
    {
      index: 3,
      label: "Profile picture",
      id: "avatarRegister",
      placeholder: "https://www.image.jpg",
      required: false,
      errorMessage: avatarError,
      success: avatarSuccess,
      description: avatarDescription,
      value: avatar,
      onChange: (e) => {
        setAvatar(e.target.value);
        setAvatarError("");
      },
    },
    {
      index: 4,
      label: "Password",
      success: passwordSuccess,
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
  ];

  return (
    <Dialog open={open} onEscapeKeyPress={() => closeModal()}>
      {type === "login" && open ? (
        <DialogContent className="sm:max-w-[425px]  max-h-[100vh] overflow-y-auto">
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
          <form
            onSubmit={handleOnSubmitLogin}
            className="grid overflow-y-scroll"
          >
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
                  success,
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
                    success={success}
                    errorMessage={errorMessage}
                    value={value}
                    onChange={onChange}
                  />
                )
              )}
            </div>
            <div className="text-destructive">{error}</div>
            <Button disabled={!verifiedLogin} type="submit" className="">
              {loading ? <Spinner></Spinner> : "Log in"}
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
        <DialogContent
          data-state="open"
          className="sm:max-w-[425px] max-h-[100vh] overflow-y-auto"
        >
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
          <form onSubmit={handleOnSubmitRegister} className="grid">
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
                  description,
                  success,
                  onChange,
                }) => (
                  <InputGroup
                    onBlur={() => handleOnValidate(id)}
                    key={index}
                    label={label}
                    description={description}
                    id={id}
                    value={value}
                    required={required}
                    success={success}
                    placeholder={placeholder}
                    type={type}
                    errorMessage={errorMessage}
                    onChange={onChange}
                  />
                )
              )}
            </div>
            <div className="text-destructive">{error}</div>
            <Button type="submit" disabled={!verifiedRegister}>
              {loading ? <Spinner></Spinner> : "Register"}
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
