import { List } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SettingsIcon from "@mui/icons-material/Settings";
import SidebarItem from "./components/SidebarItem";
import { SidebarDrawer, SidebarPaper } from "./styles";
import { SIDEBAR } from "../../Theme/constants";

const items = [
  {
    url: "/",
    icon: <HomeIcon />,
    name: "Home",
  },
  {
    url: "/words",
    icon: <MenuBookIcon />,
    name: "Words",
  },
  {
    url: "/settings",
    icon: <SettingsIcon />,
    name: "Settings",
  },
];

interface IProps {
  open: boolean;
  onClose: () => void;
  isDrawer: boolean;
}

const Sidebar: React.FC<IProps> = ({ open, onClose, isDrawer }) => {
  const content = (
    <List>
      {items.map(({ url, icon, name }) => (
        <SidebarItem key={name} url={url} icon={icon} name={name} />
      ))}
    </List>
  );

  return (
    <>
      {isDrawer && (
        <SidebarDrawer
          anchor="left"
          open={open}
          onClose={onClose}
          transitionDuration={SIDEBAR.TRANSITION_TIME * 1000}
        >
          {content}
        </SidebarDrawer>
      )}
      {!isDrawer && (
        <SidebarPaper className={open ? "visible" : "hidden"}>
          {content}
        </SidebarPaper>
      )}
    </>
  );
};

export default Sidebar;
