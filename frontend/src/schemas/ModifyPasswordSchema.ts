import { useTranslation } from "react-i18next";
import { z } from "zod";

export default function ModifyPasswordSchema() {
  const { t } = useTranslation();

  return z
    .object({
      password: z
        .string()
        .min(8, {
          message: `${t("zod.signUp.password.min")}`,
        })
        .regex(/[A-Z]/, {
          message: `${t("zod.signUp.password.upper")}`,
        })
        .regex(/[a-z]/, {
          message: `${t("zod.signUp.password.lower")}`,
        })
        .regex(/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/, {
          message: `${t("zod.signUp.password.special")}`,
        }),
      re_password: z.string(),
    })
    .refine((data) => data.password === data.re_password, {
      message: `${t("zod.signUp.password.confirm")}`,
      path: ["re_password"],
    });
}
