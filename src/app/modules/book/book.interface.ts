export type IBookFilter = {
  searchTerm?: string | undefined;
  publicationDate?: string;
  title?: string;
  category?: string;
  author?: string;
  genre?: string;
  price?: string;
  minPrice?: string;
  maxPrice?: string;
};
