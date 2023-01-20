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
