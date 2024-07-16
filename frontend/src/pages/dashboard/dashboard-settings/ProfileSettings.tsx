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
import { Separator } from "@/components/ui/separator";
import { useUserContext } from "@/contexts/UserContext";
import capitalize from "@/utils/capitalize";
import { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaRegCircleUser } from "react-icons/fa6";
import { toast } from "sonner";

export default function ProfileSettings() {
  const { user } = useUserContext();
  const { register, handleSubmit, setValue } = useForm();

  const baseUrl = "http://127.0.0.1:8000";
  const fileInputRef = useRef(null);
  setValue("first_name", user.first_name);
  setValue("last_name", user.last_name);
  setValue("email", user.email);
  setValue("id", user.id);
  const [fileName, setFileName] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  const handleName = (data: FieldValues) => {
    console.log(data);

    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);

    if (fileInputRef.current && fileInputRef.current.files[0]) {
      formData.append("image_url", fileInputRef.current.files[0]);
    }

    AxiosInstance.put(`users/${user.id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Update successful:", response.data);
        toast.success("Votre profil a été modifié.");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        toast.error("Une erreur est survenue lors de la modification.");
      });
  };

  return (
    // <section className="ml-14 mt-20 w-4/5 md:ml-12 lg:ml-8">
    <section className="ml-14 mt-20 w-4/5 md:ml-12 lg:ml-8">
      <main className="flex flex-col gap-4">
        <form onSubmit={handleSubmit(handleName)}>
          <Card className="w-10/12 border-none shadow-none">
            <CardHeader>
              <CardTitle>Image de profile</CardTitle>
              <CardDescription>
                Modifiez votre image de profile.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user.image_url ? (
                // TODO: To implement in Sprint 3
                <div className="relative size-16">
                  <input
                    type="file"
                    id="image"
                    {...register("image_url", { onChange: handleImageChange })}
                    ref={fileInputRef}
                    // className="absolute left-2 top-3 size-20 opacity-100"
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />
                  <img
                    src={`${baseUrl}${user.image_url}`}
                    alt={`${capitalize(user.first_name)} ${capitalize(user.last_name)}`}
                    className="size-full rounded-full object-cover transition-all duration-200 hover:opacity-80"
                  />
                </div>
              ) : (
                <FaRegCircleUser className="size-16" />
              )}
            </CardContent>
          </Card>
          <Card className="w-10/12 border-none shadow-none">
            <CardHeader>
              <CardTitle>Prénom</CardTitle>
              <CardDescription>Modifiez votre prénom</CardDescription>
            </CardHeader>
            <CardContent>
              <FloatingLabelInput
                type="text"
                id="first_name"
                {...register("first_name")}
                label="Prénom"
                className="h-12"
              />
            </CardContent>
          </Card>
          <Card className="w-10/12 border-none shadow-none">
            <CardHeader>
              <CardTitle>Nom</CardTitle>
              <CardDescription>Modifiez votre prénom</CardDescription>
            </CardHeader>
            <CardContent>
              <FloatingLabelInput
                type="text"
                id="last_name"
                {...register("last_name")}
                label="Nom"
                className="h-12"
              />
            </CardContent>
          </Card>
          <Button type="submit" className="min-w-1/2 ml-6 mt-5 max-w-[10rem]">
            Sauvegarder
          </Button>
        </form>
      </main>
    </section>
  );
}
