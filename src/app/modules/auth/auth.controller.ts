import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { IUserLoginResponse } from './auth.interface';
import config from '../../../config';

const createUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const user = req.body;
    const result: Partial<User> | null = await AuthService.createUser(user);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'User created successfully. Please sign in now.',
      data: result,
    });
  }
);

const loginUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { ...loginData } = req.body;
    const result: IUserLoginResponse = await AuthService.loginUser(loginData);
    const { refreshToken, ...others } = result;
    // set refresh token into cookie
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<IUserLoginResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in successfully.',
      data: others,
    });
  }
);

/* const refreshTokenHandler = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result: IRefreshTokenResponse = await AuthService.createRefreshToken(
    refreshToken
  );
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New access token generated successfully !',
    data: result,
  });
});*/

export const AuthController = {
  createUser,
  loginUser,
  /*refreshTokenHandler,*/
};
