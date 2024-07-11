import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/SignUpSchema.ts";
import AxiosInstance from "../components/AxiosInstance.tsx";
import EmailForm from "./signup/EmailForm.tsx";
import PasswordForm from "./signup/PasswordForm.tsx";
import NameForm from "./signup/NameForm.tsx";
import BirthdayForm from "./signup/BirthdayForm.tsx";
// import PlanForm from "./signup/PlanForm.tsx";

type FormValues = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  re_password: string;
};

// TODO: Add toast is the sign up is confirmed
export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(1);
  const stepSchema = signUpSchema(step);
  const MAX_STEPS = 4;
  const methods = useForm<FormValues>({
    resolver: zodResolver(stepSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      re_password: "",
      first_name: "",
      last_name: "",
      // birthday_year: "",
      // birthday_month: "",
      // birthday_day: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const allData = { ...formData, ...data };
    setFormData(allData);

    if (step < MAX_STEPS) {
      setStep(step + 1);
    } else {
      try {
        console.log(allData);
        const response = await AxiosInstance.post("register/", allData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response) {
          console.log("Register Success");
          navigate(`/connexion`);
        }
      } catch (error: any) {
        if (error.response) {
          // console.error("Error response:", error.response);
          const responseErrorData = error.response.data;
          console.error("Error status:", error.response.status);
          console.error("Errors data:", responseErrorData);

          if (responseErrorData.errors) {
            if (responseErrorData.errors.email) {
              methods.setError("email", {
                type: "server",
                message: responseErrorData.errors.email,
              });
            } else if (responseErrorData.errors.password) {
              methods.setError("password", {
                type: "server",
                message: responseErrorData.errors.password,
              });
            }
          }
        }
      }
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
            {step === 3 && <NameForm />}
            {step === 4 && (
              <BirthdayForm
                isLastStep={true}
                isSubmitting={methods.formState.isSubmitting}
              />
            )}
            {/* {step === 5 && (
              <PlanForm
                isLastStep={true}
              />
            )} */}
          </form>
        </FormProvider>
      </main>
    </section>
  );
}
