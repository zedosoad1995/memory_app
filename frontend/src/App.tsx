import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Layout from "./Layouts";
import { theme } from "./Theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <div>lala</div>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
