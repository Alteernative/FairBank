import { useTranslation } from "react-i18next";
import { z } from "zod";

export default function ModifyPasswordSchema() {
  const { t } = useTranslation();

  return z.object({
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
