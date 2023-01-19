import { Router } from "express";
import { authUserController } from "../modules/users/useCases/authUser";
import { createUserController } from "../modules/users/useCases/createUser";

const usersRoutes = Router();

usersRoutes.post("/register", (request, response) => {
  return createUserController.handle(request, response);
});

usersRoutes.post("/authenticate", (request, response) => {
  return authUserController.handle(request, response);
});

usersRoutes.delete("/", (request, response) => {
  return response.json({ message: "deleting" });
});

export { usersRoutes };
