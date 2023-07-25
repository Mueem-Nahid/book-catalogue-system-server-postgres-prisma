import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { BookService } from './book.service';
import { IBook } from './book.interface';
import pick from '../../../shared/pick';
import { filterableFields } from './book.constant';
import { IPaginationOptions } from '../../../interfaces/common';
import { paginationFields } from '../../../constants/pagination';
import { JwtPayload } from 'jsonwebtoken';
import { WishlistService } from '../wishlist/wishlist.service';

const createBook = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const bookData = req.body;
    const userObj: JwtPayload | null = req.user;
    const userEmail = userObj?.email;
    const result: IBook | null = await BookService.createBook(
      bookData,
      userEmail
    );
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Book created successfully !',
      data: result,
    });
  }
);

const getAllBooks = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const filters = pick(req.query, filterableFields);
    const paginationOptions: IPaginationOptions = pick(
      req.query,
      paginationFields
    );

    const userObj: JwtPayload | null = req.user;
    const userId = userObj?._id;

    const result = await BookService.getAllBooks(filters, paginationOptions);

    if (userId) {
      const wishlist = await WishlistService.getUserWishlist(userId);
      // Create a set of book ids in the wishlist for faster lookup
      const wishlistSet = new Set(wishlist.map(item => item.book.toString()));

      // Convert each Book document to a plain JavaScript object and add the isWishlisted property

      result.data = result.data.map((book: IBook) => ({
        ...book?.toObject(),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        isWishlisted: wishlistSet.has(book?._id.toString()),
      }));
    }

    sendResponse<IBook[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Books are retrieved successfully !',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getABook = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result: IBook | null = await BookService.getABook(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book',
      data: result,
    });
  }
);

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const userObj: JwtPayload | null = req.user;
  const userId = userObj?._id;
  const result: IBook | null = await BookService.updateBook(id, data, userId);
  if (!result)
    sendResponse<IBook>(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Book not updated. No book is available to update.',
    });
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated !',
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const userObj: JwtPayload | null = req.user;
  const userId = userObj?._id;
  const result = await BookService.deleteBook(id, userId);
  if (!result)
    sendResponse<IBook>(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Book not deleted. No book is available to delete.',
    });
  sendResponse<IBook>(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: 'Book deleted !',
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getABook,
  updateBook,
  deleteBook,
};
