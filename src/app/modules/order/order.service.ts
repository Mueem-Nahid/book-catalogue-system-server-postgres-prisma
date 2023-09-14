import { Order } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IOrderedBook } from './order.interface';

const createOrder = async (
  orderedBooks: IOrderedBook[],
  userId: string
): Promise<Order | null> => {
  const result = await prisma.order.create({
    data: {
      userId,
      orderedBooks: orderedBooks,
    },
  });
  return result;
};

const getAllOrders = async (): Promise<Order[]> => {
  const result = await prisma.order.findMany();
  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
};
