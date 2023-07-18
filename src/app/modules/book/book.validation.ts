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
    reviews: z.string({
      required_error: 'review is required',
    }),
    user: z.string({
      required_error: 'user id is required',
    }),
  }),
});

export const BookValidation = {
  createBookZodSchema,
};
