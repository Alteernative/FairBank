import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../components/AxiosInstance.tsx";
import { signInSchema } from "@/schemas/SignInSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { FloatingLabelInput } from "@/components/ui/floating-label-input.tsx";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import { ModeToggle } from "@/components/ModeToggle.tsx";
import { CircleAlert, Eye, EyeOff, TriangleAlert, Loader } from "lucide-react";

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const [passwordType, setPasswordType] = useState("password");
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(signInSchema),
    mode: "onSubmit",
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

  const onSubmit = async (data: FormData) => {
    try {
      const response = await AxiosInstance.post("login/", {
        email: data.email,
        password: data.password,
      });
      if (response && response.data && response.data.token) {
        localStorage.setItem("Token", response.data.token);
        navigate("/dashboard");
      } else {
        console.log("Invalid response structure:", response);
      }
    } catch (error: any) {
      console.log("Sign in error:", error);
      if (error.response) {
        const responseErrorData = error.response.data;
        console.error("Error status:", error.response.status);
        console.error("Errors data:", responseErrorData);

        if (responseErrorData.error) {
          if (
            responseErrorData.error ===
            "Invalid credentials or User is not active"
          ) {
            const errorMessage = "Email ou mot de passe invalide.";
            setError("root", {
              type: "server",
              message: errorMessage,
            });
          }
        }
      }
    }
  };

  return (
    <section className="flex h-screen">
      <aside className="hidden w-full flex-1 flex-col bg-[#efeee6] dark:bg-stone-800 lg:flex">
        <Link to={"/"} className="ml-8 mt-7 flex items-center">
          <h1 className="font-jomhuria text-6xl">FairBank</h1>
        </Link>
        <img
          src="/images/login.svg"
          alt="Sign in image"
          className="my-auto w-full content-center overflow-hidden"
        />
      </aside>

      <main className="flex w-80 flex-1 items-center justify-center">
        <span className="absolute right-36 top-0 m-5">
          <ModeToggle />
        </span>
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
              Entrez votre courriel et mot de passe pour vous connecter.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <FloatingLabelInput
                  type="text"
                  id="email"
                  label="Courriel"
                  {...register("email")}
                  className="h-12"
                  autoFocus
                  onChange={() => {
                    clearErrors("email");
                    clearErrors("root");
                  }}
                />

                {errors.email && errors.email?.type !== "server" && (
                  <span className="mb-2 flex items-center gap-1 text-xs text-destructive">
                    <CircleAlert size={20} />
                    {errors.email?.message}
                  </span>
                )}

                <div className="relative">
                  <FloatingLabelInput
                    type={passwordType}
                    id="password"
                    autoComplete="off"
                    label="Mot de passe"
                    {...register("password")}
                    className="h-12 pr-12"
                    onChange={() => {
                      clearErrors("password");
                      clearErrors("root");
                    }}
                  />
                  <span className="absolute right-3 top-0 flex h-full items-center justify-center">
                    <Button
                      type="button"
                      variant={"ghost"}
                      size={"icon"}
                      className="size-7 select-none rounded-full"
                      onClick={handleClick}
                    >
                      {passwordType === "password" ? (
                        <Eye size={20} />
                      ) : (
                        <EyeOff size={20} />
                      )}
                    </Button>
                  </span>
                </div>

                {errors.password && errors.password?.type !== "server" && (
                  <span className="mb-2 flex items-center gap-1 text-xs text-destructive">
                    <CircleAlert size={20} />
                    {errors.password.message}
                  </span>
                )}

                {errors.root && (
                  <Alert variant={"destructive"}>
                    <TriangleAlert size={20} />
                    <AlertTitle>Erreur</AlertTitle>
                    <AlertDescription>{errors.root.message}</AlertDescription>
                  </Alert>
                )}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 select-none"
                >
                  {isSubmitting ? (
                    <Loader size={20} className="animate-spin" />
                  ) : (
                    "S'identifier"
                  )}
                </Button>
                <Button asChild variant="link">
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
