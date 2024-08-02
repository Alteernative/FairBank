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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useUserContext } from "@/contexts/UserContext";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AccountSettings() {
  const { user } = useUserContext();
  const { handleSubmit, register } = useForm();
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const handleEmail = (data: FieldValues) => {
    console.log(data);

    const tmp_email = data.email || user.email;

    const formData = new FormData();
    formData.append("tmp_email", tmp_email);
    AxiosInstance.post(`users/request_update_email/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Update successful:", response.data);
        toast.success(`${t("toast.settings.account.success")}`);
        //    setTimeout(() => window.location.reload(), 3500);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        toast.error(`${t("toast.settings.account.error")}`);
      });
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
        onSubmit={handleSubmit(handleEmail)}
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
            <Input
              type="text"
              placeholder={user.email}
              className="h-12"
              {...register("email")}
            />
            <input
              type="hidden"
              value={user.email}
              {...register("default_email")}
            />
          </CardContent>
        </Card>
        <Button type="submit" className="mt-3 w-32">
          {t("buttons.ask")}
        </Button>
      </form>
      <Separator />
      <form
        onSubmit={handleSubmit(handlePassword)}
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
                {...register("password")}
                className="h-12 pr-12"
                onChange={() => {
                  // clearErrors("password");
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
                {...register("re_password")}
                label={t("input.confirm")}
                className="h-12"
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
          </CardContent>
        </Card>
        <Button type="submit" className="mt-3 w-32">
          {t("buttons.save")}
        </Button>
      </form>
    </main>
  );
}
