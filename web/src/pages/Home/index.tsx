import Box from "@mui/material/Box";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Search } from "../../components/Search";
import { listUsers } from "../../services/users";
import { CardUser } from "./components/CardUser";

import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material";
import { RandomUser } from "../../types/user";

export function Home() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<RandomUser[]>();

  const { data: queryUsers, isLoading } = useQuery(
    ["listUsers", page],
    async () => {
      const updatedUsers = await listUsers(page);

      setUsers((previousUsers) => {
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
    (usersByPage === undefined && users?.length === 0)
  ) {
    return <CircularProgress size={24} />;
  }

  return (
    <Box>
      <Search type="user" />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          rowGap: "16px",
          columnGap: "8px",
        }}
      >
        <InfiniteScroll
          initialScrollY={0}
          dataLength={users!.length}
          next={() => {
            // queryUsers!.info.page + 1;
            setPage((previous) => previous + 1);
          }}
          hasMore={true}
          loader={<CircularProgress size={30} />}
          scrollThreshold={1}
          style={{
            overflow: "hidden",
          }}
        >
          {users?.map((user) => (
            <CardUser key={user.email} userDetails={user} />
          ))}
        </InfiniteScroll>
      </Box>
    </Box>
  );
}
