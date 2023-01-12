import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";

export function Navigation() {
  const navigate = useNavigate();

  const handleNavigate = (router: string) => {
    navigate(router);
  };

  return (
    <Box component="div">
      {/* <Box component="div"> */}
      <Button onClick={() => handleNavigate("")}>Home</Button>
      <Button onClick={() => handleNavigate("cats")}>Cats Code</Button>
      <Button onClick={() => handleNavigate("dogs")}>Random Dogs</Button>
      <Button onClick={() => handleNavigate("customers")}>Customers</Button>
      {/* </Box> */}
    </Box>
  );
}
