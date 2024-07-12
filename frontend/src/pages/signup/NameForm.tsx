import { useFormContext } from "react-hook-form";
import StepWrapper from "./StepWrapper";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { FaCircleExclamation } from "react-icons/fa6";

export default function NameForm() {
  const {
    register,
    formState: { errors },
    clearErrors,
  } = useFormContext();
  return (
    <StepWrapper
      title="Informations personnelles"
      description="Entrer votre prénom, votre nom et votre âge ci-dessous pour créer votre compte."
    >
      <section className="flex flex-col gap-4">
        <FloatingLabelInput
          type="text"
          id="first_name"
          label="Prénom"
          autoFocus
          className="h-12"
          {...register("first_name")}
          onChange={() => clearErrors("first_name")}
        />
        {errors.first_name && (
          <span className="mb-2 flex items-center gap-1 text-xs text-destructive">
            <FaCircleExclamation />
            {errors.first_name.message && String(errors.first_name.message)}
          </span>
        )}
        <FloatingLabelInput
          type="text"
          id="last_name"
          label="Nom"
          {...register("last_name")}
          className="h-12"
          onChange={() => clearErrors("last_name")}
        />
        {errors.last_name && (
          <span className="mb-2 flex items-center gap-1 text-xs text-destructive">
            <FaCircleExclamation />
            {errors.last_name.message && String(errors.last_name.message)}
          </span>
        )}

        {/* TODO: Replace with birthday selector */}
        {/* <FloatingLabelInput
          type="text"
          id="age"
          label="Âge"
          {...register("birthday")}
          className="h-12"
        />
        {errors.age && (
          <span className="mb-2 flex items-center gap-1 text-xs text-destructive">
            <FaCircleExclamation />
            {errors.age.message && String(errors.age.message)}
          </span>
        )} */}
      </section>
    </StepWrapper>
  );
}
