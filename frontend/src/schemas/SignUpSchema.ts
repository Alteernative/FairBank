import { useTranslation } from "react-i18next";
import { z } from "zod";

type StepProps = 1 | 2 | 3 | 4 | 5 | 6;

export default function SignUpSchema(step: StepProps) {
  const { t } = useTranslation();

  const emailSchema = z.object({
    email: z
      .string()
      .min(1, {
        message: `${t("zod.signUp.email.min")}`,
      })
      .email({
        message: `${t("zod.signUp.email.invalid")}`,
      }),
  });

  const passwordSchema = z
    .object({
      password: z
        .string()
        .min(8, {
          // message: "Mot de passe doit contenir au moins 8 caractères.",
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

  const imageSchema = z.object({
    image_url: z.any(),
  });

  const nameSchema = z.object({
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
