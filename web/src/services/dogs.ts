import { dogApi } from "./api";

// TODO - DOG: create a file type to put dog type
export type RandomDog = {
  fileSizeBytes: 149636;
  url: "https://random.dog/2e5569d8-ac6a-4d4c-b6ef-9393f93dd0f6.jpg";
};

// woof.json?filter=mp4,webm,git
export const randomDog = async (): Promise<RandomDog> => {
  const params = { filter: "mp4,webm,git" };

  const response = await dogApi.get("woof.json", { params });

  return response.data;
};
