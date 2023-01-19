import { Router } from "express";
import { customersRoutes } from "./customers.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/customers", customersRoutes);

export { router };
