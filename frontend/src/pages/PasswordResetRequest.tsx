import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  FieldValues,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import AxiosInstance from "../components/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { ModeToggle } from "../components/ModeToggle";
import { LanguageToggle } from "../components/LanguageToggle";
import { useTranslation } from "react-i18next";
import { CircleAlert, Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import ModifyEmailSchema from "@/schemas/ModifyEmailSchema";

const PasswordFields = () => {
  const { t } = useTranslation();
  const {
    register,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  return (
    <section className="ml-2 mr-2 flex flex-col gap-4">
      <div className="relative">
        <FloatingLabelInput
          type="text"
          id="email"
          label={t("input.email")}
          {...register("email")}
          className="h-12"
          autoFocus
          onChange={() => clearErrors("email")}
        />
        {errors.email && (
          <span className="mt-2 flex items-center gap-1 text-xs text-destructive">
            <CircleAlert size={20} />
            {errors.email.message && String(errors.email.message)}
          </span>
        )}
      </div>
    </section>
  );
};

export default function PasswordReset() {
  const methods = useForm({
    resolver: zodResolver(ModifyEmailSchema()),
  });
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSubmit = async (data: FieldValues) => {
    try {
      console.log(data.email);
      AxiosInstance.post(`api/password_reset/`, {
        email: data.email,
      });

      toast.success(`${t("toast.passwordRequestReset.success")}`);
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (error) {
      toast.error(`${t("toast.passwordRequestReset.error")}`);
    }
  };

  return (
    <>
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
          <div className="absolute right-0 top-4 m-5">
            <span className="flex items-end justify-start gap-2">
              <LanguageToggle />
              <ModeToggle />
              <Button asChild variant={"ghost"} className="ml-2">
                <Link to={"/signup"}>{t("buttons.signUp")}</Link>
              </Button>
            </span>
          </div>
          <h1 className="absolute left-7 top-7 font-jomhuria text-6xl lg:hidden">
            <Link to={"/"}>FairBank</Link>
          </h1>

          <Card className="h-[25rem] w-96 border-none shadow-none">
            <CardHeader>
              <CardTitle className="ml-1 text-center text-2xl">
                {t("password-reset.password.title")}
              </CardTitle>
              <CardDescription className="text-center">
                {t("password-reset.password.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-4">
                    <PasswordFields />
                    <Button
                      type="submit"
                      disabled={methods.formState.isSubmitting}
                      className="mt-2 select-none"
                    >
                      {methods.formState.isSubmitting ? (
                        <Loader size={20} className="animate-spin" />
                      ) : (
                        `${t("buttons.submit")}`
                      )}
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </CardContent>
          </Card>
        </main>
      </section>
      <Toaster richColors duration={2500} />
    </>
  );
}
