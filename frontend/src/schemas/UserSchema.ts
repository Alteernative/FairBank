import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email({
    message: "Adresse courriel invalide.",
  }),

  // Error message when password is invalid
  password: z.string({
    message: "Mot de passe invalide.",
  }),
  // password: z.string().min(8, {
  //   message: "Mot de passe doit contenir au moins 8 caractères.",
  // }),
});
