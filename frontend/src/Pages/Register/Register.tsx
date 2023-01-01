import {
  Button,
  Container,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router";
import PasswordField from "../../Components/PasswordField/PasswordField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../Config/Schemas/auth";
import { register as signUp } from "../../Services/auth";
import { toast } from "react-hot-toast";

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

  const onSubmit = async ({ email, password }: IFormData) => {
    const lala = await signUp(email, password, 3);
    console.log(lala.user);
    toast.success("User successfully created.");
    navigate("/login");
  };

  if (localStorage.getItem("token") && localStorage.getItem("user")) {
    return <Navigate to="/" />;
  }

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
