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
        maxWidth: "850px",
        // margin: theme.spacing(4, 0, 4, 0),
      }}
    >
      {children}
    </Box>
  );
}
