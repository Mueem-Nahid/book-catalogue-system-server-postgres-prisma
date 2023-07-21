import { IUser } from './user.interface';
import { User } from './user.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { hashPassword } from '../../../helpers/hashPassword';

const createUserIntoDb = async (user: IUser): Promise<IUser | null> => {
  const createdUser = await User.create(user);
  if (!createdUser) throw new ApiError(400, 'Failed to create user.');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  createdUser.password = undefined;
  return createdUser;
};

const getAllUsers = async (): Promise<IUser[]> => {
  return User.find();
};

const getAUser = async (id: string): Promise<IUser | null> => {
  return User.findById(id);
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  return User.findOneAndUpdate({ _id: id }, payload, { new: true });
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  return User.findByIdAndDelete(id);
};

const getMyProfile = async (
  id: string,
  email: string
): Promise<IUser | null> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return User.findOne({ _id: id, email }).select('name email');
};

const updateMyProfile = async (
  userId: string,
  role: string,
  payload: Partial<IUser>
) => {
  const isExist = await User.findOne({ _id: userId, role });
  if (!isExist) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  // eslint-disable-next-line no-unused-vars
  const { name, password, ...otherData } = payload;

  let hashedPassword;
  if (password) hashedPassword = await hashPassword.encryptPassword(password);

  const updatedUserData: Partial<IUser> = {
    ...otherData,
    password: hashedPassword,
  };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  return User.findOneAndUpdate({ _id: userId, role }, updatedUserData, {
    new: true,
    projection: { name: 1, address: 1, phoneNumber: 1 },
  });
};

export const UserService = {
  createUserIntoDb,
  getAllUsers,
  getAUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
};
