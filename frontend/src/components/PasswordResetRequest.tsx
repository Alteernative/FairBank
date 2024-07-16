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
import { Toaster, toast } from "sonner";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

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
    <section className="ml-2 mr-2 flex flex-col gap-4">
      <div className="relative">
        <FloatingLabelInput
          type="email"
          id="email"
          label="Courriel"
          {...register("email")}
          className="h-12"
          autoFocus
        />
      </div>
    </section>
  );
};

const PasswordReset = () => {
  const methods = useForm();
  const { token } = useParams();
  const [ShowMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data.email);
    AxiosInstance.post(`api/password_reset/`, {
      email: data.email,
    })

      .then(() => {
        setShowMessage(true);
        toast.success("Un couriel de reinitisalisation a été envoyé.");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch(() => {
        toast.error("Le compte que vous essayer d'initializer n'existe pas");
      });
  };

  return (
    <>
      <section className="flex h-screen">
        <aside className="hidden w-full flex-1 flex-col bg-[#efeee6] dark:bg-stone-800 lg:flex">
          <Link to={"/"} className="ml-8 mt-7 flex items-center">
            <h1 className="font-jomhuria text-6xl">FairBank</h1>
          </Link>
          <img
            src="/images/login.svg"
            alt="Sign in image"
            className="my-auto w-full content-center overflow-hidden"
          />
        </aside>
        <main className="flex w-80 flex-1 items-center justify-center">
          <Button
            asChild
            variant={"ghost"}
            className="absolute right-0 top-0 m-5"
          >
            <Link to={"/inscription"}>Devenir membre</Link>
          </Button>
          <h1 className="absolute left-7 top-7 font-jomhuria text-6xl lg:hidden">
            <Link to={"/"}>FairBank</Link>
          </h1>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Card className="h-[19rem] w-96 border shadow-md">
                <CardHeader>
                  <CardTitle className="ml-1 text-center text-2xl">
                    {"Reinisialisez votre mot de passe"}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {"veuillez entrez votre adresse courriel"}
                  </CardDescription>
                </CardHeader>
                <PasswordFields />
                <div className="mt-2 flex w-full items-center justify-center">
                  <Button type="submit" className="mt-2">
                    {"Demandez un nouveau mot de passe"}
                  </Button>
                </div>
              </Card>
            </form>
          </FormProvider>
        </main>
      </section>
      <Toaster richColors />
    </>
  );
};

export default PasswordReset;
