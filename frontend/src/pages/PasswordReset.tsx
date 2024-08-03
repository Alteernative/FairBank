import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useState } from "react";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { FaCircleExclamation } from "react-icons/fa6";
import AxiosInstance from "../components/AxiosInstance";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { toast, Toaster } from "sonner";
import { Eye, EyeOff } from "lucide-react";
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
    <section className="flex flex-col gap-4">
      <div className="relative">
        <FloatingLabelInput
          type={passwordType}
          id="password"
          autoComplete="off"
          label="Mot de passe"
          {...register("password")}
          autoFocus
          className="h-12 pr-12"
        />
        <span className="absolute right-3 top-0 flex h-full items-center justify-center">
          <Button
            type="button"
            variant={"ghost"}
            size={"icon"}
            className="size-7 select-none rounded-full"
            onClick={handleClick}
          >
            {passwordType === "password" ? (
              <Eye size={20} />
            ) : (
              <EyeOff size={20} />
            )}
          </Button>
        </span>
      </div>
      {errors.password && (
        <span className="mb-2 flex items-center gap-1 text-xs text-destructive">
          <FaCircleExclamation />
          {errors.password.message && String(errors.password.message)}
        </span>
      )}
      <div className="relative">
        <FloatingLabelInput
          type={passwordType}
          id="re_password"
          autoComplete="off"
          label="Confirmer"
          {...register("re_password")}
          className="h-12 pr-12"
        />
        <span className="absolute right-3 top-0 flex h-full items-center justify-center">
          <Button
            type="button"
            variant={"ghost"}
            size={"icon"}
            className="size-7 select-none rounded-full"
            onClick={handleClick}
          >
            {passwordType === "password" ? (
              <Eye size={20} />
            ) : (
              <EyeOff size={20} />
            )}
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
  const { t } = useTranslation();

  const onSubmit = (data) => {
    AxiosInstance.post(`api/password_reset/confirm/`, {
      password: data.password,
      token: token,
    })
      .then((response) => {
        console.log("Response from server:", response);
        toast.success(`${t("toast.passwordReset.success")}`);
        setShowMessage(true);
        setTimeout(() => {
          navigate("/signin");
        }, 2500);
      })
      .catch((error) => {
        toast.error(`${t("toast.passwordReset.error")}`);
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
              Entrez votre nouveau mot de passe ci-dessous pour compléter la
              réinitialisation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                  <PasswordFields />
                  <Button type="submit" className="mt-2 select-none">
                    {"Soumettre"}
                  </Button>
                </div>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </main>
      <Toaster richColors duration={2500} />
    </section>
  );
};

export default PasswordReset;
