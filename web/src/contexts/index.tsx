import { ThemeProvider } from "@mui/material";
import { configureDesignSystem } from "../theme/designSystem";
import { AuthProvider } from "./Auth";

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider theme={configureDesignSystem}>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
