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
      description="Entrer un mot de passe ci-dessous pour créer votre compte."
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
            id="rePassword"
            label="Confirmer"
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
        {errors.rePassword && (
          <span className="mb-2 flex items-center gap-1 text-xs text-destructive">
            <FaCircleExclamation />
            {errors.rePassword.message && String(errors.rePassword.message)}
          </span>
        )}

        {/* Checkbox Show/Hide password */}
        {/* <div className="flex items-center gap-2">
          <Checkbox id="show-password" onClick={handleClick} />
          <label htmlFor="show-password" className="text-sm font-medium">
            Afficher le mot de passe
          </label>
        </div> */}
      </section>
    </StepWrapper>
  );
}
