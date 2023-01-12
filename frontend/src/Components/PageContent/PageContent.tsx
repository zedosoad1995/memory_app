import { Box } from "@mui/material";

interface IProps {
  children: React.ReactNode;
}

const PageContent: React.FC<IProps> = ({ children }) => {
  return <Box sx={{ my: 4 }}>{children}</Box>;
};

export default PageContent;
