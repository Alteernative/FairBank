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

export default function BirthdayForm() {
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
    >
      <section className="flex flex-col gap-4">
        <FloatingLabelInput
          type="text"
          id="birth_year"
          label="Année"
          maxLength={4}
          autoFocus
          className="h-12"
          {...register("birth_year")}
          onChange={() => clearErrors("birth_year")}
        />
        {errors.birth_year && (
          <span className="mb-2 flex items-center gap-1 text-xs text-destructive">
            <FaCircleExclamation />
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
                <SelectValue placeholder="Mois" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Mois</SelectLabel>
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
        {errors.birth_month && (
          <span className="mb-2 flex items-center gap-1 text-xs text-destructive">
            <FaCircleExclamation />
            {errors.birth_month.message && String(errors.birth_month.message)}
          </span>
        )}

        <FloatingLabelInput
          type="text"
          id="birth_day"
          label="Jour"
          maxLength={2}
          className="h-12"
          {...register("birth_day")}
          onChange={() => clearErrors("birth_day")}
        />
        {errors.birth_day && (
          <span className="mb-2 flex items-center gap-1 text-xs text-destructive">
            <FaCircleExclamation />
            {errors.birth_day.message && String(errors.birth_day.message)}
          </span>
        )}

        {/* TODO: Country Select ? */}
      </section>
    </StepWrapper>
  );
}
