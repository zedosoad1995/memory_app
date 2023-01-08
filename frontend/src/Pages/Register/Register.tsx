import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router";
import { register as signUp } from "../../Services/auth";
import { toast } from "react-hot-toast";
import MainForm from "./Forms/MainForm";
import { useEffect, useRef, useState } from "react";
import OptionsForm from "./Forms/OptionsForm";
import { isAuth } from "../../Utils/auth";

interface IFormRef {
  checkValid: () => boolean;
}

interface IFormData {
  email: string;
  password: string;
  numDailyWords: number;
  language: string;
}

const INITIAL_DATA: IFormData = {
  email: "",
  password: "",
  numDailyWords: 3,
  language: "German",
};

const components = [MainForm, OptionsForm];

const Register = () => {
  const navigate = useNavigate();
  const formRef = useRef<IFormRef>(null);

  const [data, setData] = useState(INITIAL_DATA);
  const [formStage, setFormStage] = useState(0);

  const Form = components[formStage];

  const updateData = (data: Partial<IFormData>) => {
    setData((prev) => {
      return { ...prev, ...data };
    });
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  const onSubmit = async () => {
    await signUp(data.email, data.password, data.numDailyWords, data.language);
    toast.success("User successfully created.");
    navigate("/login");
  };

  const handleBackButton = () => {
    setFormStage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextButton = () => {
    const isValid = formRef.current?.checkValid();
    if (!isValid) return;

    if (formStage >= components.length - 1) {
      onSubmit();
    } else {
      setFormStage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleNextButton();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [formStage]);

  if (isAuth()) {
    return <Navigate to="/" />;
  }

  return (
    <Container maxWidth="sm">
      <Stack spacing={3}>
        <Typography variant="h4" sx={{ mt: 10 }}>
          Create a new account
        </Typography>
        <Form ref={formRef} {...data} updateData={updateData} />
        <div>
          {formStage === 0 && (
            <>
              <Button
                onClick={handleNextButton}
                sx={{ mb: 2 }}
                fullWidth
                variant="contained"
                size="large"
                type="submit"
              >
                {components.length === 1 ? "Create" : "Next"}
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
            </>
          )}
          {formStage > 0 && (
            <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
              <Button
                onClick={handleBackButton}
                sx={{ mb: 2 }}
                variant="outlined"
                size="large"
                type="submit"
              >
                Back
              </Button>
              <Button
                onClick={handleNextButton}
                sx={{ mb: 2 }}
                variant="contained"
                size="large"
                type="submit"
              >
                {formStage >= components.length - 1 ? "Create" : "Next"}
              </Button>
            </Box>
          )}
        </div>
      </Stack>
    </Container>
  );
};

export default Register;
