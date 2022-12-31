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

const Login = () => {
  const navigate = useNavigate();

  const handleGoToRegister = () => {
    navigate("/register");
  };

  return (
    <Container maxWidth="sm">
      <Stack spacing={3}>
        <Typography variant="h4" sx={{ mt: 10 }}>
          Login
        </Typography>
        <TextField fullWidth label="Email" type="email" variant="outlined" />
        <PasswordField />
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
    </Container>
  );
};

export default Login;
