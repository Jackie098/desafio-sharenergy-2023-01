import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import InfiniteScroll from "react-infinite-scroll-component";
import { RandomUser } from "../../../../types/user";
import { GREEN_500 } from "../../../../utils/colors";
import { CardUser } from "../CardUser";
import { spacing } from "@mui/system";

type ListUsersProps = {
  users: RandomUser[];
  setPage: (value: React.SetStateAction<number>) => void;
};

export function ListUsers({ users, setPage }: ListUsersProps) {
  const theme = useTheme();

  return (
    <InfiniteScroll
      initialScrollY={0}
      dataLength={users!.length}
      next={() => {
        setPage((previous) => previous + 1);
      }}
      hasMore={true}
      loader={
        <Box display={"flex"} justifyContent={"center"}>
          <CircularProgress
            size={24}
            sx={{ color: GREEN_500, marginTop: "16px" }}
          />
        </Box>
      }
      scrollThreshold={1}
      style={{
        overflow: "hidden",
        marginTop: "24px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          rowGap: "16px",
          columnGap: "8px",
        }}
      >
        {users?.map((user) => (
          <CardUser key={user.email} userDetails={user} />
        ))}
      </Box>
    </InfiniteScroll>
  );
}
