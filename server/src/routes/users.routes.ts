import { Router } from "express";
import { createUserController } from "../modules/users/useCases/createUser";

const usersRoutes = Router();

usersRoutes.post("/", (request, response) => {
  return createUserController.handle(request, response);
});

usersRoutes.delete("/", (request, response) => {
  return response.json({ message: "deleting" });
});

export { usersRoutes };
