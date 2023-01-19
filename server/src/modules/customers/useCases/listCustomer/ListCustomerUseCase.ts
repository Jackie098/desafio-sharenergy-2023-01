import { ErrorHandler } from "../../../../utils/ErrorHandler";
import {
  ICreateCustomerDTO,
  ICustomerRepository,
} from "../../repositories/ICustomerRepository";

class ListCustomerUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(): Promise<ICreateCustomerDTO[] | []> {
    try {
      return await this.customerRepository.list();
    } catch (error) {
      console.log(error);

      throw new Error(
        ErrorHandler({
          code: 500,
          isHandled: true,
          message: "Error while querying the customers",
        })
      );
    }
  }
}

export { ListCustomerUseCase };
