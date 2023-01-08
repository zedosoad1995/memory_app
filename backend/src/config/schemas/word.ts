import { z } from "zod";
import { WORD } from "../../constants/messages";

export const createWordSchema = z.object({
  word: z.string({
    invalid_type_error: WORD.FORM.WORD.MUST_BE_STRING,
    required_error: WORD.FORM.WORD.IS_REQUIRED,
  }),
  translation: z.string({
    invalid_type_error: WORD.FORM.TRANSLATION.MUST_BE_STRING,
    required_error: WORD.FORM.TRANSLATION.IS_REQUIRED,
  }),
  knowledge: z
    .number({
      invalid_type_error: WORD.FORM.KNOWLEDGE.MUST_BE_NUMBER,
      required_error: WORD.FORM.KNOWLEDGE.IS_REQUIRED,
    })
    .min(1, WORD.FORM.KNOWLEDGE.MIN_VALUE(1))
    .max(5, WORD.FORM.KNOWLEDGE.MAX_VALUE(5)),
  relevance: z
    .number({
      invalid_type_error: WORD.FORM.RELEVANCE.MUST_BE_NUMBER,
      required_error: WORD.FORM.RELEVANCE.IS_REQUIRED,
    })
    .min(1, WORD.FORM.RELEVANCE.MIN_VALUE(1))
    .max(5, WORD.FORM.RELEVANCE.MAX_VALUE(5)),
  collectionId: z
    .string({
      invalid_type_error: WORD.FORM.COLLECTION_ID.MUST_BE_STRING,
    })
    .optional(),
});

export const updateWordScoresSchema = z.object({
  collectionId: z
    .string({
      invalid_type_error: WORD.FORM.COLLECTION_ID.MUST_BE_STRING,
    })
    .optional(),
});

export const updateWordSchema = z.object({
  word: z
    .string({
      invalid_type_error: WORD.FORM.WORD.MUST_BE_STRING,
    })
    .optional(),
  translation: z
    .string({
      invalid_type_error: WORD.FORM.TRANSLATION.MUST_BE_STRING,
    })
    .optional(),
  knowledge: z
    .number({
      invalid_type_error: WORD.FORM.KNOWLEDGE.MUST_BE_NUMBER,
    })
    .min(1, WORD.FORM.KNOWLEDGE.MIN_VALUE(1))
    .max(5, WORD.FORM.KNOWLEDGE.MAX_VALUE(5))
    .optional(),
  relevance: z
    .number({
      invalid_type_error: WORD.FORM.RELEVANCE.MUST_BE_NUMBER,
    })
    .min(1, WORD.FORM.RELEVANCE.MIN_VALUE(1))
    .max(5, WORD.FORM.RELEVANCE.MAX_VALUE(5))
    .optional(),
  isSeen: z
    .boolean({
      invalid_type_error: WORD.FORM.IS_SEEN.MUST_BE_BOOLEAN,
    })
    .optional(),
  isLearned: z
    .boolean({
      invalid_type_error: WORD.FORM.IS_SEEN.MUST_BE_BOOLEAN,
    })
    .optional(),
});
