import axios from "axios";

export const randomUserApi = axios.create({
  baseURL: "https://randomuser.me/api/",
});

export const catApi = axios.create({
  baseURL: "https://http.cat/",
  responseType: "arraybuffer",
});

export const dogApi = axios.create({
  baseURL: "https://random.dog/",
});

export const customerApi = axios.create({
  baseURL: "http://localhost:3333/",
});
