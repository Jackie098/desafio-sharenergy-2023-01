import { ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../services/queryClient";
import { configureDesignSystem } from "../theme/designSystem";
import { AuthProvider } from "./Auth";

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={configureDesignSystem}>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
