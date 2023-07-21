import { model, Schema } from 'mongoose';
import { BookModel, IBook } from './book.interface';
import {reviewSchema} from "../review/review.model";

const bookSchema = new Schema<IBook>(
  {
    author: { type: String, required: true },
    title: { type: String, required: true },
    genre: { type: String, required: true },
    image: { type: String, required: true },
    publicationDate: { type: String, required: true },
    reviews: [reviewSchema],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { versionKey: false }
);


export const Book = model<IBook, BookModel>('Book', bookSchema);
