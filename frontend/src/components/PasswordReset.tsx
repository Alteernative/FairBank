import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useState } from "react";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";
import StepWrapper from "../pages/signup/StepWrapper";
import AxiosInstance from "./AxiosInstance";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { toast, Toaster } from "sonner";

const PasswordFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [passwordType, setPasswordType] = useState("password");

  const handleClick = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="relative mx-2">
        <FloatingLabelInput
          type={passwordType}
          id="password"
          label="Mot de passe"
          {...register("password")}
          autoFocus
          className="h-12 pr-11"
        />
        <span className="w-fullitems-center absolute right-3 top-0 flex h-full justify-center">
          <Button
            type="button"
            variant={"ghost"}
            size={"icon"}
            className="size-7 select-none rounded-full"
            onClick={handleClick}
          >
            {passwordType === "password" ? <FaEye /> : <FaEyeSlash />}
          </Button>
        </span>
      </div>
      {errors.password && (
        <span className="mb-2 flex items-center gap-1 text-xs text-destructive">
          <FaCircleExclamation />
          {errors.password.message && String(errors.password.message)}
        </span>
      )}
      <div className="relative mx-2">
        <FloatingLabelInput
          type={passwordType}
          id="re_password"
          label="Confirmer"
          {...register("re_password")}
          className="h-12 pr-11"
        />
        <span className="absolute right-3 top-0 flex h-full items-center justify-center">
          <Button
            type="button"
            variant={"ghost"}
            size={"icon"}
            className="size-7 select-none rounded-full"
            onClick={handleClick}
          >
            {passwordType === "password" ? <FaEye /> : <FaEyeSlash />}
          </Button>
        </span>
      </div>
      {errors.re_password && (
        <span className="flex items-center gap-1 text-xs text-destructive">
          <FaCircleExclamation />
          {errors.re_password.message && String(errors.re_password.message)}
        </span>
      )}
    </section>
  );
};

const PasswordReset = () => {
  const methods = useForm();
  const { token } = useParams();
  const [ShowMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    AxiosInstance.post(`api/password_reset/confirm/`, {
      password: data.password,
      token: token,
    })
      .then((response) => {
        console.log("Response from server:", response);
        toast.success("Le mot de passe a été reinitializé avec succès .");
        setShowMessage(true);
        setTimeout(() => {
          navigate("/connexion");
        }, 3000);
      })
      .catch((error) => {
        toast.error("Echec de la reinitialization du mot de passe");
        console.error("Error during form submission:", error);
      });
  };

  return (
    <section className="flex h-screen">
      <aside className="hidden w-full flex-1 flex-col bg-[#efeee6] lg:flex">
        <Link to={"/"} className="ml-8 mt-7 flex items-center">
          <h1 className="font-jomhuria text-6xl">FairBank</h1>
        </Link>
        <img
          src="/login.svg"
          alt="Sign in image"
          className="my-auto w-full content-center overflow-hidden"
        />
      </aside>
      <main className="flex w-80 flex-1 items-center justify-center bg-white">
        <h1 className="absolute left-7 top-7 font-jomhuria text-6xl lg:hidden">
          <Link to={"/"}>FairBank</Link>
        </h1>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Card className="h-[25rem] w-96 border shadow-md">
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  {"Reinisialisez votre mot de passe"}
                </CardTitle>
                <CardDescription className="text-center">
                  {"veuillez entrez votre nouveau mot de passe, il doit "}
                </CardDescription>
              </CardHeader>
              <PasswordFields />
              <div className="mt-6 flex justify-center justify-items-center">
                <Button type="submit" className="flex">
                  {"Soumettre"}
                </Button>
              </div>
            </Card>
          </form>
        </FormProvider>
      </main>
      <Toaster richColors />
    </section>
  );
};

export default PasswordReset;
