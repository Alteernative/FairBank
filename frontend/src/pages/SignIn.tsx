import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../components/AxiosInstance.tsx";
import { signInSchema } from "@/schemas/SignInSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaCircleExclamation } from "react-icons/fa6";
import { FloatingLabelInput } from "@/components/ui/floating-label-input.tsx";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
// import { Checkbox } from "@/components/ui/checkbox.tsx";

export default function SignIn() {
  const [passwordType, setPasswordType] = useState("password");
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

  const handleClick = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };
  const onSubmit = (data: FieldValues) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    AxiosInstance.post("login/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
      <aside className="hidden w-full flex-1 flex-col bg-[#efeee6] lg:flex">
        <Link to={"/"} className="ml-8 mt-7 flex items-center">
          <h1 className="font-jomhuria text-6xl">FairBank</h1>
        </Link>
        <img
          src="/login.svg"
          alt="Sign in image"
          className="my-auto w-full content-center overflow-hidden"
        />
      </aside>

      <main className="flex w-80 flex-1 items-center justify-center bg-white">
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

        <Card className="h-[25rem] w-96 border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Se connecter</CardTitle>
            <CardDescription className="text-center">
              Entrer votre email et votre mot de passe pour vous connecter.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <FloatingLabelInput
                  type="email"
                  id="email"
                  label="Courriel"
                  {...register("email")}
                  className="h-12"
                  autoFocus
                />
                {errors.email && (
                  <span className="mb-2 flex items-center gap-1 text-xs text-destructive">
                    <FaCircleExclamation />
                    {errors.email.message}
                  </span>
                )}
                <div className="relative">
                  <FloatingLabelInput
                    type={passwordType}
                    id="password"
                    label="Mot de passe"
                    {...register("password")}
                    className="h-12 pr-12"
                  />
                  <span className="absolute right-3 top-0 flex h-full items-center justify-center">
                    <Button
                      type="button"
                      variant={"ghost"}
                      size={"icon"}
                      className="size-7 select-none rounded-full"
                      onClick={handleClick}
                    >
                      {passwordType === "password" ? <FaEye /> : <FaEyeSlash />}
                    </Button>
                  </span>
                </div>
                {errors.password && (
                  <span className="flex items-center gap-1 text-xs text-destructive">
                    <FaCircleExclamation />
                    {errors.password.message}
                  </span>
                )}

                {/* Checkbox Show/Hide password */}
                {/* <div className="flex items-center gap-2">
                  <Checkbox id="show-password" onClick={handleClick} />
                  <label
                    htmlFor="show-password"
                    className="text-sm font-medium"
                  >
                    Afficher le mot de passe
                  </label>
                </div> */}
                <Button type="submit" className="mt-2 select-none">
                  {/* <Button type="submit" className="mt-2 h-12 select-none"> */}
                  S'identifier
                </Button>
                <Button variant="link">
                  <Link to={"/request/password-reset"}>
                    Mot de passe oublié?
                  </Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </section>
  );
}
