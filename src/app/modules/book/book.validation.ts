import { z } from 'zod';

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'tile is required',
    }),
    author: z.string({
      required_error: 'author is required',
    }),
    genre: z.string({
      required_error: 'genre is required',
    }),
    publicationDate: z.string({
      required_error: 'publication date is required',
    }),
    categoryId: z.string({
      required_error: 'categoryId id is required',
    }),
  }),
});

export const BookValidation = {
  createBookZodSchema,
};
