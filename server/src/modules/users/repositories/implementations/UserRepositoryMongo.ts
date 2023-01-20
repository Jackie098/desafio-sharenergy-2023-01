import jwt from "jsonwebtoken";
import { authConfig } from "../../../../config/jwt";

import { IUser, UserModel } from "../../model/User";
import { ICreateUserDTO, IUserRepository } from "../IUsersRepository";

class UserRepositoryMongo implements IUserRepository {
  async create({
    name,
    username,
    password,
    email,
    isAdmin,
  }: ICreateUserDTO): Promise<IUser> {
    const userFactory = {
      name,
      username,
      password,
      email,
      isAdmin,
    };

    const user = await UserModel.create(userFactory);

    return user;
  }

  async findOne(username: string, email: string): Promise<IUser | null> {
    const user = await UserModel.findOne({
      $or: [{ username }, { email }],
    }).select("+password");

    return user;
  }

  authenticate(user: IUser): string {
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
        email: user.email,
      },
      authConfig.secret!,
      {
        expiresIn: authConfig.expiresIn,
        subject: authConfig.secret,
      }
    );

    return token;
  }

  delete(id: number): void {
    throw new Error("Method not implemented.");
  }
}

export { UserRepositoryMongo };
