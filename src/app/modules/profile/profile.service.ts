import prisma from '../../../shared/prisma';

const getUserProfile = async (userId: string) => {
  const result = await prisma.user.findUnique({
    select: {
      email: true,
      name: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
    where: {
      id: userId,
    },
  });
  return result;
};

export const ProfileService = {
  getUserProfile,
};
