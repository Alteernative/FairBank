import { useTranslation } from "react-i18next";
import { z } from "zod";
import EmailSchema from "./EmailSchema";

export default function CurrencySchema() {
  const { t } = useTranslation();

  return z.object({
    receiver: EmailSchema().shape.email.optional(),
    sender: EmailSchema().shape.email.optional(),
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
