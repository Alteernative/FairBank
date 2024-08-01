import { Button } from "@/components/ui/button";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import StepWrapper from "./StepWrapper";
import { CircleAlert, Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function PasswordForm() {
  const { t } = useTranslation();
  const [passwordType, setPasswordType] = useState("password");
  const {
    register,
    formState: { errors },
    clearErrors,
  } = useFormContext();

  const handleClick = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  return (
    <StepWrapper
      title={t("signUp.password.title")}
      description={t("signUp.password.description")}
    >
      <section className="flex flex-col gap-4">
        <div className="relative">
          <FloatingLabelInput
            type={passwordType}
            id="password"
            autoComplete="off"
            label={t("input.password")}
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
            <CircleAlert size={20} />
            {errors.password.message && String(errors.password.message)}
          </span>
        )}
        <div className="relative">
          <FloatingLabelInput
            type={passwordType}
            id="re_password"
            autoComplete="off"
            label={t("input.confirm")}
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
              {passwordType === "password" ? (
                <Eye size={20} />
              ) : (
                <EyeOff size={20} />
              )}
            </Button>
          </span>
        </div>
        {errors.re_password && (
          <span className="mb-2 flex items-center gap-1 text-xs text-destructive">
            <CircleAlert size={20} />
            {errors.re_password.message && String(errors.re_password.message)}
          </span>
        )}
      </section>
    </StepWrapper>
  );
}
