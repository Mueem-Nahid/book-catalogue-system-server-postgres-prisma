import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import { User } from '@prisma/client';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ProfileService } from './profile.service';

const getUserProfile = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userInfo = req.user;
    const result: Partial<User> | null = await ProfileService.getUserProfile(
      userInfo?.userId
    );
    sendResponse<Partial<User>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User profile.',
      data: result,
    });
  }
);

export const ProfileController = {
  getUserProfile,
};
