import { Request, Response } from 'express';
import { IUser } from './user.interface';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const user = req.body;
    const result: IUser | null = await UserService.createUserIntoDb(user);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'User created successfully. Please sign in now.',
      data: result,
    });
  }
);

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

const getAUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result: IUser | null = await UserService.getAUser(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User',
      data: result,
    });
  }
);

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await UserService.updateUser(id, data);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated !',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  await UserService.deleteUser(id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted !',
  });
});

const myProfile = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const user = req.user;
    const userId = user?._id;
    const email = user?.email;
    const result: IUser | null = await UserService.getMyProfile(userId, email);
    if (!result)
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'User not found.',
      });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User',
      data: result,
    });
  }
);

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const userId = user?._id;
  const role = user?.role;
  const data = req.body;
  const result = await UserService.updateMyProfile(userId, role, data);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile has been updated !',
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getAUser,
  updateUser,
  deleteUser,
  myProfile,
  updateMyProfile,
};
