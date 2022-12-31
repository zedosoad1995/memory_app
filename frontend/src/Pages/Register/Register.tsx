import {
  Button,
  Container,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import PasswordField from "../../Components/PasswordField/PasswordField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../Config/Schemas/auth";

interface IFormData {
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(registerSchema),
  });

  const handleGoToLogin = () => {
    navigate("/login");
  };

  console.log(errors);

  const onSubmit = async ({ email, password }: IFormData) => {
    //const res = await login(email, password);
    console.log(email, password);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mt: 10, mb: 3 }}>
        Create a new account
      </Typography>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            {...register("email")}
          />
          <PasswordField
            register={register("password")}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
          <div>
            <Button
              sx={{ mb: 2 }}
              fullWidth
              variant="contained"
              size="large"
              type="submit"
            >
              Sign Up
            </Button>
            <Typography color="text.secondary" variant="body2">
              Have an account?{" "}
              <Link
                onClick={handleGoToLogin}
                variant="subtitle2"
                sx={{
                  cursor: "pointer",
                }}
                underline="hover"
              >
                Sign In
              </Link>
            </Typography>
          </div>
        </Stack>
      </form>
    </Container>
  );
};

export default Register;
