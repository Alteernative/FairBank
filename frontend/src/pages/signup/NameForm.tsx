import { useFormContext } from "react-hook-form";
import StepWrapper from "./StepWrapper";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { CircleAlert } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function NameForm() {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    clearErrors,
  } = useFormContext();
  return (
    <StepWrapper
      title={t("signUp.name.title")}
      description={t("signUp.name.description")}
    >
      <section className="flex flex-col gap-4">
        <FloatingLabelInput
          type="text"
          id="first_name"
          label={t("input.firstName")}
          autoFocus
          className="h-12"
          {...register("first_name")}
          onChange={() => clearErrors("first_name")}
        />
        {errors.first_name && (
          <span className="mb-2 flex items-center gap-1 text-xs text-destructive">
            <CircleAlert size={20} />
            {errors.first_name.message && String(errors.first_name.message)}
          </span>
        )}
        <FloatingLabelInput
          type="text"
          id="last_name"
          label={t("input.lastName")}
          {...register("last_name")}
          className="h-12"
          onChange={() => clearErrors("last_name")}
        />
        {errors.last_name && (
          <span className="mb-2 flex items-center gap-1 text-xs text-destructive">
            <CircleAlert size={20} />
            {errors.last_name.message && String(errors.last_name.message)}
          </span>
        )}
      </section>
    </StepWrapper>
  );
}
