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
import { CircleUser, Pen } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input.tsx";

export default function ProfileSettings() {
  const { user } = useUserContext();
  const { register, handleSubmit, setValue } = useForm();
  const baseUrl = "http://127.0.0.1:8000";
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    setValue("first_name", user.first_name);
    setValue("last_name", user.last_name);
    setValue("email", user.email);
    setValue("id", user.id);
    // setSelectedImage(`${baseUrl}${user.image_url}`);
    setSelectedImage(user.image_url ? `${baseUrl}${user.image_url}` : "");
  }, [user, setValue]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleImage = (data: FieldValues) => {
    console.log(data);

    const formData = new FormData();
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
        toast.success("Votre image de profil a été modifiée.");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        toast.error(
          "Une erreur est survenue lors de la modification de votre image de profil."
        );
      });
  };

  // TODO: Update this code to send a request to the admin.

  console.log(user);
  const handleName = (data: FieldValues) => {
    console.log(data);

    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("current_nom", user.last_name);
    formData.append("current_prenom", user.first_name);
    formData.append("tmp_nom", data.last_name);
    formData.append("tmp_prenom", data.first_name);
    formData.append("tmp_email", data.email);

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
        toast.success("Votre demande a été envoyé.");
        setTimeout(() => window.location.reload(), 3500);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        toast.error(
          "Une erreur est survenue lors de la demande de modification de votre nom."
        );
      });
  };

  return (
    <main className="ml-14 flex min-h-screen w-full flex-col gap-4 bg-muted/20 px-3 pt-[7rem] sm:px-10 lg:ml-52">
      <form
        onChange={handleSubmit(handleImage)}
        className="flex flex-col gap-4"
      >
        <Card className="w-full sm:w-10/12">
          <CardHeader>
            <CardTitle>Image de profil</CardTitle>
            <CardDescription>Modifiez votre image de profil.</CardDescription>
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
            <CardTitle>Courriel</CardTitle>
            <CardDescription>
              Contactez le support pour modifier votre courriel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FloatingLabelInput
              type="text"
              id="email"
              {...register("email")}
              label="Nom"
              className="h-12"
            />
            {/*<Input type="text" placeholder={user.email} className="h-12" />*/}
          </CardContent>
        </Card>
        <Separator />
        <Card className="w-10/12">
          <CardHeader>
            <CardTitle>Prénom</CardTitle>
            <CardDescription>
              Faire une demande pour modifier votre prénom.
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
        <Card className="w-full sm:w-10/12">
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
