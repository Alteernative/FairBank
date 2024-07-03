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
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../components/AxiosInstance.tsx";
import { signInSchema } from "@/schemas/UserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaCircleExclamation } from "react-icons/fa6";
import { FloatingLabelInput } from "@/components/ui/floating-label-input.tsx";

export default function Home() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const onSubmit = (data: FieldValues) => {
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
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response:", error.response);
        }
      });
  };

  return (
    <section className="flex h-screen">
      <aside className="hidden flex-1 flex-col gap-24 lg:flex">
        <Link to={"/"} className="ml-8 mt-7 flex items-center">
          <h1 className="font-jomhuria text-6xl">FairBank</h1>
        </Link>
        <div className="flex w-full items-center justify-center">
          <img src="/login.svg" alt="Sign in image" />
        </div>
      </aside>

      <main className="flex w-80 flex-1 justify-center bg-white">
        <Button
          asChild
          variant={"ghost"}
          className="absolute right-0 top-0 m-5"
        >
          <Link to={"/inscription"}>Devenir membre</Link>
        </Button>
        <h1 className="absolute left-7 top-7 font-jomhuria text-6xl lg:hidden">
          <Link to={"/"}>FairBank</Link>
        </h1>

        <Card className="mt-52 h-[25rem] w-96 border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Se connecter</CardTitle>
            <CardDescription className="text-center">
              Entrer votre email et votre mot de passe pour vous connecter.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                {/* <Input
                  type="email"
                  id="email"
                  placeholder="nom@exemple.com"
                  {...register("email")}
                  autoFocus
                /> */}
                <FloatingLabelInput
                  type="email"
                  id="email"
                  label="Courriel"
                  {...register("email")}
                  autoFocus
                />
                {errors.email && (
                  <span className="flex items-center gap-1 text-xs text-destructive">
                    <FaCircleExclamation />
                    {errors.email.message}
                  </span>
                )}

                {/* <Input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  {...register("password")}
                /> */}
                <FloatingLabelInput
                  type="password"
                  id="password"
                  label="Mot de passe"
                  {...register("password")}
                />
                {errors.password && (
                  <span className="flex items-center gap-1 text-xs text-destructive">
                    <FaCircleExclamation />
                    {errors.password.message}
                  </span>
                )}
                <Button type="submit" className="mt-2">
                  S'identifier
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </section>
  );
}
