export type IHandledError = {
  code: number;
  isHandled: boolean;
  message: string;
  bodyError?: any;
};
