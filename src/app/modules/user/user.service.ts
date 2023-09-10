import prisma from '../../../shared/prisma';
import { User } from '@prisma/client';
import { hashPassword } from '../../../helpers/hashPassword';

const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return result;
};

const getSingleUser = async (id: string) => {
  const result = await prisma.user.findUnique({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
    where: {
      id,
    },
  });
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<Partial<User> | null> => {
  let hashedPassword;
  if (payload.password) {
    hashedPassword = await hashPassword.encryptPassword(payload.password);
  }
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: hashedPassword
      ? {
          ...payload,
          password: hashedPassword,
        }
      : payload,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return result;
};

const deleteUser = async (id: string): Promise<Partial<User> | null> => {
  const result = await prisma.user.delete({
    select: {
      id: true,
    },
    where: {
      id,
    },
  });
  return result;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
