import * as Yup from "yup";
import { ErrorHandler } from "../../../../utils/ErrorHandler";
import { IUserRepository } from "../../repositories/IUsersRepository";
import bcrypt from "bcryptjs";
import { UserAuth } from "../../../../types/User";
import { IUser } from "../../model/User";

interface IRequest {
  username: string;
  password: string;
}

class AuthUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute(login: IRequest): Promise<UserAuth> {
    const schema: Yup.SchemaOf<IRequest> = Yup.object().shape({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    });

    if (!schema.isValidSync(login)) {
      throw new Error(
        ErrorHandler({
          code: 400,
          isHandled: true,
          message: "The validation does not match",
        })
      );
    }

    const user = await this.usersRepository.findOne(
      login.username,
      login.password
    );

    if (!user) {
      throw new Error(
        ErrorHandler({
          code: 400,
          isHandled: true,
          message: "User does not exists",
        })
      );
    }

    const isPasswordMatch = await bcrypt.compare(
      login.password,
      user.password!
    );

    if (user.username !== login.username || !isPasswordMatch) {
      throw new Error(
        ErrorHandler({
          code: 400,
          isHandled: true,
          message: "The username or password does not match",
        })
      );
    }

    try {
      const token = this.usersRepository.authenticate(user);

      return { token };
    } catch (error) {
      throw new Error(
        ErrorHandler({
          code: 500,
          isHandled: true,
          message: "Error while signing a user",
        })
      );
    }
  }
}

export { AuthUserUseCase };
