import { Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { User } from '@prisma/client';

const getAllUsers = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await UserService.getAllUsers();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All users.',
      data: result,
    });
  }
);

const getSingleUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const result: Partial<User> | null = await UserService.getSingleUser(id);
    sendResponse<Partial<User>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User',
      data: result,
    });
  }
);

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const data = req.body;
  const result = await UserService.updateUser(id, data);
  sendResponse<Partial<User>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated !',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const result = await UserService.deleteUser(id);
  sendResponse<Partial<User>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted !',
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
