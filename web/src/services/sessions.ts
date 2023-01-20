import jwtDecode from "jwt-decode";
import { SignInCredentials } from "../types/session";
import { customerApi } from "./api";

export const signInService = async ({
  username,
  password,
}: SignInCredentials): Promise<{
  user: any;
  token: string;
}> => {
  const {
    data: { token },
  } = await customerApi.post("/users/authenticate", {
    username,
    password,
  });

  const user = jwtDecode(token);

  return {
    user,
    token,
  };
};
