import mongoose, { Model, ObjectId } from 'mongoose';
import { IReview } from '../review/review.interface';

export type ILocation =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh';

export type IBreed =
  | 'Brahman'
  | 'Nellore'
  | 'Sahiwal'
  | 'Gir'
  | 'Indigenous'
  | 'Tharparkar'
  | 'Kankrej';

export type ILabel = 'for sale' | 'sold out';

export type ICategory = 'Dairy' | 'Beef' | 'Dual Purpose';

export type IBook = {
  _id?: ObjectId;
  title: string;
  author: string;
  genre: string;
  image: string;
  publicationDate: string;
  reviews: IReview[];
  // wishlist: string[];
  user: mongoose.Types.ObjectId;
  isWishlisted: boolean;
  toObject(): any;
};

export type IBookFilter = {
  searchTerm?: string;
  publicationDate?: string;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
