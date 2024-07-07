import { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/UserSchema.ts";
import AxiosInstance from "../components/AxiosInstance.tsx";
import EmailForm from "./signup/EmailForm.tsx";
import PasswordForm from "./signup/PasswordForm.tsx";
import UserForm from "./signup/UserForm.tsx";
// import PlanForm from "./signup/PlanForm.tsx";

// TODO: Add toast is the sign up is confirmed
export default function SignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const methods = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: FieldValues) => {
    // if (step < 4) {
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log(data);
      AxiosInstance.post("register/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          console.log("registered successfully");
          navigate(`/connexion`);
        })
        .catch((error) => {
          if (error.response) {
            console.error("Error response:", error.response);
          }
        });
    }
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
          <Link to={"/connexion"}>Se connecter</Link>
        </Button>
        <h1 className="absolute left-7 top-7 font-jomhuria text-6xl lg:hidden">
          <Link to={"/"}>FairBank</Link>
        </h1>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {step === 1 && <EmailForm />}
            {step === 2 && <PasswordForm />}
            {step === 3 && <UserForm isLastStep={true} />}
            {/* {step === 4 && (
              <PlanForm
                onNext={methods.handleSubmit(onSubmit)}
                isLastStep={true}
              />
            )} */}
          </form>
        </FormProvider>
      </main>
    </section>
  );
}
