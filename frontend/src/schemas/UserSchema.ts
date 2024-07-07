import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email({
    message: "Adresse courriel invalide.",
  }),

  // TODO: Error message when password is invalid => Fetch password based on the email
  password: z.string({
    message: "Mot de passe invalide.",
  }),
});

export const signUpSchema = z
  .object({
    email: z.string().email({
      message: "Adresse courriel invalide.",
    }),

    first_name: z.string().min(1, {
      message: "Prénom invalide.",
    }),

    last_name: z.string().min(1, {
      message: "Nom invalide.",
    }),

    age: z.number().gte(18, {
      message: "Âge invalide. (18+)",
    }),

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
        message: "Mot de passe doit contenir au moins un caractère spécial.",
      }),

    rePassword: z.string(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Les mots de passe ne sont pas identiques.",
    path: ["rePassword"],
  });
