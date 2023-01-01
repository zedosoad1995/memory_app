import { createTheme } from "@mui/material";
import breakpoints from "./breakpoints";
import components from "./components";
import palette from "./palette";
import shadows from "./shadows";
import shape from "./shape";
import typography from "./typography";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }

  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
  }
}

export const theme = createTheme({
  breakpoints,
  components: components as Record<string, any>,
  palette,
  shape,
  shadows,
  typography: typography as Record<string, any>,
});
