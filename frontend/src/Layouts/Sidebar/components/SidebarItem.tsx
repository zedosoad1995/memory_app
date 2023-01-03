import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { ItemButton } from "./styles";

interface IProps {
  url: string;
  icon: React.ReactNode;
  name: string;
}

const SidebarItem: React.FC<IProps> = ({ url, icon, name }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const active = url === location.pathname || undefined;

  return (
    <ListItem>
      <ItemButton
        active={active}
        onClick={() => {
          navigate(url);
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={name} />
      </ItemButton>
    </ListItem>
  );
};

export default SidebarItem;
