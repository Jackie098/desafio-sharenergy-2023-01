import { CustomerRepositoryMongo } from "../../repositories/implementations/CustomerRepositoryMongo";
import { UpdateCustomerController } from "./UpdateCustomerController";
import { UpdateCustomerUseCase } from "./UpdateCustomerUseCase";

const customerRepositoryMongo = new CustomerRepositoryMongo();

const updateCustomerUseCase = new UpdateCustomerUseCase(
  customerRepositoryMongo
);

const updateCustomerController = new UpdateCustomerController(
  updateCustomerUseCase
);

export { updateCustomerController };
