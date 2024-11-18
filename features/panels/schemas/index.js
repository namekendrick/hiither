import * as z from "zod";

export const createPanelSchema = z.object({
  title: z.string().min(1, {
    message: "A name is required.",
  }),
});

export const namePanelSchema = z.object({
  title: z.string().min(1, {
    message: "A name is required.",
  }),
});
