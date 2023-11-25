import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../lib/api";
import { registerUser } from "../../lib/api";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

import LoginModalUi from "./ui";

function LoginModal() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [modalVersion, setModalVersion] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const changeModalType = function (type) {
    setModalVersion(type);
  };

  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === "Escape" && modalOpen) {
        setModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, [modalOpen]);

  const openModal = function (versionToChangeTo) {
    setModalVersion(versionToChangeTo);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      window.localStorage.setItem("access_token", res.accessToken);
      console.log("success>>>", res.accessToken);
      queryClient.invalidate("listings");
      navigate({ to: "/" });
      closeModal();
    },
  });

  const registerUserMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (res) => {
      console.log("registered successfully", res);
      setModalVersion("login");
    },
  });

  const handleOnSubmitRegister = function (event) {
    event.preventDefault();

    registerUserMutation.mutate({
      email: event.target.email.value,
      name: event.target.name.value,
      password: event.target.password.value,
      avatar: event.target.avatar.value,
    });
  };

  const handleOnSubmitLogin = function (event) {
    event.preventDefault();

    loginUserMutation.mutate({
      email: event.target.email.value,
      password: event.target.password.value,
    });
  };

  if (loginUserMutation.isError)
    return <div>{loginUserMutation.error.message}</div>;

  if (registerUserMutation.isError)
    return <div> {registerUserMutation.error.message}</div>;

  if (loginUserMutation.isPending || registerUserMutation.isPending)
    return <div>loading...</div>;

  return (
    <div className="flex gap-2 items-center">
      <Button onClick={() => openModal("register")}>Register</Button>
      <Button variant="secondary" onClick={() => openModal("login")}>
        Login
      </Button>
      <LoginModalUi
        type={modalVersion}
        changeModalType={changeModalType}
        handleOnSubmitLogin={handleOnSubmitLogin}
        closeModal={closeModal}
        open={modalOpen}
        handleOnSubmitRegister={handleOnSubmitRegister}
      />
    </div>
  );
}

export default LoginModal;
