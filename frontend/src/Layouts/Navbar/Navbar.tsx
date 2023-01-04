import { Avatar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DashboardNavbarRoot } from "./styles";
import { AccountPopover } from "./components/AccountPopover/AccountPopover";
import React, { useRef, useState } from "react";

interface IProps {
  onToggleSidebar: () => void;
}

const Navbar: React.FC<IProps> = ({ onToggleSidebar }) => {
  const avatarRef = useRef<HTMLInputElement>(null);

  const [openAccountMenu, setOpenAccountMenu] = useState(false);

  const handleClickAvatar = () => {
    setOpenAccountMenu(true);
  };

  const handleCloseAvatarMenu = () => {
    setOpenAccountMenu(false);
  };

  return (
    <>
      <DashboardNavbarRoot position="static">
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            px: 2,
            justifyContent: "space-between",
          }}
        >
          <IconButton onClick={onToggleSidebar} sx={{ mr: 2 }}>
            <MenuIcon fontSize="small" />
          </IconButton>
          <Avatar
            onClick={handleClickAvatar}
            ref={avatarRef}
            sx={{
              cursor: "pointer",
            }}
          />
        </Toolbar>
      </DashboardNavbarRoot>
      <AccountPopover
        anchorEl={avatarRef.current}
        open={openAccountMenu}
        onClose={handleCloseAvatarMenu}
      />
    </>
  );
};

export default Navbar;
