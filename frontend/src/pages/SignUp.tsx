import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../components/AxiosInstance.tsx";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

export default function Home() {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const submission = (data) => {
    console.log(data);
    AxiosInstance.post(
      "register/",
      {
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(() => {
        console.log("registered successfully");
        navigate(`/connexion`);
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response:", error.response);
        }
      });
  };

  return (
    <section className="flex h-screen">
      <aside className="flex flex-1 flex-col gap-24">
        <Link to={"/"} className="flex mt-7 ml-8 items-center">
          {/* <img className="w-10" src="/logo_no_bg.png" alt="Logo du site" /> */}
          {/* <h1 className="text-2xl font-bold font-sans">FairBank</h1> */}
          <h1 className="text-6xl font-jomhuria">FairBank</h1>
        </Link>
        <div className="w-full px-10">
          <img src="/login.svg" alt="Sign in image" />
        </div>
      </aside>
      {/* <section className="flex flex-1 justify-center w-80 bg-green-50"> */}
      <section className="flex flex-1 justify-center w-80 bg-white">
        <div className="absolute top-0 right-0 m-5">
          <Link to={"/connexion"}>
            <Button variant={"ghost"}>Se connecter</Button>
          </Link>
        </div>
        {/* <Card className="w-96 h-[25rem] mt-52"> */}
        <Card className="w-96 h-[25rem] mt-52 border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Ouvrir un Compte Courant
            </CardTitle>
            <CardDescription className="text-center">
              Entrer votre email ci-dessous pour créer votre compte
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <form onSubmit={handleFormSubmit()}> */}
            <form onSubmit={handleSubmit(submission)}>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="prenom">Prenom</Label>
                  <Input
                    type="text"
                    id="first_name"
                    placeholder="Prenom"
                    required
                    {...register("first_name")}
                  />
                  <Label htmlFor="name">Nom</Label>
                  <Input
                    type="text"
                    id="last_name"
                    placeholder="Nom"
                    {...register("last_name")}
                    required
                  />
                  <Label htmlFor="email">Courriel</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="nom@exemple.com"
                    required
                    {...register("email")}
                  />
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="•••••••••"
                    {...register("password")}
                    required
                  />
                  <Label htmlFor="password">Confirmer le mot de passe</Label>
                  <Input
                    type="password"
                    id="repassword2"
                    placeholder="•••••••••"
                    required
                  />
                  <Button type="submit" className="mt-2">
                    Se connecter avec l'email
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
