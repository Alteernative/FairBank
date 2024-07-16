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
import { useUserContext } from "@/contexts/UserContext";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function DisplaySettings() {
  const { user } = useUserContext();
  const { handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleAccountDelete = (data: FieldValues) => {
    console.log(user);
    console.log("deleting :", data);
    console.log(data);
    AxiosInstance.delete(`users/${user.id}/`, {
      id: data.id,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
    })
      .then(() => {
        toast.success("Le compte a été supprimé.");
        setTimeout(() => {
          navigate("/");
        }, 2500);
        localStorage.removeItem("Token");
      })
      .catch((error) => {
        toast.success("Erreure: le compte n'a pas été supprimé.");
        console.error("Error updating user:", error);
      });
  };

  return (
    <section className="ml-14 mt-20 w-4/5 md:ml-12 lg:ml-8">
      <main className="flex flex-col gap-4">
        <form onSubmit={handleSubmit(handleAccountDelete)}>
          <Card className="w-10/12 border-none shadow-none">
            <CardHeader>
              <CardTitle>Fermez votre compte</CardTitle>
              <CardDescription>
                Attention: La fermeture de compte est finale.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                type="submit"
                variant={"destructive"}
                className="min-w-1/2 max-w-[10rem]"
              >
                Fermer le compte
              </Button>
            </CardContent>
          </Card>
        </form>
      </main>
    </section>
  );

  // return (
  //   <section className="ml-14 mt-20 w-4/5 md:ml-12 lg:ml-8">
  //     <main className="flex flex-col gap-4">
  //       <form onSubmit={handleSubmit(handleAccountDelete)}>
  //         <Card className="w-10/12 border-none shadow-none">
  //           <CardHeader>
  //             <CardTitle>Fermez votre compte</CardTitle>
  //             <CardDescription>
  //               Entrez FERMER et confirmer pour fermer votre compte client.
  //             </CardDescription>
  //           </CardHeader>
  //           <CardContent>
  //             <FloatingLabelInput
  //               type="text"
  //               label="Confirmer la fermeture"
  //               id="confirm-delete-account"
  //             />
  //           </CardContent>
  //         </Card>
  //         <Button type="submit" className="min-w-1/2 ml-6 mt-5 max-w-[10rem]">
  //           Sauvegarder
  //         </Button>
  //       </form>
  //     </main>
  //   </section>
  // );
  // return (
  //   <section className="ml-14 mt-20 w-4/5 md:ml-12 lg:ml-8">
  //     <main className="flex flex-col gap-4">
  //       <form onSubmit={handleSubmit(handleAccountDelete)}>
  //         <Card className="w-10/12 border-none shadow-none">
  //           <CardHeader>
  //             <CardTitle>Fermez votre compte</CardTitle>
  //             <CardDescription>
  //               Entrez votre courriel et confirmer pour fermer votre compte
  //               client.
  //             </CardDescription>
  //           </CardHeader>
  //           <CardContent>
  //             <FloatingLabelInput type="text" label="Courriel" />
  //           </CardContent>
  //         </Card>
  //         <Button type="submit" className="min-w-1/2 ml-6 mt-5 max-w-[10rem]">
  //           Sauvegarder
  //         </Button>
  //       </form>
  //     </main>
  //   </section>
  // );
}
