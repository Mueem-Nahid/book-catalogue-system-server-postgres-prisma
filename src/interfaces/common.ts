import { IGenericErrorMessage } from './error';

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IPaginationOptions = {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: string;
  // minPrice?: number;
  // maxPrice?: number;
  // category?: string;
};

export type IGenericResponsePagination<T> = {
  meta: {
    page: number;
    size: number;
    total: number;
    totalPage: number;
  };
  data: T;
};
