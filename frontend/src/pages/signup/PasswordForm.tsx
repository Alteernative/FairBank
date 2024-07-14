import { Button } from "@/components/ui/button";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import StepWrapper from "./StepWrapper";
import { FaCircleExclamation } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordForm() {
  const {
    register,
    formState: { errors },
    clearErrors,
  } = useFormContext();
  const [passwordType, setPasswordType] = useState("password");
  const handleClick = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  return (
    <StepWrapper
      title="Mot de passe"
      description="Entrez un mot de passe ci-dessous pour créer votre compte."
    >
      <section className="flex flex-col gap-4">
        <div className="relative">
          <FloatingLabelInput
            type={passwordType}
            id="password"
            label="Mot de passe"
            {...register("password")}
            autoFocus
            className="h-12 pr-11"
            onChange={() => clearErrors("password")}
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
            label="Confirmer"
            {...register("re_password")}
            className="h-12 pr-11"
            onChange={() => clearErrors("re_password")}
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
          <span className="mb-2 flex items-center gap-1 text-xs text-destructive">
            <FaCircleExclamation />
            {errors.re_password.message && String(errors.re_password.message)}
          </span>
        )}
      </section>
    </StepWrapper>
  );
}
