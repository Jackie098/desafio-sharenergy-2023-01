import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

type ContentProps = {
  children: React.ReactElement<any, any>;
};

export function Content({ children }: ContentProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        margin: theme.spacing(2, 0),
        width: "100%",
        maxWidth: "800px",
      }}
    >
      {children}
    </Box>
  );
}
