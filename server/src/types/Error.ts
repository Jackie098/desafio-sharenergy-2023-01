export type IHandledError = {
  code: number;
  isHandled: boolean;
  message: string;
  bodyError?: any;
};

export type ResponseError = Omit<IHandledError, "code" | "isHandled">;
