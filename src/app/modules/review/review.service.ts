import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Book } from '../book/book.model';
import { IReview } from './review.interface';
import { IBook } from '../book/book.interface';

const createReview = async (
  bookId: string,
  newComment: IReview
): Promise<IBook | null> => {
  const updatedBook = await Book.findOneAndUpdate(
    { _id: bookId },
    { $push: { reviews: newComment } },
    { new: true }
  );
  if (!updatedBook) throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  return updatedBook;
};

export const ReviewService = {
  createReview,
};
