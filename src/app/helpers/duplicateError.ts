import { IErrorResponse } from "../interface/errors";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleDuplicateError = (err: any): IErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  return {
    statusCode: 400,
    message: `The ${match[1]} is already exist!!!`,
  };
};
