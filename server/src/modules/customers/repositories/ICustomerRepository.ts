import { ICustomer } from "../model/Customer";

interface ICreateCustomerDTO {
  name: string;
  email: string;
  cellphone: string;
  street?: string;
  district?: string;
  houseNumber?: number;
  cpf: string;
}

interface ICustomerRepository {
  create(data: ICreateCustomerDTO): Promise<void>;
  list(): Promise<ICustomer[] | []>;
  findOne(email: string, cpf: string): Promise<ICustomer | null>;
  findOneById(id: string): Promise<ICustomer | null>;
  update(customer: ICustomer): void;
  delete(id: string): void;
}

export { ICreateCustomerDTO, ICustomerRepository };
