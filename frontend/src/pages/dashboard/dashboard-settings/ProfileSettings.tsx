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
import { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { CircleUser } from "lucide-react";
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
    formData.append("email", user.email);

    if (fileInputRef.current && fileInputRef.current.files[0]) {
      formData.append("image_url", fileInputRef.current.files[0]);
    }

    AxiosInstance.post(`users/request_update/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Update successful:", response.data);
        toast.success("Votre profil a été modifié.");

        // DEBUG: Temporary solution. Better solution: useState to update profile img dynamically?
        setTimeout(() => window.location.reload(), 3500);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        toast.error("Une erreur est survenue lors de la modification.");
      });
  };

  return (
    <main className="w-full bg-muted/20 pl-10 pt-[7rem] lg:ml-60">
      <form onSubmit={handleSubmit(handleName)} className="flex flex-col gap-4">
        <Card className="w-10/12">
          <CardHeader>
            <CardTitle>Image de profile</CardTitle>
            <CardDescription>Modifiez votre image de profile.</CardDescription>
          </CardHeader>
          <CardContent>
            {user.image_url ? (
              // TODO: Improve in Sprint 3: Preview uploaded image
              <div className="relative size-16">
                <input
                  type="file"
                  id="image"
                  {...register("image_url", { onChange: handleImageChange })}
                  ref={fileInputRef}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
                <img
                  src={`${baseUrl}${user.image_url}`}
                  alt={`${capitalize(user.first_name)} ${capitalize(user.last_name)}`}
                  className="size-full rounded-full object-cover transition-all duration-200 hover:opacity-80"
                />
              </div>
            ) : (
              <div className="relative size-16">
                <input
                  type="file"
                  id="image"
                  {...register("image_url", { onChange: handleImageChange })}
                  ref={fileInputRef}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
                <CircleUser className="size-full rounded-full object-cover transition-all duration-200 hover:opacity-80" />
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="w-10/12">
          <CardHeader>
            <CardTitle>Prénom</CardTitle>
            <CardDescription>
              Faire une demande pour modifier votre prénom
            </CardDescription>
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
        <Card className="w-10/12">
          <CardHeader>
            <CardTitle>Nom</CardTitle>
            <CardDescription>
              Faire une demande pour modifier votre nom.
            </CardDescription>
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
        <Button type="submit" className="mt-3 w-40">
          Demander
        </Button>
      </form>
    </main>
  );
}
