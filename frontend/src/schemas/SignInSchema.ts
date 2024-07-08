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
