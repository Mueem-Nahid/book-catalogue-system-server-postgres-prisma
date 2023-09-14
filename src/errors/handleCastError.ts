import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';

const handleCastError = (
  error: { path: any; }
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid ID',
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast error',
    errorMessages: errors,
  };
};

export default handleCastError;
