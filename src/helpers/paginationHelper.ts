import { SortOrder } from 'mongoose';

type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
};

const calculatePagination = (options: IOptions): IOptionsResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const skip: number = (page - 1) * limit;
  const sortBy: string = options.sortBy || 'createdAt';
  const sortOrder: SortOrder = options.sortOrder || 'desc';
  const minPrice = Number(options.minPrice || 0);
  const maxPrice = Number(options.maxPrice || 9999999999);
  const location = options?.location;

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
    location,
  };
};

export const paginationHelper = { calculatePagination };
