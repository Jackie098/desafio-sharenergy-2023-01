import { Request, Response } from "express";
import { ResponseError } from "../../../../types/Error";

import { ListCustomerUseCase } from "./ListCustomerUseCase";

class ListCustomerController {
  constructor(private listCustomerUseCase: ListCustomerUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const customers = await this.listCustomerUseCase.execute();

      return response.status(200).json(customers);
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

export { ListCustomerController };
