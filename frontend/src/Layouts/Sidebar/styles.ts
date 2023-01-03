import { Paper } from "@mui/material";
import { styled } from "@mui/system";
import palette from "../../Theme/palette";

export const SidebarContainer = styled(Paper)({
  backgroundColor: palette.neutral[900],
  color: "#FFFFFF",
  width: 280,
  height: "calc(100% - 64px)",
  position: "fixed",
  borderRadius: 0,
});
