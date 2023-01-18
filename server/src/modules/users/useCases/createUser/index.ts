import { UserRepositoryMongo } from "../../repositories/implementations/UserRepositoryMongo";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

// TODO: ".getInstance()"
const userRepositoryMongo = new UserRepositoryMongo();

const createUserUseCase = new CreateUserUseCase(userRepositoryMongo);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
