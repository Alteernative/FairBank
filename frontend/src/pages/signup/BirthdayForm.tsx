import { Controller, useFormContext } from "react-hook-form";
import StepWrapper from "./StepWrapper";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleAlert } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function BirthdayForm() {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    control,
    clearErrors,
  } = useFormContext();

  return (
    <StepWrapper
      title={t("signUp.birthday.title")}
      description={t("signUp.birthday.description")}
    >
      <section className="flex flex-col gap-4">
        <FloatingLabelInput
          type="text"
          id="birth_year"
          label={t("input.year")}
          maxLength={4}
          autoFocus
          className="h-12"
          {...register("birth_year")}
          onChange={() => clearErrors("birth_year")}
        />
        {errors.birth_year && (
          <span className="mb-2 flex items-center gap-1 text-xs text-destructive">
            <CircleAlert size={20} />
            {errors.birth_year.message && String(errors.birth_year.message)}
          </span>
        )}

        <Controller
          name="birth_month"
          control={control}
          rules={{ required: "Le mois de naissance est requis" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder={t("input.month")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{t("input.month")}</SelectLabel>
                  <SelectItem value="01">
                    {t("signUp.birthday.month.1")}
                  </SelectItem>
                  <SelectItem value="02">
                    {t("signUp.birthday.month.2")}
                  </SelectItem>
                  <SelectItem value="03">
                    {t("signUp.birthday.month.3")}
                  </SelectItem>
                  <SelectItem value="04">
                    {t("signUp.birthday.month.4")}
                  </SelectItem>
                  <SelectItem value="05">
                    {t("signUp.birthday.month.5")}
                  </SelectItem>
                  <SelectItem value="06">
                    {t("signUp.birthday.month.6")}
                  </SelectItem>
                  <SelectItem value="07">
                    {t("signUp.birthday.month.7")}
                  </SelectItem>
                  <SelectItem value="08">
                    {t("signUp.birthday.month.8")}
                  </SelectItem>
                  <SelectItem value="09">
                    {t("signUp.birthday.month.9")}
                  </SelectItem>
                  <SelectItem value="10">
                    {t("signUp.birthday.month.10")}
                  </SelectItem>
                  <SelectItem value="11">
                    {t("signUp.birthday.month.11")}
                  </SelectItem>
                  <SelectItem value="12">
                    {t("signUp.birthday.month.12")}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.birth_month && (
          <span className="mb-2 flex items-center gap-1 text-xs text-destructive">
            <CircleAlert size={20} />
            {errors.birth_month.message && String(errors.birth_month.message)}
          </span>
        )}

        <FloatingLabelInput
          type="text"
          id="birth_day"
          label={t("input.day")}
          maxLength={2}
          className="h-12"
          {...register("birth_day")}
          onChange={() => clearErrors("birth_day")}
        />
        {errors.birth_day && (
          <span className="mb-2 flex items-center gap-1 text-xs text-destructive">
            <CircleAlert size={20} />
            {errors.birth_day.message && String(errors.birth_day.message)}
          </span>
        )}
      </section>
    </StepWrapper>
  );
}
