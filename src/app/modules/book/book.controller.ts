import catchAsync from '../../../shared/catchAsync';
import {Request, Response} from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import {BookService} from './book.service';
import pick from '../../../shared/pick';
import {filterableFields} from './book.constant';
import {IPaginationOptions} from '../../../interfaces/common';
import {paginationFields} from '../../../constants/pagination';
import {Book} from '@prisma/client';

const createBook = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const bookData = req.body;
    const result: Partial<Book> | null = await BookService.createBook(bookData);
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

    const result = await BookService.getAllBooks(filters, paginationOptions);

    sendResponse<Book[]>(res, {
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
    const result: Partial<Book> | null = await BookService.getSingleBook(id);
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
  const result: Book | null = await BookService.updateBook(id, data);
  if (!result)
    sendResponse<Book>(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Book not updated. No book is available to update.',
    });
  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated !',
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.deleteBook(id);
  if (!result)
    sendResponse<Book>(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Book not deleted. No book is available to delete.',
    });
  sendResponse<Book>(res, {
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
