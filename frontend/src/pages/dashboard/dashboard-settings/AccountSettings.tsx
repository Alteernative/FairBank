import AxiosInstance from "@/components/AxiosInstance";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { Separator } from "@/components/ui/separator";
import { useUserContext } from "@/contexts/UserContext";
import ModifyEmailSchema from "@/schemas/ModifyEmailSchema";
import ModifyPasswordSchema from "@/schemas/ModifyPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, Eye, EyeOff, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AccountSettings() {
  const { user } = useUserContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const {
    handleSubmit: handleEmailSubmit,
    register: registerEmail,
    setValue: setValueEmail,
    clearErrors: clearErrorsEmail,
    formState: { errors: errorsEmail, isSubmitting: isSubmittingEmail },
  } = useForm({
    resolver: zodResolver(ModifyEmailSchema()),
  });

  const {
    handleSubmit: handlePasswordSubmit,
    register: registerPassword,
    setError: setErrorPassword,
    clearErrors: clearErrorsPassword,
    formState: { errors: errorsPassword, isSubmitting: isSubmittingPassword },
  } = useForm({
    resolver: zodResolver(ModifyPasswordSchema()),
  });

  useEffect(() => {
    setValueEmail("email", user.email);
  }, [user, setValueEmail]);

  const handleClick = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const handleEmail = async (data: FieldValues) => {
    try {
      console.log(data);

      const tmp_email = data.email || user.email;

      const formData = new FormData();

      formData.append("tmp_email", tmp_email);

      const response = await AxiosInstance.post(
        `users/request_update_email/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Update successful:", response.data);
      toast.success(`${t("toast.settings.account.email.success")}`);
    } catch (error: any) {
      console.error("Error updating user:", error);
      toast.error(`${t("toast.settings.account.email.error")}`);

      // Option 2:
      // const errorResponseData = error.response.data;
      // if (
      //   errorResponseData.error ===
      //   "Temporary names and current names are identical"
      // ) {
      //   toast.error(`${t("toast.settings.account.email.error.identical")}`);
      // } else {
      // }
      // TODO: Add to translation files
      // "error": {
      //     "all": "Une erreur est survenue lors de la demande de modification de votre nom.",
      //   "identical": "Le prénom et le nom que vous avez saisis sont identiques à vos valeurs actuelles."
      // }
    }
  };

  const handlePassword = async (data: FieldValues) => {
    try {
      const formData = new FormData();
      formData.append("password", data.password);

      await AxiosInstance.put(`users/${user.id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(`${t("toast.settings.account.password.success")}`);
      localStorage.removeItem("Token");
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(`${t("toast.settings.account.password.error")}`);
    }
  };

  return (
    <main className="ml-14 flex min-h-screen w-full flex-col gap-4 bg-muted/20 px-3 pt-[7rem] sm:px-10 lg:ml-52">
      <form
        onSubmit={handleEmailSubmit(handleEmail)}
        className="flex flex-col gap-4"
      >
        <Card className="w-full sm:w-10/12">
          <CardHeader>
            <CardTitle>{t("settings.account.card1.title")}</CardTitle>
            <CardDescription>
              {t("settings.account.card1.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FloatingLabelInput
              type="text"
              id="email"
              label={t("input.email")}
              className="h-12"
              {...registerEmail("email")}
              onChange={() => clearErrorsEmail("email")}
            />
            <input
              type="hidden"
              value={user.email}
              {...registerEmail("default_email")}
            />
            {errorsEmail.email && (
              <span className="mt-2 flex items-center gap-1 text-xs text-destructive">
                <CircleAlert size={20} />
                {errorsEmail.email.message && String(errorsEmail.email.message)}
              </span>
            )}
          </CardContent>
        </Card>
        <Button
          type="submit"
          disabled={isSubmittingEmail}
          className="mt-2 w-40 select-none"
        >
          {isSubmittingEmail ? (
            <Loader size={20} className="animate-spin" />
          ) : (
            `${t("buttons.ask")}`
          )}
        </Button>
      </form>
      <Separator />
      <form
        onSubmit={handlePasswordSubmit(handlePassword)}
        className="flex flex-col gap-4"
      >
        <Card className="w-full sm:w-10/12">
          <CardHeader>
            <CardTitle>{t("settings.account.card2.title")}</CardTitle>
            <CardDescription>
              {t("settings.account.card2.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <FloatingLabelInput
                type={passwordType}
                id="password"
                autoComplete="off"
                label={t("input.password")}
                {...registerPassword("password")}
                className="h-12 pr-12"
                onChange={() => {
                  clearErrorsPassword("password");
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
            {errorsPassword.password && (
              <span className="mt-2 flex items-center gap-1 text-xs text-destructive">
                <CircleAlert size={20} />
                {errorsPassword.password.message &&
                  String(errorsPassword.password.message)}
              </span>
            )}
          </CardContent>
        </Card>
        <Card className="w-full sm:w-10/12">
          <CardHeader>
            <CardTitle>{t("settings.account.card3.title")}</CardTitle>
            <CardDescription>
              {t("settings.account.card3.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <FloatingLabelInput
                type={passwordType}
                id="re_password"
                autoComplete="off"
                label={t("input.confirm")}
                className="h-12"
                {...registerPassword("re_password")}
                onChange={() => clearErrorsPassword("re_password")}
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
            {errorsPassword.re_password && (
              <span className="mt-2 flex items-center gap-1 text-xs text-destructive">
                <CircleAlert size={20} />
                {errorsPassword.re_password.message &&
                  String(errorsPassword.re_password.message)}
              </span>
            )}
          </CardContent>
        </Card>
        <Button
          type="submit"
          disabled={isSubmittingPassword}
          className="mt-2 w-40 select-none"
        >
          {isSubmittingPassword ? (
            <Loader size={20} className="animate-spin" />
          ) : (
            `${t("buttons.save")}`
          )}
        </Button>
      </form>
    </main>
  );
}
