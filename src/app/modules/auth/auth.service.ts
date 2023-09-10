import prisma from '../../../shared/prisma';
import { User } from '@prisma/client';
import { ILoginUser, IUserLoginResponse } from './auth.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { jwtHelper } from '../../../helpers/jwtHelper';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import {hashPassword} from "../../../helpers/hashPassword";

const createUser = async (data: User): Promise<Partial<User>> => {
  const hashedPassword = await hashPassword.encryptPassword(data.password)
  const result = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword
    },
    select: {
      id:true,
      name:true,
      email:true,
      role:true,
      contactNo:true,
      address:true,
      profileImg:true
    }
  });
  return result;
};

const loginUser = async (payload: ILoginUser): Promise<IUserLoginResponse> => {
  const { email, password } = payload;
  const user = await prisma.user.findUnique({
    select:{
      id:true,
      role:true,
      password:true
    },
    where: { email } });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }
  const passwordMatch = await hashPassword.decryptPassword(password, user.password)
  if (!passwordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'ID or password is incorrect.');
  }
  const token: string = jwtHelper.createToken(
    {
      role: user.role,
      userId: user.id,
    },
    config.jwt.jwt_secret as Secret,
    { expiresIn: config.jwt.jwt_expired_time }
  );

  const refreshToken: string = jwtHelper.createToken(
    {
      role: user.role,
      userId: user.id,
    },
    config.jwt.jwt_refresh_secret as Secret,
    { expiresIn: config.jwt.jwt_refresh_token_expired_time }
  );

  return {
    token,
    refreshToken,
  };
};

export const AuthService = {
  createUser,
  loginUser,
};
