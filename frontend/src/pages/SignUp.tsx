import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import SignUpSchema from "@/schemas/SignUpSchema.ts";
import AxiosInstance from "../components/AxiosInstance.tsx";
import EmailForm from "./signup/EmailForm.tsx";
import PasswordForm from "./signup/PasswordForm.tsx";
import ImageUpload from "@/pages/signup/ImageUpload.tsx";
import NameForm from "./signup/NameForm.tsx";
import BirthdayForm from "./signup/BirthdayForm.tsx";
import { toast, Toaster } from "sonner";
import PlanForm from "./signup/PlanForm.tsx";
import { ModeToggle } from "@/components/ModeToggle.tsx";
import { LanguageToggle } from "@/components/LanguageToggle.tsx";
import { useTranslation } from "react-i18next";

type FormValues = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  re_password: string;
  plan: string;
};

type Step = 1 | 2 | 3 | 4 | 5 | 6;

export default function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(1);
  const stepSchema = SignUpSchema(step as Step);
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
    const allData = { ...formData, ...data } as Record<string, any>;
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
          toast.success(`${t("toast.signUp.success")}`);
          setTimeout(() => {
            navigate(`/signin`);
          }, 3500);
        }
      } catch (error: any) {
        if (error.response) {
          console.error("Error response:", error.response);
          console.error("Error status:", error.response.status);
          const errorResponseData = error.response.data;
          console.error("Errors data:", errorResponseData);

          if (
            error.response.status === 400 &&
            errorResponseData.error === "User already exists and is active"
          ) {
            toast.error(`${t("toast.signUp.error")}`);
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
        <aside className="hidden w-full flex-1 flex-col bg-[#efeee6] dark:bg-slate-900 lg:flex">
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
          <div className="absolute right-0 top-4 m-5">
            <span className="flex items-end justify-start gap-2">
              <LanguageToggle />
              <ModeToggle />
              <Button asChild variant={"ghost"} className="ml-2">
                <Link to={"/signin"}>{t("buttons.signIn")}</Link>
              </Button>
            </span>
          </div>

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
