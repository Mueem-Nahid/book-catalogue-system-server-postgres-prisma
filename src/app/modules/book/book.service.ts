import { Book, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IBookFilter } from './book.interface';
import {
  IGenericResponsePagination,
  IPaginationOptions,
} from '../../../interfaces/common';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { bookSearchableFields } from './book.constant';

const createBook = async (data: Book): Promise<Partial<Book> | null> => {
  const result = await prisma.book.create({
    data,
    select: {
      id: true,
      title: true,
      author: true,
      genre: true,
      price: true,
      publicationDate: true,
      categoryId: true,
      category: true,
    },
  });
  return result;
};

const getAllBooks = async (
  filters: IBookFilter,
  paginationOption: IPaginationOptions
): Promise<IGenericResponsePagination<Book[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOption);
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'sensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? { [sortBy]: sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.book.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

export const BookService = {
  createBook,
  getAllBooks,
};
