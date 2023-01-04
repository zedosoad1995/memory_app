import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import { MainContent } from "./styles";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <Navbar onToggleSidebar={handleToggleSidebar} />
      <Sidebar open={isSidebarOpen} />
      <MainContent className={isSidebarOpen ? "visible" : "hidden"}>
        <Outlet />
      </MainContent>
    </>
  );
};

export default Layout;
