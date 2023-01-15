import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRef } from "react";
import { RandomUser } from "../../types/user";

type SearchType = "user" | "cat" | "client";

type SearchProps = {
  type: SearchType;
  users: RandomUser[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setFilteredUsers: React.Dispatch<
    React.SetStateAction<RandomUser[] | undefined>
  >;
};

export function Search({
  type,
  users,
  setPage,
  setFilteredUsers,
}: SearchProps) {
  const textRef = useRef<HTMLInputElement>(null);

  const handleComparison = (
    { name, email, login }: RandomUser,
    comparator: string
  ): boolean => {
    return (
      name.first.includes(comparator) ||
      name.last.includes(comparator) ||
      email.includes(comparator) ||
      login.username.includes(comparator)
    );
  };

  const submitForm = (event: any) => {
    event.preventDefault();

    if (textRef.current != null || textRef.current!.value !== "") {
      // if (textRef.current.value !== "") {
      //   setPage(1);
      // }

      console.log(textRef.current!.value);
      const comparator = textRef.current!.value;

      const filteredUsers = users.filter((user) => {
        return handleComparison(user, comparator);
      });

      setFilteredUsers(filteredUsers);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={submitForm}
      display="flex"
      alignItems={"center"}
    >
      <TextField
        inputRef={textRef}
        variant="outlined"
        label="Who are you looking for?"
        sx={{
          marginRight: "8px",
        }}
      />
      <Button type="submit" variant="contained" size="large">
        Search
      </Button>
    </Box>
  );
}
