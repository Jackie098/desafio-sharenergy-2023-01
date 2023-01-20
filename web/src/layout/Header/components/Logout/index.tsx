import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";

export function Logout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        signOut();
        navigate("/");
      }}
    >
      Logout
    </Button>
  );
}
