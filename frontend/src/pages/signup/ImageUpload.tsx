import { useFormContext } from "react-hook-form";
import { useState, useRef } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import StepWrapper from "./StepWrapper";

export default function ImageUpload() {
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
      title="Personaliser votre profil"
      description="Téléverser une image de profil si vous le désirez, sinon cliquez sur suivant"
    >
      <section className="flex flex-col gap-4">
        <input
          type="file"
          id="image"
          {...register("image_url", { onChange: handleFileChange })}
          ref={fileInputRef}
          className="hidden"
        />
        <label
          htmlFor="image"
          className="mt-2 flex cursor-pointer items-center justify-center rounded border bg-gray-100 p-2 hover:bg-gray-200"
        >
          {fileName || "Choisir un fichier"}
        </label>
        {fileName && (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm text-gray-500">
              Fichier sélectionné: {fileName}
            </span>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
            >
              x
            </button>
          </div>
        )}
        {!fileName && (
          <span className="text-sm text-gray-500">Aucun fichier choisi</span>
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
