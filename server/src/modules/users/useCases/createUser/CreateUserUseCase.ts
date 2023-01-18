import {
  ICreateUserDTO,
  IUserRepository,
} from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  execute(newUser: IRequest): void {
    console.log("user use case", newUser);

    // TODO: Validate if user already exists

    // if user already exists
    // if (false) {
    //   throw new Error("User already exists!");
    // }

    this.usersRepository.create(newUser);
  }
}

export { CreateUserUseCase };
