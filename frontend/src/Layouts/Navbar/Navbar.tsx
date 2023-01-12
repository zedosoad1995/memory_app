import { Avatar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DashboardNavbarRoot } from "./styles";
import { AccountPopover } from "./components/AccountPopover/AccountPopover";
import React, { useRef, useState } from "react";
import { NAVBAR } from "../../Theme/constants";

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
      <DashboardNavbarRoot position="fixed">
        <Toolbar
          disableGutters
          sx={{
            minHeight: NAVBAR.HEIGHT,
            px: 2,
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <IconButton onClick={onToggleSidebar} sx={{ mr: 2, flexGrow: 1 }}>
              <MenuIcon fontSize="small" />
            </IconButton>
          </div>
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
