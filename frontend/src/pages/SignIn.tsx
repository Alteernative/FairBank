import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../components/AxiosInstance.tsx";
import { useState } from "react";

export default function Home() {
  const { handleSubmit, register, control } = useForm();
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  const submission = (data) => {
    AxiosInstance.post("login/", {
      email: data.email,
      password: data.password,
    })
      .then((response) => {
        if (response && response.data && response.data.token) {
          localStorage.setItem("Token", response.data.token);
          navigate("/dashboard");
        } else {
          console.log("Invalid response structure:", response);
          setShowMessage(true);
        }
      })
      .catch((error) => {
        setShowMessage(true);
        if (error.response) {
          console.error("Error response:", error.response);
        }
      });
  };
  return (
    <section className="flex h-screen">
      <aside className="flex flex-1 flex-col gap-24">
        <Link to={"/"} className="flex mt-7 ml-8 items-center">
          {/* <img className="w-10" src="/logo_no_bg.png" alt="Logo du site" />
          <h1 className="text-2xl font-bold font-sans">FairBank</h1> */}
          <h1 className="text-6xl font-jomhuria">FairBank</h1>
        </Link>
        <div className="w-full px-10">
          <img src="/login.svg" alt="Sign in image" />
        </div>
      </aside>
      {/* <section className="flex flex-1 justify-center w-80 bg-green-50"> */}
      <section className="flex flex-1 justify-center w-80 bg-white">
        <div className="absolute top-0 right-0 m-5">
          <Link to={"/inscription"}>
            <Button variant={"ghost"}>Devenir membre</Button>
          </Link>
        </div>
        {/* <Card className="w-96 h-[25rem] mt-52"> */}
        <Card className="w-96 h-[25rem] mt-52 border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Se connecter</CardTitle>
            <CardDescription className="text-center">
              Entrer votre email et votre mot de passe pour vous connecter.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(submission)}>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-3">
                  <Input
                    type="email"
                    id="email"
                    placeholder="nom@exemple.com"
                    {...register("email")}
                    required
                  />
                  <Input
                    type="password"
                    id="password"
                    placeholder="•••••••••"
                    {...register("password")}
                    required
                  />
                  <Button type="submit" className="mt-2">
                    S'identifier
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
