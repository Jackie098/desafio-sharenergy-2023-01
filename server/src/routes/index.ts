import { Router } from "express";
import { CheckSession } from "../middlewares/auth";
import { customersRoutes } from "./customers.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);

router.use(CheckSession);
router.use("/customers", customersRoutes);

export { router };
