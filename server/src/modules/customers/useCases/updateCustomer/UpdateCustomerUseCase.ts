import * as Yup from "yup";
import { ErrorHandler } from "../../../../utils/ErrorHandler";

import { ICustomerRepository } from "../../repositories/ICustomerRepository";

interface IRequest {
  name?: string;
  email?: string;
  cellphone?: string;
  cpf?: string;
  street?: string;
  district?: string;
  houseNumber?: number;
}

class UpdateCustomerUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(customer: IRequest, id: string): Promise<void> {
    const schema: Yup.SchemaOf<IRequest> = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email("This email does not a valid email"),
      cellphone: Yup.string().length(11, "Cellphone must have 11 chars"),
      cpf: Yup.string().length(11, "CPF must have 11 chars"),
      street: Yup.string(),
      district: Yup.string(),
      houseNumber: Yup.number(),
    });

    if (!schema.isValidSync(customer)) {
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
      await this.customerRepository.update(id, customer);
    } catch (error) {
      console.log(error);

      throw new Error(
        ErrorHandler({
          code: 500,
          isHandled: true,
          message: "Error while updating a customer",
        })
      );
    }
  }
}

export { UpdateCustomerUseCase };
