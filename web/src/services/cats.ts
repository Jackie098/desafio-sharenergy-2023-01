import { catApi } from "./api";

export const findOneCat = async (statusCode: number | null): Promise<any> => {
  if (statusCode == null) {
    return;
  }

  const response = await catApi.get(`${statusCode}`);

  console.log("cat in service", response);

  return response;
};
