import { IHandledError } from "../types/Error";

export function ErrorHandler({
  code,
  isHandled,
  message,
  bodyError,
}: IHandledError): string {
  const errorFactory = { code, isHandled, message, bodyError };

  // console.log("Error Handler", JSON.stringify(errorFactory));

  return JSON.stringify(errorFactory);
}
