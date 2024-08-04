import { useTranslation } from "react-i18next";
import { z } from "zod";
import ModifyEmailSchema from "./ModifyEmailSchema";

export default function CurrencySchema() {
  const { t } = useTranslation();

  return z.object({
    receiver: ModifyEmailSchema().shape.email.optional(),
    sender: ModifyEmailSchema().shape.email.optional(),
    amount: z
      .string({
        required_error: `${t("zod.currency.amount.required")}`,
      })
      .regex(/^\d+(\.\d{1,2})?$/, {
        message: `${t("zod.currency.amount.invalidFormat")}`,
      })
      .refine((val) => parseFloat(val) >= 0, {
        message: `${t("zod.currency.amount.nonNegative")}`,
      })
      .refine((val) => parseFloat(val) <= 100000, {
        message: `${t("zod.currency.amount.max")}`,
      }),
  });
}
