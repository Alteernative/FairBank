import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useState } from "react";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";
import StepWrapper from "./signup/StepWrapper";
import AxiosInstance from "../components/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { ModeToggle } from "../components/ModeToggle";
import { LanguageToggle } from "../components/LanguageToggle";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const onSubmit = (data) => {
    console.log(data.email);
    AxiosInstance.post(`api/password_reset/`, {
      email: data.email,
    })

      .then(() => {
        setShowMessage(true);
        toast.success(`${t("toast.passwordRequestReset.success")}`);
        setTimeout(() => {
          navigate("/");
        }, 2500);
      })
      .catch(() => {
        toast.error(`${t("toast.passwordRequestReset.error")}`);
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
          <div className="absolute right-0 top-4 m-5">
            <span className="flex items-end justify-start gap-2">
              <LanguageToggle />
              <ModeToggle />
              <Button asChild variant={"ghost"} className="ml-2">
                <Link to={"/signup"}>Devenir membre</Link>
              </Button>
            </span>
          </div>
          <h1 className="absolute left-7 top-7 font-jomhuria text-6xl lg:hidden">
            <Link to={"/"}>FairBank</Link>
          </h1>

          <Card className="h-[25rem] w-96 border-none shadow-none">
            <CardHeader>
              <CardTitle className="ml-1 text-center text-2xl">
                Réinitialisez votre mot de passe
              </CardTitle>
              <CardDescription className="text-center">
                Entrez votre courriel ci-dessous pour réinitialiser votre mot de
                passe.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-4">
                    <PasswordFields />
                    <Button type="submit" className="mt-2 select-none">
                      Soumettre
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </CardContent>
          </Card>
        </main>
      </section>
      <Toaster richColors duration={2500} />
    </>
  );
};

export default PasswordReset;
