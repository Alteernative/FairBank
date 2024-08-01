import { useFormContext } from "react-hook-form";
import { useState, useRef } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import StepWrapper from "./StepWrapper";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

export default function ImageUpload() {
  const { t } = useTranslation();
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setValue("image_url", file);
    } else {
      setFileName("");
      setValue("image_url", null);
    }
  };

  const handleRemoveFile = () => {
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      setValue("image_url", null); // Clear the file in the form context
    }
  };

  return (
    <StepWrapper
      title={t("signUp.imageUpload.title")}
      description={t("signUp.imageUpload.description")}
    >
      <section className="relative flex flex-col gap-4">
        <input
          type="file"
          id="image"
          {...register("image_url", { onChange: handleFileChange })}
          ref={fileInputRef}
          className="hidden"
        />
        <Label
          htmlFor="image"
          className="flex cursor-pointer items-center justify-center rounded-lg border p-5"
        >
          {fileName || `${t("signUp.imageUpload.add")}`}
        </Label>
        {fileName && (
          <Button
            type="button"
            variant={"destructive"}
            onClick={handleRemoveFile}
            className="absolute -bottom-[3.75rem] left-0 w-32"
          >
            {t("signUp.imageUpload.add")}
          </Button>
        )}
        {!fileName && (
          <Button
            type="submit"
            variant={"outline"}
            className="absolute -bottom-[3.75rem] left-0 w-32"
          >
            {t("buttons.skip")}
          </Button>
        )}

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
