import * as Yup from "yup";
import { ErrorHandler } from "../../../../utils/ErrorHandler";

import { ICustomerRepository } from "../../repositories/ICustomerRepository";

interface IRequest {
  id: string;
}

class DeleteCustomerUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(id: string): Promise<void> {
    const schema: Yup.StringSchema =
      Yup.string().required("The id is required");

    if (!schema.isValidSync(id)) {
      throw new Error(
        ErrorHandler({
          code: 400,
          isHandled: true,
          message: "The validation does not match",
        })
      );
    }

    const customerExists = await this.customerRepository.findOneById(id);

    if (!customerExists) {
      throw new Error(
        ErrorHandler({
          code: 400,
          isHandled: true,
          message: "Customer does not exists",
        })
      );
    }

    try {
      this.customerRepository.delete(id);
    } catch (error) {
      console.log(error);

      throw new Error(
        ErrorHandler({
          code: 500,
          isHandled: true,
          message: "Error while deleting a customer",
        })
      );
    }
  }
}

export { DeleteCustomerUseCase };
