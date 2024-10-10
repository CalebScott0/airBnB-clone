"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  register("email", {
    pattern: {
      // matches only letters after the . and requires at least 2 letters in the top-level domain (part after the .)
      value: /^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/,
      message: "Invalid email format",
    },
    onChange() {
      setError(null);
    },
  });

  register("password", {
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
    maxLength: {
      value: 20,
      message: "Password must be shorter than 20 characters",
    },
  });

  //   type = submit handler - with field values provides type safety for data
  //   data can only be from field values
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    // in [...nextauth].ts credentials provider is set with an email and a password
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);

      // if successful sign in
      if (callback?.ok) {
        toast.success("Logged in");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Log in to your account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        error={errors.email}
      />
      <Input
        id="password"
        label="Password"
        type="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        error={errors.password}
      />
      {error && <div className="mt-2 text-rose-500">{error}</div>}
    </div>
  );

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className="mt-4 text-center font-light text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Need to create an account?</div>
          <div
            onClick={loginModal.onClose}
            className="cursor-pointer text-neutral-800 hover:underline"
          >
            Register
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
