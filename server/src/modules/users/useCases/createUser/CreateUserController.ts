import { Request, Response } from "express";
import { ResponseError } from "../../../../types/Error";
import { ICreateUserDTO } from "../../repositories/IUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const newUser = <ICreateUserDTO>request.body;

    try {
      await this.createUserUseCase.execute(newUser);

      return response.status(201).send();
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
        return response.status(500).send("Error does not handled"); //{ message: err }
      }
    }
  }
}

export { CreateUserController };
