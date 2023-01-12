import axios from "axios";

export const randomUserApi = axios.create({
  baseURL: "https://randomuser.me/api/",
});

// const handleBeforeRequest = (config: any) => {
//   return config;
// };

// randomUserApi.interceptors.request.use(handleBeforeRequest);
