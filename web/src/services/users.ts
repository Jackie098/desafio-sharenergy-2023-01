import { RandomUser } from "../types/user";
import { randomUserApi } from "./api";

export type ResultRandomUserApi = {
  results: RandomUser[];
  info: {
    results: number;
    page: number;
  };
};

const filterAttributes = [
  "name",
  "registered",
  "location",
  "login",
  "email",
  "cell",
  "gender",
  "picture",
];

export const listUsers = async (
  page = 1,
  results = 20
): Promise<ResultRandomUserApi> => {
  const params = { page, results, inc: filterAttributes.join() };

  const response = await randomUserApi.get("", {
    params,
  });

  console.log("in service", response.data);

  return response.data;
};
