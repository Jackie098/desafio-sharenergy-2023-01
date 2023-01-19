import { CustomerRepositoryMongo } from "../../repositories/implementations/CustomerRepositoryMongo";
import { DeleteCustomerController } from "./DeleteCustomerController";
import { DeleteCustomerUseCase } from "./DeleteCustomerUseCase";

const customerRepositoryMongo = new CustomerRepositoryMongo();

const deleteCustomerUseCase = new DeleteCustomerUseCase(
  customerRepositoryMongo
);

const deleteCustomerController = new DeleteCustomerController(
  deleteCustomerUseCase
);

export { deleteCustomerController };
