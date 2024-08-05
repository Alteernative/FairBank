import { useTranslation } from "react-i18next";
import { z } from "zod";

export default function NameSchema() {
  const { t } = useTranslation();

  return z.object({
    first_name: z
      .string()
      .min(1, {
        message: `${t("zod.signUp.name.firstName.min")}`,
      })
      .regex(/^[A-Za-z]+$/, {
        message: `${t("zod.signUp.name.firstName.invalid")}`,
      }),
    last_name: z
      .string()
      .min(1, {
        message: `${t("zod.signUp.name.lastName.min")}`,
      })
      .regex(/^[A-Za-z]+$/, {
        message: `${t("zod.signUp.name.lastName.invalid")}`,
      }),
  });
}
