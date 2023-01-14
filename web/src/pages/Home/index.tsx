import Box from "@mui/material/Box";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Search } from "../../components/Search";
import { listUsers } from "../../services/users";

import { CircularProgress } from "@mui/material";
import { RandomUser } from "../../types/user";
import { ListUsers } from "./components/ListUsers";

export function Home() {
  const [page, setPage] = useState(1);
  const [allUsers, setAllUsers] = useState<RandomUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<RandomUser[]>();

  const { data: queryUsers, isLoading } = useQuery(
    ["listUsers", page],
    async () => {
      const updatedUsers = await listUsers(page);

      setAllUsers((previousUsers) => {
        if (previousUsers !== undefined) {
          return [...previousUsers!, ...updatedUsers.results];
        } else {
          return updatedUsers.results;
        }
      });

      return updatedUsers;
    },
    {
      keepPreviousData: true,
    }
  );

  const usersByPage = useMemo(() => {
    return queryUsers?.results;
  }, [queryUsers]);

  if (
    isLoading === true ||
    (usersByPage === undefined && allUsers?.length === 0)
  ) {
    return (
      <Box display={"flex"} justifyContent={"center"}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  return (
    <Box>
      <Search
        type="user"
        users={allUsers!}
        setFilteredUsers={setFilteredUsers}
      />

      <ListUsers users={filteredUsers || allUsers!} setPage={setPage} />
    </Box>
  );
}
