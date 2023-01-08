import { styled } from "@mui/system";
import { SIDEBAR } from "../Theme/constants";

export const MainContent = styled("div")({
  transition: `all ${SIDEBAR.TRANSITION_TIME}s ease`,
  "&.visible": {
    marginLeft: SIDEBAR.WIDTH,
  },
  "&.hidden": {
    marginLeft: 0,
  },
  padding: "24px",
});
