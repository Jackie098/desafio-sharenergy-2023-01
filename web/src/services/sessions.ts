import jwtDecode from "jwt-decode";
import { SignInCredentials } from "../types/session";
import { customerApi } from "./api";

export const signInService = async ({
  username,
  password,
  isRemember,
}: SignInCredentials): Promise<{
  user: any;
  token: string;
  // isAdmin: boolean;
}> => {
  if (username !== "desafiosharenergy" || password !== "sh@r3n3rgy") {
    throw new Error("The user doesnt exists");
  }

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

// username: "desafiosharenergy",
// // password: "sh@r3n3rgy",
// isAdmin: true,
