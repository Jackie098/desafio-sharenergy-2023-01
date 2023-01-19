import { Request, Response } from "express";
import { ResponseError } from "../../../../types/Error";
import { DeleteCustomerUseCase } from "./DeleteCustomerUseCase";

class DeleteCustomerController {
  constructor(private deleteCustomerUseCase: DeleteCustomerUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = <{ id: string }>request.params;

    console.log("id", id);

    try {
      await this.deleteCustomerUseCase.execute(id);

      return response.status(204).send();
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

export { DeleteCustomerController };
