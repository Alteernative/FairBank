import { useTranslation } from "react-i18next";
import { z } from "zod";

const { t } = useTranslation();

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: `${t("zod.signIn.email.min")}`,
    })
    .email({
      message: `${t("zod.signIn.email.invalid")}`,
    }),

  password: z
    .string()
    .min(1, {
      message: `${t("zod.signIn.password.min")}`,
    })
    .min(8, {
      message: `${t("zod.signIn.password.invalid")}`,
    }),
});
