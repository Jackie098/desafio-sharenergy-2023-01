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
    console.log("repository", name, username, password, email);

    const userFactory = {
      name,
      username,
      password,
      email,
      isAdmin,
    };

    const user = await UserModel.create(userFactory);
    console.log(user);

    return user;
  }

  delete(id: number): void {
    throw new Error("Method not implemented.");
  }
}

export { UserRepositoryMongo };
