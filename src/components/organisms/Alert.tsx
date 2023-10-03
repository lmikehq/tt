import MuiAlert from "@mui/material/Alert";

interface AlertProps {
  children: React.ReactNode;
}

export default function Alert({ children }: AlertProps) {
  return <MuiAlert severity="info">{children}</MuiAlert>;
}
