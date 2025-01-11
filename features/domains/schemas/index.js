import * as z from "zod";

export const addDomainSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Enter at least 4 characters!" })
    .refine(
      (value) =>
        /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,3}$/.test(value ?? ""),
      "This is not a valid domain!",
    ),
});
