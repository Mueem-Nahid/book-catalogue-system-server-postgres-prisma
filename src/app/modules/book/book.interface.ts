import mongoose, { Model } from 'mongoose';

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
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews: string;
  user: mongoose.Types.ObjectId;
};

export type IBookFilter = {
  searchTerm?: string;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
