import { AppBar } from "@mui/material";
import { styled } from "@mui/system";
import palette from "../../Theme/palette";
import shadows from "../../Theme/shadows";

export const DashboardNavbarRoot = styled(AppBar)({
  backgroundColor: palette.background.paper,
  boxShadow: shadows[3],
});
