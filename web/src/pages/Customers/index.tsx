import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ListHeader } from "./components/ListHeader";
import { ListItem } from "./components/ListItem";

export function Customers() {
  return (
    <Box>
      <Box
        component="form"
        // onSubmit={submitForm}
        display="flex"
        alignItems={"center"}
      >
        <TextField
          // inputRef={textRef}
          variant="outlined"
          type="number"
          label="Choose a status code"
          sx={{
            marginRight: "8px",
          }}
        />
        <Button type="submit" variant="contained" size="large">
          Search
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "32px",
        }}
      >
        <ListHeader />
        <ListItem />
      </Box>
    </Box>
  );
}
