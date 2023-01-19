import { Router } from "express";
import { createCustomerController } from "../modules/customers/useCases/createCustomer";

const customersRoutes = Router();

customersRoutes.post("/", (request, response) => {
  return createCustomerController.handle(request, response);
});
export { customersRoutes };
