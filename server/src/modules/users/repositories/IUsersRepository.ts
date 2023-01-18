import { IUser } from "../model/User";

interface ICreateUserDTO {
  name: string;
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

interface IUserRepository {
  create({
    name,
    username,
    password,
    email,
    isAdmin,
  }: ICreateUserDTO): Promise<IUser>;
  delete(id: number): void;
}

export { ICreateUserDTO, IUserRepository };
