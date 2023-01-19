import * as Yup from "yup";
import { IHandledError } from "../../../../types/Error";
import { ErrorHandler } from "../../../../utils/ErrorHandler";
import { IUserRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  // TODO: Increase handling error and return appropriate error
  async execute(newUser: IRequest): Promise<void> {
    const schema: Yup.SchemaOf<IRequest> = Yup.object().shape({
      name: Yup.string().min(4).required("The name is required"),
      email: Yup.string()
        .email("This email does not a valid email")
        .required("The email is required"),
      username: Yup.string()
        .min(6, "Username must be bigger then 5 chars")
        .required("Username is required"),
      password: Yup.string()
        .min(6, "Passwrod must be bigger then 5 chars")
        .required("Password is required"),
      isAdmin: Yup.boolean(),
    });

    if (!schema.isValidSync(newUser)) {
      throw new Error(
        ErrorHandler({
          code: 400,
          isHandled: true,
          message: "The validation does not match",
        })
      );
    }

    const userAlreadyExists = await this.usersRepository.findOne(
      newUser.username,
      newUser.email
    );

    if (userAlreadyExists) {
      throw new Error(
        ErrorHandler({
          code: 400,
          isHandled: true,
          message: "User already exists",
        })
      );
    }

    try {
      await this.usersRepository.create(newUser);
    } catch (error) {
      throw new Error(
        ErrorHandler({
          code: 500,
          isHandled: true,
          message: "Error while creating a new user",
        })
      );
    }
  }
}

export { CreateUserUseCase };
