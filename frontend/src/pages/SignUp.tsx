import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/SignUpSchema.ts";
import AxiosInstance from "../components/AxiosInstance.tsx";
import EmailForm from "./signup/EmailForm.tsx";
import PasswordForm from "./signup/PasswordForm.tsx";
import UserForm from "./signup/UserForm.tsx";
import ImageUpload from "@/pages/signup/ImageUpload.tsx";
import NameForm from "./signup/NameForm.tsx";
import BirthdayForm from "./signup/BirthdayForm.tsx";
import { toast, Toaster } from "sonner";
import PlanForm from "./signup/PlanForm.tsx";

type FormValues = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  re_password: string;
  // birthday_year: number;
  // birthday_month: string;
  // birthday_day: number;
  plan: string;
};

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(1);
  const stepSchema = signUpSchema(step);
  const MAX_STEPS = 6;
  const methods = useForm<FormValues>({
    resolver: zodResolver(stepSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      re_password: "",
      first_name: "",
      last_name: "",
      // birthday_year: 0,
      // birthday_month: "",
      // birthday_day: 0,
      plan: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const allData = { ...formData, ...data };
    setFormData(allData);
    console.log(allData);

    if (step < MAX_STEPS) {
      setStep(step + 1);
      methods.clearErrors();
    } else {
      try {
        console.log(allData);
        const formDataToSend = new FormData();
        for (const key in allData) {
          if (key === "image_url" && allData[key]) {
            formDataToSend.append(key, allData[key]);
          } else if (key !== "image_url") {
            console.log(allData[key]);
            formDataToSend.append(key, allData[key]);
          }
        }
        const response = await AxiosInstance.post("register/", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response) {
          toast.success("Inscription complétée.");
          setTimeout(() => {
            navigate(`/connexion`);
          }, 3500);
        }
      } catch (error: any) {
        if (error.response) {
          console.error("Error response:", error.response);
          console.error("Error status:", error.response.status);
          const responseErrorData = error.response.data;
          console.error("Errors data:", responseErrorData);

          if (
            error.response.status === 400 &&
            responseErrorData.email.includes(
              "user with this email already exists."
            )
          ) {
            toast.error("Inscription refusé, le courriel existe déjà.");
            setTimeout(() => {
              window.location.reload();
            }, 3500);
          }
        }
      }
    }
  };

  return (
    <>
      <section className="flex h-screen">
        <aside className="hidden w-full flex-1 flex-col bg-[#efeee6] lg:flex">
          <Link to={"/"} className="ml-8 mt-7 flex items-center">
            <h1 className="font-jomhuria text-6xl">FairBank</h1>
          </Link>
          <img
            src="/images/login.svg"
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
              {step === 3 && <ImageUpload />}
              {step === 4 && <NameForm />}
              {step === 5 && <BirthdayForm />}
              {step === 6 && (
                <PlanForm
                  isLastStep={true}
                  isSubmitting={methods.formState.isSubmitting}
                />
              )}
            </form>
          </FormProvider>
        </main>
      </section>
      <Toaster richColors duration={3000} />
    </>
  );
}
