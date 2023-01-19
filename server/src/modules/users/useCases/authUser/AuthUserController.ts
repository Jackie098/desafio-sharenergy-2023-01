import { Request, Response } from "express";
import { ResponseError } from "../../../../types/Error";

import { AuthUserUseCase } from "./AuthUserUseCase";

class AuthUserController {
  constructor(private authUserUseCase: AuthUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const login = <{ username: string; password: string }>request.body;

    try {
      const loggedUser = await this.authUserUseCase.execute(login);

      return response.status(200).json(loggedUser);
    } catch (err: any) {
      const castError = <string>err.toString();

      if (castError.includes("isHandled")) {
        const slicedError = castError.replace("Error: ", "");

        const objErr = JSON.parse(slicedError);

        return response.status(objErr?.code).json({
          message: objErr.message,
          bodyError: objErr,
        } as ResponseError);
      } else {
        console.log(err);
        return response.status(500).send("Error does not handled"); //{ message: err }
      }
    }
  }
}

export { AuthUserController };
