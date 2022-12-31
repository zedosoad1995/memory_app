import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useState } from "react";
import PasswordField from "../../Components/PasswordField/PasswordField";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <Stack spacing={3}>
        <Typography variant="h4" sx={{ mt: 10 }}>
          Create a new account
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
    </Container>
  );
};

export default Register;
