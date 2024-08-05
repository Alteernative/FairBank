import { useTranslation } from "react-i18next";
import { z } from "zod";
import EmailSchema from "./EmailSchema";
import PasswordSchema from "./PasswordSchema";
import NameSchema from "./NameSchema";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

export default function SignUpSchema(step: Step) {
  const { t } = useTranslation();

  const emailSchema = z.object({
    email: EmailSchema(),
  });

  const passwordSchema = PasswordSchema();

  const imageSchema = z.object({
    image_url: z.any(),
  });

  const nameSchema = NameSchema();

  const birthdaySchema = z.object({
    birth_year: z.coerce
      .number({
        invalid_type_error: `${t("zod.signUp.birthday.year.invalid")}`,
      })
      .min(1900, `${t("zod.signUp.birthday.year.max")}`)
      .max(new Date().getFullYear(), `${t("zod.signUp.birthday.year.invalid")}`)
      .refine(
        (year) => year <= new Date().getFullYear() - 18,
        `${t("zod.signUp.birthday.year.age")}`
      ),

    birth_month: z.string({
      required_error: `${t("zod.signUp.birthday.month.invalid")}`,
    }),

    birth_day: z.coerce
      .number({ invalid_type_error: `${t("zod.signUp.birthday.day.min")}` })
      .min(1, {
        message: `${t("zod.signUp.birthday.day.min")}`,
      })
      .max(31, {
        message: `${t("zod.signUp.birthday.day.max")}`,
      }),
  });

  const planSchema = z.object({
    plan: z.string().min(1, `${t("zod.signUp.plan.invalid")}`),
  });

  switch (step) {
    case 1:
      return emailSchema;
    case 2:
      return passwordSchema;
    case 3:
      return imageSchema;
    case 4:
      return nameSchema;
    case 5:
      return birthdaySchema;
    case 6:
      return planSchema;
  }
}
