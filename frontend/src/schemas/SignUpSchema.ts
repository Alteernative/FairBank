import { z } from "zod";

export const signUpSchema = (step) => {
  switch (step) {
    case 1:
      return z.object({
        email: z.string().email({
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
        image_url: z.any(),
      });
    case 4:
      return z.object({
        first_name: z.string().min(1, {
          message: "Prénom invalide.",
        }),
        last_name: z.string().min(1, {
          message: "Nom invalide.",
        }),
        // TODO: Replace with birthday?
        // age: z.number().gte(18, {
        //   message: "Âge invalide. (18+)",
        // }),
      });
    default:
      return z.object({});
  }
};
