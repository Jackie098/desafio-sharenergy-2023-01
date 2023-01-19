import mongoose, { ObjectId } from "mongoose";

export interface ICustomer {
  _id: ObjectId;
  name: string;
  email: string;
  cellphone: string;
  cpf: string;
  street?: string;
  district?: string;
  houseNumber?: number;
}

const CustomerSchema = new mongoose.Schema<ICustomer>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  cellphone: {
    type: String,
    required: true,
    unique: true,
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
  },
  street: {
    type: String,
  },
  district: {
    type: String,
  },
  houseNumber: {
    type: Number,
  },
});

const CustomerModel = mongoose.model("Customer", CustomerSchema);

export { CustomerModel };
