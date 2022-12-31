import { z } from "zod";
import { USER } from "../../constants/messages";

export const loginSchema = z.object({
  email: z.string({
    invalid_type_error: USER.FORM.EMAIL.MUST_BE_STRING,
    required_error: USER.FORM.EMAIL.IS_REQUIRED,
  }),
  password: z.string({
    invalid_type_error: USER.FORM.PASSWORD.MUST_BE_STRING,
    required_error: USER.FORM.PASSWORD.IS_REQUIRED,
  }),
});
