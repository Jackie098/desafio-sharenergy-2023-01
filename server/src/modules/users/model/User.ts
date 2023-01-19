import mongoose from "../../../database";
import bcryptjs from "bcryptjs";
import { ObjectId } from "mongoose";

export interface IUser {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  password?: string;
  isAdmin?: boolean;
  createdAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  isAdmin: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  const hash = await bcryptjs.hash(this.password!, 10);

  this.password = hash;
});

const UserModel = mongoose.model("User", UserSchema);

export { UserModel };
