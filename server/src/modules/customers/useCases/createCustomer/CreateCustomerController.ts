import { Request, Response } from "express";
import { ResponseError } from "../../../../types/Error";

import { ICreateCustomerDTO } from "../../repositories/ICustomerRepository";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";

class CreateCustomerController {
  constructor(private createCustomerUseCase: CreateCustomerUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const newCustomer = <ICreateCustomerDTO>request.body;

    try {
      await this.createCustomerUseCase.execute(newCustomer);

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
        console.log(err);

        return response
          .status(500)
          .json({ message: "Error does not handled", bodyError: err }); //{ message: err }
      }
    }
  }
}

export { CreateCustomerController };
