import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router";
import { theme } from "../Theme";
import { NAVBAR } from "../Theme/constants";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import { MainContent } from "./styles";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isSidebarDrawer = useMediaQuery(theme.breakpoints.down("md"));

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <Navbar onToggleSidebar={handleToggleSidebar} />
      <Sidebar
        open={isSidebarOpen}
        onClose={handleCloseSidebar}
        isDrawer={isSidebarDrawer}
      />
      <Box sx={{ paddingTop: `${NAVBAR.HEIGHT}px` }}>
        <MainContent
          className={isSidebarOpen && !isSidebarDrawer ? "visible" : "hidden"}
        >
          <Outlet />
        </MainContent>
      </Box>
    </>
  );
};

export default Layout;
