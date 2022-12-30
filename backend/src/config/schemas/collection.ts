import { z } from "zod";
import { COLLECTION } from "../../constants/messages";

export const createCollectionSchema = z.object({
  name: z.string({
    invalid_type_error: COLLECTION.FORM.NAME.MUST_BE_STRING,
    required_error: COLLECTION.FORM.NAME.IS_REQUIRED,
  }),
});

export const updateCollectionSchema = z.object({
  name: z
    .string({
      invalid_type_error: COLLECTION.FORM.NAME.MUST_BE_STRING,
    })
    .optional(),
});
