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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useUserContext } from "@/contexts/UserContext";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AccountSettings() {
  const { user } = useUserContext();
  const { handleSubmit, register } = useForm();

  const handleAccount = async (data: FieldValues) => {
    try {
      console.log(data);
      await AxiosInstance.put(`users/${user.id}/`, {
        password: data.password,
      });
      toast.success("Votre mot de passe a été modifié.");
      localStorage.removeItem("Token");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Une erreur est survenue lors de la modification.");
    }
  };

  return (
    <section className="ml-14 mt-20 w-4/5 md:ml-12 lg:ml-8">
      <main className="flex flex-col gap-4">
        <form onSubmit={handleSubmit(handleAccount)}>
          <Card className="w-10/12 border-none shadow-none">
            <CardHeader>
              <CardTitle>Courriel</CardTitle>
              <CardDescription>
                Contactez le support pour modifier votre courriel.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                type="text"
                disabled
                placeholder={user.email}
                className="h-12"
              />
            </CardContent>
          </Card>
          <Separator />
          {/* TODO: User enters current password, check if valid -> Enter new password, checks if diffrent than old password with zod validations. */}
          {/* <Card className="w-10/12 border-none shadow-none">
            <CardHeader>
              <CardTitle>Mot de passe</CardTitle>
              <CardDescription>Modifiez votre mot de passe</CardDescription>
            </CardHeader>
            <CardContent>
              <FloatingLabelInput type="text" label="Mot de passe actuel" />
            </CardContent>
          </Card> */}
          <Card className="w-10/12 border-none shadow-none">
            <CardHeader>
              <CardTitle>Nouveau mot de passe</CardTitle>
              <CardDescription>Entrez un nouveau mot de passe</CardDescription>
            </CardHeader>
            <CardContent>
              <FloatingLabelInput
                type="text"
                id="password"
                {...register("password")}
                label="Nouveau mot de passe"
                className="h-12"
              />
            </CardContent>
          </Card>
          <Card className="w-10/12 border-none shadow-none">
            <CardHeader>
              <CardTitle>Confirmer le nouveau mot de passe</CardTitle>
              <CardDescription>
                Confirmez le nouveau mot de passe.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FloatingLabelInput
                type="text"
                id="re_password"
                {...register("re_password")}
                label="Confirmer"
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
