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
        width="100%"
      >
        <TextField
          // inputRef={textRef}
          variant="outlined"
          type="number"
          label="Search a customer"
          sx={{
            marginRight: "8px",
          }}
        />
        <Button type="submit" variant="contained" size="large">
          Search
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            marginLeft: "16px",
            background:
              "linear-gradient(90deg, rgba(0,162,162,1) 0%, rgba(0,162,162,1) 13%, rgba(211,217,41,1) 100%)",
          }}
        >
          Add new Customer
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
