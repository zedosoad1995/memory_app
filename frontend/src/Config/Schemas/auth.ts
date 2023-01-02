import { z } from "zod";
import { USER } from "../../Constants/messages";

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, USER.FORM.EMAIL.IS_EMPTY)
    .email(USER.FORM.EMAIL.INVALID),
  password: z.string().min(1, USER.FORM.PASSWORD.IS_EMPTY),
});
