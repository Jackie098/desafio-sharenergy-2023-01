import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type SearchType = "user" | "cat" | "client";

type SearchProps = {
  type: SearchType;
};

export function Search({ type }: SearchProps) {
  return (
    <form action="#">
      <TextField variant="outlined" label="Search an user" />
      <Button>Search</Button>
    </form>
  );
}
