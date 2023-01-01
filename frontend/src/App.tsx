import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Routes from "./Routes";
import { theme } from "./Theme";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
      <Toaster />
    </ThemeProvider>
  );
};

export default App;
