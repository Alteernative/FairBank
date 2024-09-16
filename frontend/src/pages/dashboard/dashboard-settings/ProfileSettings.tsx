import AxiosInstance from "@/components/AxiosInstance";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { useUserContext } from "@/contexts/UserContext";
import capitalize from "@/utils/capitalize";
import { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { CircleAlert, CircleUser, Loader, Pen } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import NameSchema from "@/schemas/NameSchema";

export default function ProfileSettings() {
  const { user } = useUserContext();
  const {
    handleSubmit,
    register,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(NameSchema()),
    mode: "onSubmit",
  });
  const baseUrl = "http://127.0.0.1:8000";
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    setValue("first_name", user.first_name);
    setValue("last_name", user.last_name);
    setValue("email", user.email);
    setValue("id", user.id);
    setSelectedImage(user.image_url ? `${baseUrl}${user.image_url}` : "");
  }, [user, setValue]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleImage = (data: FieldValues) => {
    console.log(data);
    const formData = new FormData();
    if (fileInputRef.current?.files?.[0]) {
      formData.append("image_url", fileInputRef.current.files[0]);
    }

    AxiosInstance.put(`users/${user.id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Update successful:", response.data);
        toast.success(`${t("toast.settings.profile.image.success")}`);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        toast.error(`${t("toast.settings.profile.image.error")}`);
      });
  };

  const handleName = async (data: FieldValues) => {
    try {
      console.log(data);

      const formData = new FormData();
      formData.append("current_nom", user.last_name);
      formData.append("current_prenom", user.first_name);
      formData.append("tmp_nom", data.last_name);
      formData.append("tmp_prenom", data.first_name);

      const response = await AxiosInstance.post(
        `users/request_update/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Name change request successful:", response.data);
      toast.success(`${t("toast.settings.profile.name.success")}`);
    } catch (error: any) {
      console.error("Error updating user:", error);
      toast.error(`${t("toast.settings.profile.name.error")}`);

      // Option 2:
      // const errorResponseData = error.response.data;
      // console.error("errorResponseData: ", errorResponseData.error);
      // if (
      //   errorResponseData.error ===
      //   "Temporary names and current names are identical"
      // ) {
      //   toast.error(`${t("toast.settings.profile.name.error.identical")}`);
      // } else {
      //   toast.error(`${t("toast.settings.profile.name.error.all")}`);
      // }
      // TODO: Add to translation files
      // "error": {
      //   "all": "Une erreur est survenue lors de la demande de modification de votre courriel.",
      //   "identical": "Le courriel vous avez saisi est identique à votre courriel actuelle."
      // }
    }
  };

  return (
    <main className="ml-14 flex min-h-screen w-full flex-col gap-4 bg-muted/20 px-3 pt-[7rem] sm:px-10 lg:ml-52">
      <form
        onChange={handleSubmit(handleImage)}
        className="flex flex-col gap-4"
      >
        <Card className="w-full sm:w-10/12">
          <CardHeader>
            <CardTitle>{t("settings.profile.card1.title")}</CardTitle>
            <CardDescription>
              {t("settings.profile.card1.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative size-16">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={`${capitalize(user.first_name)} ${capitalize(user.last_name)}`}
                  className="size-full rounded-full"
                />
              ) : (
                <CircleUser className="size-full rounded-full" />
              )}
              <Button
                variant="outline"
                type="button"
                size="icon"
                className="absolute -bottom-2 -right-1 size-7 cursor-pointer rounded-full object-cover"
              >
                <Pen size={14} className="z-0" />
                <input
                  type="file"
                  {...register("image_url", { onChange: handleFile })}
                  ref={fileInputRef}
                  className="absolute inset-0 z-10 h-full w-full cursor-pointer rounded-full opacity-0"
                />
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
      <Separator />
      <form onSubmit={handleSubmit(handleName)} className="flex flex-col gap-4">
        <Card className="w-full sm:w-10/12">
          <CardHeader>
            <CardTitle>{t("settings.profile.card2.title")}</CardTitle>
            <CardDescription>
              {t("settings.profile.card2.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FloatingLabelInput
              type="text"
              id="first_name"
              label={t("input.firstName")}
              className="h-12"
              {...register("first_name")}
              onChange={() => clearErrors("first_name")}
            />
            {errors.first_name && (
              <span className="mt-2 flex items-center gap-1 text-xs text-destructive">
                <CircleAlert size={20} />
                {errors.first_name.message && String(errors.first_name.message)}
              </span>
            )}
          </CardContent>
        </Card>
        <Card className="w-full sm:w-10/12">
          <CardHeader>
            <CardTitle>{t("settings.profile.card3.title")}</CardTitle>
            <CardDescription>
              {t("settings.profile.card3.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FloatingLabelInput
              type="text"
              id="last_name"
              label={t("input.lastName")}
              className="h-12"
              {...register("last_name")}
              onChange={() => clearErrors("last_name")}
            />
            {errors.last_name && (
              <span className="mt-2 flex items-center gap-1 text-xs text-destructive">
                <CircleAlert size={20} />
                {errors.last_name.message && String(errors.last_name.message)}
              </span>
            )}
          </CardContent>
        </Card>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-40 select-none"
        >
          {isSubmitting ? (
            <Loader size={20} className="animate-spin" />
          ) : (
            `${t("buttons.ask")}`
          )}
        </Button>
      </form>
    </main>
  );
}
