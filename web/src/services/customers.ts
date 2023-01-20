import { Customer } from "../types/customers";
import { customerApi } from "./api";

export const listCustomers = async (token: string) => {
  console.log("token ---", token);

  const { data } = await customerApi.get("/customers", {
    headers: { authorization: `Bearer ${token}` },
  });

  console.log("list customers", data);

  return data as Customer[];
};

export const createCustomer = async ({
  customer,
  token,
}: {
  customer: Customer;
  token: string;
}) => {
  const { data } = await customerApi.post(`/customers`, customer, {
    headers: { authorization: `Bearer ${token}` },
  });

  return data;
};

export const updateCustomer = async (
  customer: Customer,
  token: string
): Promise<any> => {
  console.log("customer._id", customer._id);

  const { data } = await customerApi.put(
    `/customers/${customer._id}`,
    customer,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );

  console.log("update customer", data);

  return data;
};
