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

const getAllOrders = async (userId: string, role: string): Promise<Order[]> => {
  if (role === 'admin') {
    const result = await prisma.order.findMany();
    return result;
  }
  const result = await prisma.order.findMany({
    where: {
      userId,
    },
  });
  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
};
