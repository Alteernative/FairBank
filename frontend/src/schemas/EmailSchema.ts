import { useTranslation } from "react-i18next";
import { z } from "zod";

export default function EmailSchema() {
  const { t } = useTranslation();

  return z.object({
    email: z
      .string()
      .min(1, {
        message: `${t("zod.signIn.email.min")}`,
      })
      .email({
        message: `${t("zod.signIn.email.invalid")}`,
      }),
  });
}
