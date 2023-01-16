import { Router } from "express";

const usersRoutes = Router();

usersRoutes.post("/", (request, response) => {
  return response.json({ message: "creating" });
});

usersRoutes.delete("/", (request, response) => {
  return response.json({ message: "deleting" });
});

export { usersRoutes };
