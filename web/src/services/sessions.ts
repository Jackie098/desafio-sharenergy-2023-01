import { SignInCredentials } from "../types/session";

export const signInService = async ({
  username,
  password,
  isRemember,
}: SignInCredentials): Promise<{
  username: string;
  isAdmin: boolean;
}> => {
  if (username !== "desafiosharenergy" || password !== "sh@r3n3rgy") {
    throw new Error("The user doesnt exists");
  }

  return {
    username: "desafiosharenergy",
    // password: "sh@r3n3rgy",
    isAdmin: true,
  };
};
