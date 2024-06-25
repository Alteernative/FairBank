import {Button} from "@/components/ui/button";
import {Link, useNavigate} from "react-router-dom";
import {useUserContext} from "@/components/UserContext.tsx";
import AxiosInstance from "@/components/AxiosInstance.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useForm} from "react-hook-form";

export default function UserProfileSettings() {
  const {user} = useUserContext();
  const {handleSubmit, register, setValue} = useForm();
  const navigate = useNavigate();

  // Initialize form values with user context data
  setValue("first_name", user.first_name);
  setValue("last_name", user.last_name);
  setValue("email", user.email);
  setValue("id", user.id);


  const modifyUser = (data) => {
    console.log(data);

    AxiosInstance.put(`users/${user.id}/`, {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
    })
      .then((response) => {
        console.log("Update successful:", response.data);
        navigate('/dashboard')
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };


  const updatePassword = (data) => {
    console.log(data);
    AxiosInstance.put(`users/${user.id}/`, {
      password: data.password,
    })
      .then((response) => {
        console.log("Update successful:", response.data);
        localStorage.removeItem("Token")
        navigate('/connexion')
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <section className="flex h-full">
      <aside className="flex-1 flex flex-col items-center justify-center gap-8">
        <Link to={"/"} className="mt-7 ml-8">
          <h1 className="text-6xl font-jomhuria">FairBank</h1>
        </Link>
        <div className="flex items-center justify-center h-full">
          <img src="/reset-logo.svg" alt="Sign in image" className="h-full"/>
        </div>
      </aside>
      <section className="flex flex-1 justify-around w-60 bg-white mt">
        <Card className="w-96 h-[25rem] mt-52 border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Modifier les informations personnelles
            </CardTitle>
            <CardDescription className="text-center">
              Modifier vos informations personnelles ci-dessous
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(modifyUser)}>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="first_name">Prénom</Label>
                  <Input
                    type="text"
                    id="first_name"
                    {...register("first_name")}
                    required
                  />
                  <Label htmlFor="last_name">Nom</Label>
                  <Input
                    type="text"
                    id="last_name"
                    {...register("last_name")}
                    required
                  />
                  <Label htmlFor="email">Courriel</Label>
                  <Input
                    type="email"
                    id="email"
                    {...register("email")}
                    required
                  />

                  <Button type="submit" className="mt-2">
                    Confirmer les changements
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
          <CardContent>
            <form onSubmit={handleSubmit(updatePassword)}>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="email">Password</Label>
                  <Input
                    type="password"
                    id="passowrd"
                    {...register("password")}
                    required
                  />

                  <Label htmlFor="email">Confirm password</Label>
                  <Input
                    type="password"
                    id="passowrd2"
                    {...register("password2")}
                    required
                  />

                  <Button type="submit" className="mt-2">
                    Modifier mot de passe
                  </Button>
                </div>
              </div>
            </form>

          </CardContent>
        </Card>
      </section>
    </section>
  );
}
