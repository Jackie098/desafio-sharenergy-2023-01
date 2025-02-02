export type Customer = {
  _id?: string;
  name: string;
  email: string;
  cellphone?: string;
  cpf: string;
  houseNumber?: number;
  district?: string;
  street?: string;
};

export type RequestCustomer = {
  customer: Customer;
  token: string;
};
