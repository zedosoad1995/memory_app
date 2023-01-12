import { Typography } from "@mui/material";

interface IProps {
  title: string;
}

const PageHeader: React.FC<IProps> = ({ title }) => {
  return <Typography variant="h4">{title}</Typography>;
};

export default PageHeader;
