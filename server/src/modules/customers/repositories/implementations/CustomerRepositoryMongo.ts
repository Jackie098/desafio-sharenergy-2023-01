import { UpdateCustomer } from "../../../../types/Customer";
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

  async findOneById(id: string): Promise<ICustomer | null> {
    const customer = await CustomerModel.findOne({
      _id: id,
    });

    return customer;
  }

  async update(id: string, customer: UpdateCustomer): Promise<any> {
    return await CustomerModel.updateOne({ _id: id }, customer);
  }

  async delete(id: string): Promise<void> {
    await CustomerModel.deleteOne({ _id: id });
  }
}

export { CustomerRepositoryMongo };
