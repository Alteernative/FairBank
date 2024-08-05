import { useTranslation } from "react-i18next";
import { z } from "zod";
import EmailSchema from "./EmailSchema";

export default function SignInSchema() {
  const { t } = useTranslation();

  return z.object({
    email: EmailSchema().shape.email,

    password: z
      .string()
      .min(1, {
        message: `${t("zod.signIn.password.min")}`,
      })
      .min(8, {
        message: `${t("zod.signIn.password.invalid")}`,
      }),
  });
}
