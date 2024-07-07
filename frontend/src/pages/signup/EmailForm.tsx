import { useFormContext } from "react-hook-form";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { FaCircleExclamation } from "react-icons/fa6";
import StepWrapper from "./StepWrapper";

export default function EmailForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <StepWrapper
      title="S'incrire"
      description="Entrer votre courriel ci-dessous pour créer votre compte."
    >
      <section className="flex flex-col gap-4">
        <FloatingLabelInput
          type="email"
          id="email"
          label="Courriel"
          autoFocus
          {...register("email")}
          className="h-12"
        />
        {errors.email && (
          <span className="flex items-center gap-1 text-xs text-destructive">
            <FaCircleExclamation />
            {errors.email.message && String(errors.email.message)}
          </span>
        )}
      </section>
    </StepWrapper>
  );
}
