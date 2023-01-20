import { Request, Response } from "express";
import { UpdateCustomer } from "../../../../types/Customer";
import { ResponseError } from "../../../../types/Error";
import { UpdateCustomerUseCase } from "./UpdateCustomerUseCase";

class UpdateCustomerController {
  constructor(private updateCustomerUseCase: UpdateCustomerUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = <{ id: string }>request.params;
    const updateCustomer = <UpdateCustomer>request.body;

    try {
      await this.updateCustomerUseCase.execute(updateCustomer, id);

      return response.status(200).send();
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

export { UpdateCustomerController };
