import axios from "axios";

export const randomUserApi = axios.create({
  baseURL: "https://randomuser.me/api/",
});

// const configHeaderCatApi = { "content-type": "application/json" };
export const catApi = axios.create({
  baseURL: "https://http.cat/",
  responseType: "arraybuffer",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,HEAD",
    "Content-Type": "image/jpeg",
  },
});

// export const catApi2 = async ()
