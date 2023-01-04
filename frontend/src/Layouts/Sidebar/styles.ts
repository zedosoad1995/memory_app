import { Paper } from "@mui/material";
import { styled } from "@mui/system";
import { SIDEBAR } from "../../Theme/constants";
import palette from "../../Theme/palette";

export const SidebarContainer = styled(Paper)({
  backgroundColor: palette.neutral[900],
  color: "#FFFFFF",
  width: SIDEBAR.WIDTH,
  height: "calc(100% - 64px)",
  position: "fixed",
  borderRadius: 0,
  transition: `all ${SIDEBAR.TRANSITION_TIME}s ease`,
  "&.visible": {
    transform: "translateX(0)",
  },

  "&.hidden": {
    transform: `translateX(-${SIDEBAR.WIDTH}px)`,
  },
});
