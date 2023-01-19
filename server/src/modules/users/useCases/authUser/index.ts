import { UserRepositoryMongo } from "../../repositories/implementations/UserRepositoryMongo";
import { AuthUserController } from "./AuthUserController";
import { AuthUserUseCase } from "./AuthUserUseCase";

// TODO: ".getInstance()"
const userRepositoryMongo = new UserRepositoryMongo();

const authUserUseCase = new AuthUserUseCase(userRepositoryMongo);

const authUserController = new AuthUserController(authUserUseCase);

export { authUserController };
