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
import { login } from "../../Services/auth";
import { useForm } from "react-hook-form";

interface IFormData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<IFormData>();

  const handleGoToRegister = () => {
    navigate("/register");
  };

  const onSubmit = async ({ email, password }: IFormData) => {
    const res = await login(email, password);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    navigate("/");
  };

  if (
    Boolean(localStorage.getItem("token")) &&
    Boolean(localStorage.getItem("user"))
  ) {
    return <Navigate to="/" />;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mt: 10, mb: 3 }}>
        Login
      </Typography>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            {...register("email")}
          />
          <PasswordField register={register("password")} />
          <div>
            <Button
              sx={{ mb: 2 }}
              fullWidth
              variant="contained"
              size="large"
              type="submit"
            >
              Sign In
            </Button>
            <Typography color="text.secondary" variant="body2">
              Don't have an account?{" "}
              <Link
                onClick={handleGoToRegister}
                variant="subtitle2"
                sx={{
                  cursor: "pointer",
                }}
                underline="hover"
              >
                Sign Up
              </Link>
            </Typography>
          </div>
        </Stack>
      </form>
    </Container>
  );
};

export default Login;
