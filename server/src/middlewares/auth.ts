import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authConfig } from "../config/jwt";

export function CheckSession(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  // console.log("middle - authorization", authorization);

  if (!authorization) {
    return response.status(401).json({ error: "Not authorized" });
  }

  if (!authorization.includes("Bearer")) {
    const userAuthenticated = jwt.verify(authorization, authConfig.secret!);

    if (!userAuthenticated) {
      return response.status(401).json({ message: "Token does not valid" });
    }

    next();
  }

  const [, token] = authorization.split("Bearer ");

  console.log("token", token);

  const userAuthenticated = jwt.verify(token, authConfig.secret!);

  // console.log(userAuthenticated);
  if (!userAuthenticated) {
    return response.status(401).json({ message: "Token does not valid" });
  }

  next();
}
