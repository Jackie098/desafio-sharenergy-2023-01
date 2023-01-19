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
  findOne(username: string, email: string): Promise<IUser | null>;
  authenticate(user: IUser): string;
  delete(id: number): void;
}

export { ICreateUserDTO, IUserRepository };
