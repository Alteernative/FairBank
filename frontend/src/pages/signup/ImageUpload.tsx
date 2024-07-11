import { useFormContext } from "react-hook-form";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { FaCircleExclamation } from "react-icons/fa6";
import StepWrapper from "./StepWrapper";

export default function ImageUpload() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <StepWrapper
      title="Upload Image"
      description="Upload your profile picture."
    >
      <section className="flex flex-col gap-4">
        <FloatingLabelInput
          type="file"
          id="image"
          label="Profile Picture"
          autoFocus
          {...register("image_url")}
          className="h-12"
        />
        {errors.image_url && (
          <span className="flex items-center gap-1 text-xs text-destructive">
            <FaCircleExclamation />
            {errors.image_url.message && String(errors.image_url.message)}
          </span>
        )}
      </section>
    </StepWrapper>
  );
}
