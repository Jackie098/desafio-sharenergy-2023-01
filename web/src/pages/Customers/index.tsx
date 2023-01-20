import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../../hooks/useAuth";
import { listCustomers } from "../../services/customers";
import { ListHeader } from "./components/ListHeader";
import { ListItem } from "./components/ListItem";

export function Customers() {
  const { getToken } = useAuth();

  const token = getToken();

  const { data: queryCustomers } = useQuery(["listCustomers"], async () => {
    try {
      const response = await listCustomers(token!);

      console.log("useQuery - customers", response);
      return response;
    } catch (error) {
      console.log(error);
    }
  });

  const customers = useMemo(() => {
    if (queryCustomers) {
      return queryCustomers;
    }

    return [];
  }, [queryCustomers]);

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
        {customers.map((customer, index) => (
          <ListItem customer={customer} id={index + 1} />
        ))}
      </Box>
    </Box>
  );
}
