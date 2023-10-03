import { Typography } from "@mui/material";

export default function Dot({ fontSize = "2rem" }: { fontSize?: string }) {
  return (
    <Typography lineHeight={0} fontSize={fontSize}>
      &middot;
    </Typography>
  );
}
