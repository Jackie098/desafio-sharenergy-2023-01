import { number } from "yup";

export type User = {
  username: string;
  password: string;
};

export type Location = {
  street: {
    number: number;
    name: string;
  };
  city: string;
  state: string;
  country: string;
};

export type Picture = {
  large: string;
  medium: string;
  thumbnail: string;
};

export type Gender = "male" | "female";

export type RandomUser = {
  name: {
    first: string;
    last: string;
  };
  registered: {
    age: number;
  };
  location: Location;
  login: {
    username: string;
  };
  email: string;
  cell: string;
  gender: Gender;
  picture: Picture;
};
