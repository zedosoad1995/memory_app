import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRef, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface IProps {
  register?: UseFormRegisterReturn<string>;
  error?: boolean | undefined;
  helperText?: React.ReactNode;
}

const PasswordField: React.FC<IProps> = ({ register, error, helperText }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();

    setShowPassword((prev) => !prev);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <TextField
      fullWidth
      label="Password"
      type={showPassword ? "text" : "password"}
      variant="outlined"
      inputRef={inputRef}
      error={error}
      helperText={helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handlePasswordToggle}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...register}
    />
  );
};

export default PasswordField;
