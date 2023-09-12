import {Book, Prisma} from '@prisma/client';
import prisma from '../../../shared/prisma';
import {IBookFilter} from './book.interface';
import {IGenericResponsePagination, IPaginationOptions,} from '../../../interfaces/common';
import {paginationHelper} from '../../../helpers/paginationHelper';
import {bookSearchableFields} from './book.constant';

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
  const { page, skip, size, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOption);
  const { searchTerm, minPrice, maxPrice, category, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
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

  if (minPrice !== undefined || maxPrice !== undefined) {
    whereConditions.price = {};

    if (minPrice !== undefined) {
      whereConditions.price.gte = parseFloat(minPrice);
    }

    if (maxPrice !== undefined) {
      whereConditions.price.lte = parseFloat(maxPrice);
    }
  }

  if (category) {
    whereConditions.categoryId = category;
  }

  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
    where: whereConditions,
    skip,
    take: size,
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
      size,
      totalPage: Math.ceil(total / size),
    },
    data: result,
  };
};

const getSingleBook = async (id: string) => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    select:{
      id:true,
      title:true,
      author:true,
      genre:true,
      price:true,
      publicationDate:true,
      categoryId:true
    }
  });
  return result;
};

const updateBook = async (id: string, payload: Book) => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteBook = async (
   id: string
): Promise<Partial<Book> | null> => {
  const result = await prisma.book.delete({
    select: {
      id: true,
    },
    where: {
      id,
    },
  });
  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook
};
