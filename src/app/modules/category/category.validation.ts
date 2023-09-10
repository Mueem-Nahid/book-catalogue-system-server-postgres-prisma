import { z } from 'zod';

const createCategoryValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

export const CategoryValidation = {
  createCategoryValidation,
};
