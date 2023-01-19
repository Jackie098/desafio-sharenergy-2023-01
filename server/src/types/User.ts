import { IUser } from "../modules/users/model/User";

export type DBUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  createdAt: Date;
};

export type UserAuth = {
  // user: IUser;
  token: string;
};
