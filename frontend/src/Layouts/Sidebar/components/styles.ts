import styled from "@emotion/styled";
import { ListItemButton } from "@mui/material";
import palette from "../../../Theme/palette";

export const ItemButton = styled(ListItemButton)<{ active: 0 | 1 }>(
  ({ active }) => ({
    backgroundColor: active ? "rgba(255,255,255, 0.08)" : undefined,
    borderRadius: "8px",
    color: active ? palette.secondary.main : "inherit",
    "& .MuiListItemText-root": {
      "& .MuiTypography-root": {
        fontWeight: active ? "fontWeightBold" : undefined,
      },
    },
    justifyContent: "flex-start",
    px: "24px",
    textAlign: "left",
    textTransform: "none",
    width: "100%",
    "& .MuiListItemIcon-root": {
      color: active ? palette.secondary.main : palette.neutral[400],
    },
    "&:hover": {
      backgroundColor: "rgba(255,255,255, 0.08)",
    },
  })
);
