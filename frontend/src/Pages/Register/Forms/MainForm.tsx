import { Container, Stack, TextField } from "@mui/material";
import PasswordField from "../../../Components/PasswordField/PasswordField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../../Config/Schemas/auth";
import { forwardRef, useImperativeHandle } from "react";

interface IFormData {
  email: string;
  password: string;
}

interface IProps extends IFormData {
  updateData: (data: Partial<IFormData>) => void;
}

const MainForm = forwardRef(({ updateData, email, password }: IProps, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email,
      password,
    },
  });

  useImperativeHandle(ref, () => ({
    checkValid() {
      handleSubmit(() => {})();
      return isValid;
    },
  }));

  const handleChange =
    (label: keyof IFormData) =>
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      updateData({ [label]: e.target.value });
    };

  return (
    <>
      <TextField
        fullWidth
        label="Email"
        type="email"
        variant="outlined"
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        {...register("email", {
          onChange: handleChange("email"),
        })}
      />
      <PasswordField
        register={register("password", {
          onChange: handleChange("password"),
        })}
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
      />
    </>
  );
});

export default MainForm;
