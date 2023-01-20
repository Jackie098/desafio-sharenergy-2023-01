import dotenv from "dotenv";
dotenv.config();

export const authConfig = {
  secret: process.env.AUTH_CONFIG_SECRET,
  expiresIn: 24 * 60 * 60,
};
