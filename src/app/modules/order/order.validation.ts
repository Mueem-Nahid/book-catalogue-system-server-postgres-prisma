import { z } from 'zod';

const orderedBookSchema = z.object({
  bookId: z.string({
    required_error: 'bookId is required',
  }),
  quantity: z
    .number({
      required_error: 'quantity is required',
    })
    .int(),
});

const orderSchema = z.object({
  body: z.object({
    orderedBooks: z.array(orderedBookSchema),
  }),
});

export const OrderValidation = {
  orderSchema,
};
