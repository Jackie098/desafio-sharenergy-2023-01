import { ObjectId } from "mongoose";

export type UpdateCustomer = {
  name?: string;
  email?: string;
  cellphone?: string;
  cpf?: string;
  street?: string;
  district?: string;
  houseNumber?: number;
};
