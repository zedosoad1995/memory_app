import { z } from "zod";
import { WORD } from "../../Constants/messages";

export const wordSchema = z.object({
  word: z
    .string()
    .min(1, WORD.FORM.WORD.IS_EMPTY)
    .max(100, WORD.FORM.WORD.MAX_LEN(100)),
  translation: z
    .string()
    .min(1, WORD.FORM.TRANSLATION.IS_EMPTY)
    .max(100, WORD.FORM.TRANSLATION.MAX_LEN(100)),
  knowledge: z.number(),
  relevance: z.number(),
  isLearned: z.boolean(),
});
