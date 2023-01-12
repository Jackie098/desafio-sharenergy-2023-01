import Box from "@mui/material/Box";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { Search } from "../../components/Search";
import { listUsers } from "../../services/users";
import { CardUser } from "./components/CardUser";

export function Home() {
  const { data: queryUsers } = useQuery("listUsers", async () => {
    return listUsers();
  });

  const users = useMemo(() => {
    return queryUsers;
  }, [queryUsers]);

  console.log("home - users", users);

  return (
    <Box>
      <Search type="user" />

      <CardUser key={1} />
    </Box>
  );
}
