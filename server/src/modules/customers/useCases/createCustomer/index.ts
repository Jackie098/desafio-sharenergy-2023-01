import { CustomerRepositoryMongo } from "../../repositories/implementations/CustomerRepositoryMongo";
import { CreateCustomerController } from "./CreateCustomerController";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";

const customerRepositoryMongo = new CustomerRepositoryMongo();

const createCustomerUseCase = new CreateCustomerUseCase(
  customerRepositoryMongo
);

const createCustomerController = new CreateCustomerController(
  createCustomerUseCase
);

export { createCustomerController };
