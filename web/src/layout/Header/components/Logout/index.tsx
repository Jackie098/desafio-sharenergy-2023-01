import Button from "@mui/material/Button";
import { useAuth } from "../../../../hooks/useAuth";

export function Logout() {
  const { signOut } = useAuth();

  return <Button onClick={() => signOut()}>Logout</Button>;
}
