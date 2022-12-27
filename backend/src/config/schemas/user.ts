import { z } from "zod";
import { USER } from "../../constants/messages";

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
});
