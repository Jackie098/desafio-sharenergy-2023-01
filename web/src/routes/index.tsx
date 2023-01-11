import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import { AuthRoutes } from "./AuthRoutes";
import { RootRoutes } from "./RootRoutes";

export function Routes() {
  const { user, loading } = useAuth();

  return (
    <BrowserRouter>{user ? <RootRoutes /> : <AuthRoutes />}</BrowserRouter>
  );
}
