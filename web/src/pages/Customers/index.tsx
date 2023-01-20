import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useAuth } from "../../hooks/useAuth";
import {
  createCustomer,
  listCustomers,
  updateCustomer,
} from "../../services/customers";
import { queryClient } from "../../services/queryClient";
import { Customer, RequestCustomer } from "../../types/customers";
import { ListHeader } from "./components/ListHeader";
import { ListItem } from "./components/ListItem";
import { NewCustomer } from "./components/NewCustomer";

export function Customers() {
  const { getToken } = useAuth();

  const [openModel, setOpenModel] = useState(false);
  const [typeModel, setTypeModal] = useState<"create" | "update">("create");

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

  const createCustomerMutation = useMutation(
    async ({ customer, token }: RequestCustomer) => {
      const result = await createCustomer({ customer, token });

      return result;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("listCustomers");
      },
      onError: (err) => {
        console.log("create store", err);
        // toast
      },
    }
  );

  const updateCustomerMutation = useMutation(
    async ({ customer, token }: { customer: Customer; token: string }) => {
      return await updateCustomer(customer, token);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("listCustomers");
      },
      onError: (err) => {
        console.log("update store", err);
        // toast
      },
    }
  );

  const customers = useMemo(() => {
    if (queryCustomers) {
      return queryCustomers;
    }

    return [];
  }, [queryCustomers]);

  const handleClose = () => {
    setOpenModel(false);
  };

  return (
    <>
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
            variant="contained"
            size="large"
            onClick={() => {
              setOpenModel(true);
              setTypeModal("create");
            }}
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
            <ListItem
              customer={customer}
              id={index + 1}
              setOpenModal={setOpenModel}
              setTypeModal={setTypeModal}
            />
          ))}
        </Box>
      </Box>

      <NewCustomer
        isOpen={openModel}
        type={typeModel}
        onClose={handleClose}
        createCustomerMutation={createCustomerMutation}
        updateCustomerMutation={updateCustomerMutation}
      />
    </>
  );
}
