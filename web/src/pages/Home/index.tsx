import Box from "@mui/material/Box";
import { useMemo, useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Search } from "../../components/Search";
import { listUsers } from "../../services/users";

import { CircularProgress } from "@mui/material";
import { RandomUser } from "../../types/user";
import { ListUsers } from "./components/ListUsers";

export function Home() {
  const queryClient = useQueryClient();

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

  //BUG - USER - when change the tab, and returns before that cache time reach out,
  // the users doesnt load ... useEffect on dismount - invalidate "ListUsers"

  // useEffect(() => {
  //   return () => {
  //     queryClient.invalidateQueries("listUsers");
  //   };
  // }, []);

  return (
    <Box>
      <Search
        type="user"
        users={allUsers!}
        setPage={setPage}
        setFilteredUsers={setFilteredUsers}
      />

      <ListUsers users={filteredUsers || allUsers!} setPage={setPage} />
    </Box>
  );
}
