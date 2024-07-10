import { z } from "zod";

export const signUpSchema = (step) => {
  switch (step) {
    case 1:
      return z.object({
        email: z
          .string()
          .min(1, {
            message: "Adresse courriel requise.",
          })
          .email({
            message: "Adresse courriel invalide.",
          }),
      });
    case 2:
      return z
        .object({
          password: z
            .string()
            .min(8, {
              message: "Mot de passe doit contenir au moins 8 caractères.",
            })
            .regex(/[A-Z]/, {
              message: "Mot de passe doit contenir au moins une majuscule",
            })
            .regex(/[a-z]/, {
              message: "Mot de passe doit contenir au moins une minuscule",
            })
            .regex(/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/, {
              message:
                "Mot de passe doit contenir au moins un caractère spécial.",
            }),
          re_password: z.string(),
        })
        .refine((data) => data.password === data.re_password, {
          message: "Les mots de passe ne sont pas identiques.",
          path: ["re_password"],
        });
    case 3:
      return z.object({
        first_name: z.string().min(1, {
          message: "Prénom requis.",
        }),
        last_name: z.string().min(1, {
          message: "Nom requis.",
        }),
      });
    case 4:
      return z.object({
        birthday_year: z.coerce
          .number({
            invalid_type_error: "Année invalide.",
          })
          .min(1900, "Année invalide.")
          .max(new Date().getFullYear()),

        // TODO: Find a way to show an error when the month is not selected.
        birthday_month: z.string({
          required_error: "Sélectionner le mois.",
        }),

        birthday_day: z.coerce
          .number({ invalid_type_error: "Jour invalide." })
          .min(1, {
            message: "Jour invalide.",
          })
          .max(31, {
            message: "Jour invalide.",
          }),
      });
  }
};
