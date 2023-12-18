import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../lib/api";
import { registerUser } from "../../lib/api";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useAuth } from "../../Context/AuthContext";
import { toast } from "sonner";

import LoginModalUi from "./ui";

function LoginModal({ link }) {
  const queryClient = useQueryClient();
  const [modalVersion, setModalVersion] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const { login } = useAuth();

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
    onError: (res) => {
      if (res.response.status === 401) {
        setError(
          "Failed to login. please check that your email and password are correct"
        );
      } else {
        setError("Something went wrong, please try again", res.message);
      }
      setIsLoading(false);
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (res) => {
      setIsLoading(false);
      toast.success(`Welcome back, ${res.name}`, { duration: 2000 });
      closeModal();
      login(res);
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
  });

  const registerUserMutation = useMutation({
    mutationFn: registerUser,
    onError: (res) => {
      setIsLoading(false);
      setError(res.message);
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      toast.success("Registration successful!", { duration: 2000 });
      setIsLoading(false);
      setModalVersion("login");
    },
  });

  const handleOnSubmitRegister = function (event) {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.emailRegister.value;
    const password = event.target.passwordRegister.value;
    const avatar = event.target.avatarRegister.value;

    registerUserMutation.mutate({
      name,
      email,
      password,
      avatar,
    });
  };

  const handleOnSubmitLogin = async function (event) {
    event.preventDefault();
    loginUserMutation.mutate({
      email: event.target.email.value,
      password: event.target.password.value,
    });
  };

  return (
    <div className="flex gap-2 items-center">
      <Button onClick={() => openModal("register")}>Register</Button>
      <Button
        data-cy="open-login-form"
        variant="secondary"
        onClick={() => openModal("login")}
      >
        Login
      </Button>
      <LoginModalUi
        type={modalVersion}
        changeModalType={changeModalType}
        handleOnSubmitLogin={handleOnSubmitLogin}
        closeModal={closeModal}
        open={modalOpen}
        error={error}
        loading={loading}
        handleOnSubmitRegister={handleOnSubmitRegister}
      />
    </div>
  );
}

export default LoginModal;
