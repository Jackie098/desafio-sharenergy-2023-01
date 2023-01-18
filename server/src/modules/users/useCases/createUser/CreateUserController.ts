import { Request, Response } from "express";
import { ICreateUserDTO } from "../../repositories/IUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    const newUser = <ICreateUserDTO>request.body;

    console.log("controller", request.body);

    try {
      this.createUserUseCase.execute(newUser);

      return response.status(201).send();
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: true, message: err });
    }
  }
}

export { CreateUserController };
