import * as Yup from "yup";
import { ErrorHandler } from "../../../../utils/ErrorHandler";

import { ICustomerRepository } from "../../repositories/ICustomerRepository";

interface IRequest {
  name: string;
  email: string;
  cellphone: string;
  cpf: string;
  street?: string;
  district?: string;
  houseNumber?: number;
}

class CreateCustomerUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(newCustomer: IRequest): Promise<void> {
    const schema: Yup.SchemaOf<IRequest> = Yup.object().shape({
      name: Yup.string().required("The name is required"),
      email: Yup.string()
        .email("This email does not a valid email")
        .required("The email is required"),
      cellphone: Yup.string()
        .length(11, "Cellphone must have 11 chars")
        .required("Cellphone is required"),
      cpf: Yup.string()
        .length(11, "CPF must have 11 chars")
        .required("CPF is required"),
      street: Yup.string(),
      district: Yup.string(),
      houseNumber: Yup.number(),
    });

    if (!schema.isValidSync(newCustomer)) {
      throw new Error(
        ErrorHandler({
          code: 400,
          isHandled: true,
          message: "The validation does not match",
        })
      );
    }

    const customerAlreadyExists = await this.customerRepository.findOne(
      newCustomer.email,
      newCustomer.cpf
    );

    if (customerAlreadyExists) {
      throw new Error(
        ErrorHandler({
          code: 400,
          isHandled: true,
          message: "Customer already exists",
        })
      );
    }

    try {
      await this.customerRepository.create(newCustomer);
    } catch (error) {
      console.log(error);

      throw new Error(
        ErrorHandler({
          code: 500,
          isHandled: true,
          message: "Error while creating a new customer",
        })
      );
    }
  }
}

export { CreateCustomerUseCase };
