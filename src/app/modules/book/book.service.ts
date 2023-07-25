import { IBook, IBookFilter } from './book.interface';
import { Book } from './book.model';
import ApiError from '../../../errors/ApiError';
import {
  IGenericResponsePagination,
  IPaginationOptions,
} from '../../../interfaces/common';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { bookSearchableFields } from './book.constant';
import { SortOrder } from 'mongoose';
import { User } from '../user/user.model';
import httpStatus from 'http-status';

const createBook = async (
  bookData: IBook,
  userEmail: string
): Promise<IBook | null> => {
  const user = new User();
  if (
    !(await user.isExist(userEmail)) ||
    !(await user.isExistById(bookData.user.toString()))
  )
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  const createdBook = Book.create(bookData);
  if (!createdBook) throw new ApiError(400, 'Failed to create book.');
  return createdBook;
};

const getAllBooks = async (
  filters: IBookFilter,
  paginationOption: IPaginationOptions
): Promise<IGenericResponsePagination<IBook[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOption);
  // const { searchTerm, ...filtersData } = filters;
  const { searchTerm, publicationDate, ...otherFilters } = filters;
  const andConditions = [];

  // making implicit and
  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map((field: string) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (publicationDate) {
    andConditions.push({
      publicationDate: {
        $regex: publicationDate,
        $options: 'i',
      },
    });
  }

  if (Object.keys(otherFilters).length) {
    // Exclude publicationDate from otherFilters
    if (
      Object.keys(otherFilters).length > 1 ||
      !('publicationDate' in otherFilters)
    ) {
      andConditions.push({
        $and: Object.entries(otherFilters).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) sortConditions[sortBy] = sortOrder;

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total: number = await Book.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getABook = async (id: string): Promise<IBook | null> => {
  return Book.findById(id).populate('reviews.reviewedBy', 'name', 'User');
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>,
  userId: string
): Promise<IBook | null> => {
  return Book.findOneAndUpdate({ _id: id, user: userId }, payload, {
    new: true,
  });
};

const deleteBook = async (id: string, user: string): Promise<IBook | null> => {
  return Book.findOneAndDelete({ _id: id, user });
};

export const BookService = {
  createBook,
  getAllBooks,
  getABook,
  updateBook,
  deleteBook,
};
