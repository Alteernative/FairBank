import { Controller, useFormContext } from "react-hook-form";
import StepWrapper from "./StepWrapper";
import { FaCircleExclamation } from "react-icons/fa6";
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

export default function BirthdayForm({ isLastStep }: { isLastStep: boolean }) {
  const {
    register,
    formState: { errors },
    control,
    clearErrors,
  } = useFormContext();

  return (
    <StepWrapper
      // title="Renseignement de base"
      title="Date de naissance"
      description="Entrer votre date de naissance et pays ci-dessous pour créer votre compte."
      isLastStep={isLastStep}
    >
      <section className="flex flex-col gap-4">
        <FloatingLabelInput
          type="text"
          id="birthday_year"
          label="Année"
          maxLength={4}
          autoFocus
          className="h-12"
          {...register("birthday_year")}
          onChange={() => clearErrors("birthday_year")}
        />
        {errors.birthday_year && (
          <span className="mb-2 flex items-center gap-1 text-xs text-destructive">
            <FaCircleExclamation />
            {errors.birthday_year.message &&
              String(errors.birthday_year.message)}
          </span>
        )}

        <Controller
          name="birthday_month"
          control={control}
          rules={{ required: "Le mois de naissance est requis" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Mois" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="01">Janvier</SelectItem>
                  <SelectItem value="02">Février</SelectItem>
                  <SelectItem value="03">Mars</SelectItem>
                  <SelectItem value="04">Avril</SelectItem>
                  <SelectItem value="05">Mai</SelectItem>
                  <SelectItem value="06">Juin</SelectItem>
                  <SelectItem value="07">Juillet</SelectItem>
                  <SelectItem value="08">Août</SelectItem>
                  <SelectItem value="09">Septembre</SelectItem>
                  <SelectItem value="10">Octobre</SelectItem>
                  <SelectItem value="11">Novembre</SelectItem>
                  <SelectItem value="12">Décembre</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.birthday_month && (
          <span className="mb-2 flex items-center gap-1 text-xs text-destructive">
            <FaCircleExclamation />
            {errors.birthday_month.message &&
              String(errors.birthday_month.message)}
          </span>
        )}

        <FloatingLabelInput
          type="text"
          id="birthday_day"
          label="Jour"
          maxLength={2}
          className="h-12"
          {...register("birthday_day")}
          onChange={() => clearErrors("birthday_day")}
        />
        {errors.birthday_day && (
          <span className="mb-2 flex items-center gap-1 text-xs text-destructive">
            <FaCircleExclamation />
            {errors.birthday_day.message && String(errors.birthday_day.message)}
          </span>
        )}

        {/* TODO: Country Select ? */}
      </section>
    </StepWrapper>
  );
}
