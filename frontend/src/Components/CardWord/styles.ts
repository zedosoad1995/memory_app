import { Card, Typography } from "@mui/material";
import { styled } from "@mui/system";
import palette from "../../Theme/palette";

export const CardRoot = styled(Card)({
  position: "relative",
  paddingTop: 32,
  maxWidth: 600,
  margin: "0 auto",
});

export const CardNumber = styled(Typography)({
  position: "absolute",
  top: 10,
  right: 25,
  color: palette.neutral[400],
});
