import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import { GREEN_500 } from "../../utils/colors";
import { Logout } from "./components/Logout";
import { Navigation } from "./components/Navigation";

import logoImage from "/logo_share_energy.png";

type HeaderProps = {
  children: React.ReactNode;
};

export function Header({ children }: HeaderProps) {
  const theme = useTheme();

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        height={"75px"}
        maxWidth={"950px"}
        sx={{
          padding: theme.spacing(0, 2, 0, 2),
        }}
      >
        <Box display="flex" alignItems="center">
          <img
            src={logoImage}
            alt="Logo da aplicação"
            style={{ width: "125px", height: "20px", marginRight: "1rem" }}
          />
          <Navigation />
        </Box>
        <Logout />
      </Box>
      {children}
    </Container>
  );
}
