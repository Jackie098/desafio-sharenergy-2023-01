import { CustomerModel, ICustomer } from "../../model/Customer";
import {
  ICreateCustomerDTO,
  ICustomerRepository,
} from "../ICustomerRepository";

class CustomerRepositoryMongo implements ICustomerRepository {
  async create(newCustomer: ICreateCustomerDTO): Promise<void> {
    await CustomerModel.create(newCustomer);
  }

  async list(): Promise<[] | ICustomer[]> {
    return await CustomerModel.find();
  }

  async update(customer: ICustomer): Promise<void> {
    await CustomerModel.updateOne({ _id: customer._id }, customer);
  }

  async delete(id: string): Promise<void> {
    await CustomerModel.deleteOne({ _id: id });
  }
}

export { CustomerRepositoryMongo };
