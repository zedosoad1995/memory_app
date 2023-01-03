import { List } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SettingsIcon from "@mui/icons-material/Settings";
import SidebarItem from "./components/SidebarItem";
import { SidebarContainer } from "./styles";

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

const Sidebar = () => {
  return (
    <SidebarContainer>
      <List>
        {items.map(({ url, icon, name }) => (
          <SidebarItem key={name} url={url} icon={icon} name={name} />
        ))}
      </List>
    </SidebarContainer>
  );
};

export default Sidebar;
