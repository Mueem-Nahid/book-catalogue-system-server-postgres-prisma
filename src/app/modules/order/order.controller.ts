import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { OrderService } from './order.service';
import { Order } from '@prisma/client';

const createOrder = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { orderedBooks } = req.body;
    const userData = req.user;
    const result: Order | null = await OrderService.createOrder(
      orderedBooks,
      userData?.userId
    );
    if (!result) {
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: true,
        message: 'Could not place order!',
      });
    }
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Order created successfully !',
      data: result,
    });
  }
);

const getAllOrders = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userData = req.user;
    const result = await OrderService.getAllOrders(
      userData?.userId,
      userData?.role
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All orders.',
      data: result,
    });
  }
);

export const OrderController = {
  createOrder,
  getAllOrders,
};
