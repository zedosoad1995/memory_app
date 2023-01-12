import { Drawer, Paper } from "@mui/material";
import { styled } from "@mui/system";
import { NAVBAR, SIDEBAR } from "../../Theme/constants";
import palette from "../../Theme/palette";

export const SidebarPaper = styled(Paper)({
  backgroundColor: palette.neutral[900],
  color: "#FFFFFF",
  width: SIDEBAR.WIDTH,
  height: "100%",
  position: "fixed",
  borderRadius: 0,
  transition: `all ${SIDEBAR.TRANSITION_TIME}s ease`,
  "&.visible": {
    transform: "translateX(0)",
  },
  paddingTop: NAVBAR.HEIGHT,
  "&.hidden": {
    transform: `translateX(-${SIDEBAR.WIDTH}px)`,
  },
});

export const SidebarDrawer = styled(Drawer)({
  "& .MuiPaper-root": {
    transform: `translateX(-${SIDEBAR.WIDTH}px)`,
    backgroundColor: palette.neutral[900],
    color: "#FFFFFF",
    width: SIDEBAR.WIDTH,
  },
});
