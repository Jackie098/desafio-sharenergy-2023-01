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

  async findOne(email: string, cpf: string): Promise<ICustomer | null> {
    const customer = await CustomerModel.findOne({
      $or: [{ email }, { cpf }],
    });

    return customer;
  }

  async update(customer: ICustomer): Promise<void> {
    await CustomerModel.updateOne({ _id: customer._id }, customer);
  }

  async delete(id: string): Promise<void> {
    await CustomerModel.deleteOne({ _id: id });
  }
}

export { CustomerRepositoryMongo };
