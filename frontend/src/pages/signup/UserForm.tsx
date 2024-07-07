import { useFormContext } from "react-hook-form";
import StepWrapper from "./StepWrapper";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";

export default function UserForm({ isLastStep }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <StepWrapper
      title="Informations personnelles"
      description="Entrer votre prénom, votre nom et votre âge ci-dessous pour créer votre compte."
      isLastStep={isLastStep}
    >
      <section className="flex flex-col gap-4">
        <FloatingLabelInput
          type="text"
          id="first_name"
          label="Prénom"
          autoFocus
          className="h-12"
          {...register("first_name")}
        />
        <FloatingLabelInput
          type="text"
          id="last_name"
          label="Nom"
          {...register("last_name")}
          className="h-12"
        />
        <FloatingLabelInput type="text" id="age" label="Âge" className="h-12" />
      </section>
    </StepWrapper>
  );
}
