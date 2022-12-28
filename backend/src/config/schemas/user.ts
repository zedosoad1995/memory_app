import { z } from "zod";
import { USER } from "../../constants/messages";
import { isTimezoneValid } from "../../helpers/dateTime";

export const createUserSchema = z.object({
  email: z
    .string({
      invalid_type_error: USER.FORM.EMAIL.MUST_BE_STRING,
      required_error: USER.FORM.EMAIL.IS_REQUIRED,
    })
    .email(USER.FORM.EMAIL.INVALID),
  password: z.string({
    invalid_type_error: USER.FORM.PASSWORD.MUST_BE_STRING,
    required_error: USER.FORM.PASSWORD.IS_REQUIRED,
  }),
  timezone: z
    .string({
      invalid_type_error: USER.FORM.TIMEZONE.MUST_BE_STRING,
      required_error: USER.FORM.TIMEZONE.IS_REQUIRED,
    })
    .refine((arg) => isTimezoneValid(arg), USER.FORM.TIMEZONE.INVALID)
    .optional(),
});

export const updateUserSchema = z.object({
  timezone: z
    .string({
      invalid_type_error: USER.FORM.TIMEZONE.MUST_BE_STRING,
      required_error: USER.FORM.TIMEZONE.IS_REQUIRED,
    })
    .refine((arg) => isTimezoneValid(arg), USER.FORM.TIMEZONE.INVALID)
    .optional(),
});
