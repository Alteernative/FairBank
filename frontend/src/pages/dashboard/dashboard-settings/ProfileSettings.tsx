import AxiosInstance from "@/components/AxiosInstance";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { useUserContext } from "@/contexts/UserContext";
import { useRef } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function ProfileSettings() {
  const { user } = useUserContext();
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const handleProfile = (data: FieldValues) => {
    console.log(data);

    const formData = new FormData();
    formData.append("email", data.email);
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
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    // <section className="ml-14 mt-20 w-4/5 md:ml-12 lg:ml-8">
    <section className="ml-14 mt-20 w-4/5 md:ml-12 lg:ml-8">
      <main className="flex flex-col gap-4">
        <form onSubmit={handleSubmit(handleProfile)}>
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
