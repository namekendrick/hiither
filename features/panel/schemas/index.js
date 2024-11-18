import * as z from "zod";

export const CommentSchema = z.object({
  text: z.string().min(3, {
    message: "A longer comment is required.",
  }),
});
