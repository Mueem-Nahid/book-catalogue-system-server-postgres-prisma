type IOptions = {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: string;
};

type IOptionsResult = {
  page: number;
  skip: number;
  size: number;
  sortBy: string;
  sortOrder: string;
};

const calculatePagination = (options: IOptions): IOptionsResult => {
  const page = Number(options.page || 1);
  const size = Number(options.size || 10);
  const skip: number = (page - 1) * size;
  const sortBy: string = options.sortBy || 'createdAt';
  const sortOrder: string = options.sortOrder || 'desc';

  return {
    page,
    size,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelper = { calculatePagination };
