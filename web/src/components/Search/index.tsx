import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRef } from "react";
import { RandomUser } from "../../types/user";

type SearchType = "user" | "cat" | "client";

type SearchProps = {
  type: SearchType;
  users: RandomUser[];
  setUsers: React.Dispatch<React.SetStateAction<RandomUser[] | undefined>>;
};

export function Search({ type, users, setUsers }: SearchProps) {
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

  const submitForm = () => {
    if (textRef.current != null || textRef.current !== "") {
      console.log(textRef.current!.value);
      const comparator = textRef.current!.value;

      const filteredUsers = users.filter((user) => {
        return handleComparison(user, comparator);
      });

      setUsers(filteredUsers);
    }
  };

  return (
    <form onSubmit={submitForm}>
      <TextField inputRef={textRef} variant="outlined" label="Search" />
      <Button type="submit">Search</Button>
    </form>
  );
}
