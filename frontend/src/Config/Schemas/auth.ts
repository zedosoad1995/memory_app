import { z } from "zod";
import { USER } from "../../Constants/messages";

export const registerSchema = z.object({
  email: z.string({}).email(USER.FORM.EMAIL.INVALID),
  password: z.string({}),
});
