import { useFormContext } from "react-hook-form";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { CircleAlert } from "lucide-react";
import StepWrapper from "./StepWrapper";
import { useTranslation } from "react-i18next";

export default function EmailForm() {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    clearErrors,
  } = useFormContext();

  return (
    <StepWrapper
      title={t("signUp.email.title")}
      description={t("signUp.email.description")}
    >
      <section className="flex flex-col gap-4">
        <FloatingLabelInput
          type="text"
          id="email"
          label={t("input.email")}
          autoFocus
          {...register("email")}
          className="h-12"
          onChange={() => clearErrors("email")}
        />
        {errors.email && (
          <span className="flex items-center gap-1 text-xs text-destructive">
            <CircleAlert size={20} />
            {errors.email.message && String(errors.email.message)}
          </span>
        )}
      </section>
    </StepWrapper>
  );
}
