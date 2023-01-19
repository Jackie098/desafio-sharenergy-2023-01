import { CustomerRepositoryMongo } from "../../repositories/implementations/CustomerRepositoryMongo";
import { ListCustomerController } from "./ListCustomerController";
import { ListCustomerUseCase } from "./ListCustomerUseCase";

const customerRepositoryMongo = new CustomerRepositoryMongo();

const listCustomerUseCase = new ListCustomerUseCase(customerRepositoryMongo);

const listCustomerController = new ListCustomerController(listCustomerUseCase);

export { listCustomerController };
