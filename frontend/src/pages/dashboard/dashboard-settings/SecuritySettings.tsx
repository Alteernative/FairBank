import AxiosInstance from "@/components/AxiosInstance";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
        toast.success(
          "Une demande de fermeture de compte a été envoyée. Veuillez attendre la confirmation de fermeture de compte par courriel"
        );
        setTimeout(() => {
          navigate("/");
        }, 2500);
        localStorage.removeItem("Token");
      })
      .catch((error) => {
        toast.error(
          "Une erreur est survenue lors de la fermeture de votre compte."
        );
        console.error("Error updating user:", error);
      });
  };

  return (
    <main className="ml-14 flex min-h-screen w-full flex-col gap-4 bg-muted/20 px-3 pt-[7rem] sm:px-10 lg:ml-60">
      <form onSubmit={handleSubmit(handleAccountDelete)}>
        <Card className="w-full sm:w-10/12">
          <CardHeader>
            <CardTitle>Fermez votre compte</CardTitle>
            <CardDescription>
              <b>Attention: La fermeture de compte est finale.</b>
              <br /> Cliquez sur Demander pour envoyer une demande de fermeture
              à notre équipe de support.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant={"destructive"}>
                  Demander
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-11/12 rounded-xl sm:max-w-[425px]">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Êtes-vous sûr de vouloir fermer votre compte ?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {/* Cette action est irréversible. Votre demande sera traitée
                    dans les 3 prochains jours ouvrables. */}
                    <b>Cette action est irréversible.</b> Une demande de
                    fermeture de compte sera envoyée à notre équipe de support
                    et sera traitée dans les plus brefs délais.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-row items-center justify-end space-x-2">
                  <AlertDialogCancel className="mt-0">
                    Annuler
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button
                      type="submit"
                      variant="destructive"
                      onClick={handleSubmit(handleAccountDelete)}
                    >
                      Confirmer
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}