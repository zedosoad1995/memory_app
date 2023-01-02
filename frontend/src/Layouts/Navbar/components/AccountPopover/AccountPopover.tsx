import { Box, MenuItem, MenuList, Popover, Typography } from "@mui/material";
import { getUser, logout } from "../../../../Utils/auth";
import { useNavigate } from "react-router";

interface IProps {
  anchorEl: Element | ((element: Element) => Element) | null | undefined;
  onClose: () => void;
  open: boolean;
}

export const AccountPopover: React.FC<IProps> = ({
  anchorEl,
  onClose,
  open,
}) => {
  const navigate = useNavigate();

  const email = getUser()?.email ?? "";

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: "300px" },
      }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body2">
          {email}
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          "& > *": {
            "&:first-of-type": {
              borderTopColor: "divider",
              borderTopStyle: "solid",
              borderTopWidth: "1px",
            },
            padding: "12px 16px",
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};
