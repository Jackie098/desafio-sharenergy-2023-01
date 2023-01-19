import { Router } from "express";
import { createCustomerController } from "../modules/customers/useCases/createCustomer";
import { deleteCustomerController } from "../modules/customers/useCases/deleteCustomer";
import { listCustomerController } from "../modules/customers/useCases/listCustomer";

const customersRoutes = Router();

customersRoutes.get("/", (request, response) => {
  return listCustomerController.handle(request, response);
});

customersRoutes.post("/", (request, response) => {
  return createCustomerController.handle(request, response);
});
customersRoutes.delete("/:id", (request, response) => {
  return deleteCustomerController.handle(request, response);
});

export { customersRoutes };
