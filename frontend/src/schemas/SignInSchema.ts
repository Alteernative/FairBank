import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email({
    message: "Adresse courriel invalide.",
  }),

  password: z
    .string()
    .min(1, {
      message: "Mot de passe requis.",
    })
    .min(8, {
      message: "Mot de passe invalide.",
    }),
});
