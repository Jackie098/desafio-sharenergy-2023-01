import { Router } from "express";
import { createCustomerController } from "../modules/customers/useCases/createCustomer";
import { deleteCustomerController } from "../modules/customers/useCases/deleteCustomer";
import { listCustomerController } from "../modules/customers/useCases/listCustomer";
import { updateCustomerController } from "../modules/customers/useCases/updateCustomer";

const customersRoutes = Router();

customersRoutes.get("/", (request, response) => {
  return listCustomerController.handle(request, response);
});

customersRoutes.post("/", (request, response) => {
  return createCustomerController.handle(request, response);
});

customersRoutes.put("/:id", (request, response) => {
  return updateCustomerController.handle(request, response);
});

customersRoutes.delete("/:id", (request, response) => {
  return deleteCustomerController.handle(request, response);
});

export { customersRoutes };
