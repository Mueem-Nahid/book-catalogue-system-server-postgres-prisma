import { IBreed, ICategory, ILabel, ILocation } from './book.interface';

export const location: ILocation[] = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
];

export const breed: IBreed[] = [
  'Brahman',
  'Nellore',
  'Sahiwal',
  'Gir',
  'Indigenous',
  'Tharparkar',
  'Kankrej',
];

export const label: ILabel[] = ['for sale', 'sold out'];

export const category: ICategory[] = ['Dairy', 'Beef', 'Dual Purpose'];

export const bookSearchableFields: string[] = ['location', 'breed', 'category'];

export const filterableFields: string[] = [
  'searchTerm',
  'location',
  'breed',
  'category',
];
