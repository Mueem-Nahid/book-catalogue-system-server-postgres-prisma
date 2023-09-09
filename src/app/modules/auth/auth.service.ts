import prisma from "../../../shared/prisma";
import {User} from "@prisma/client";

const createUser = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data
  })
  return result;
}



export const AuthService = {
   createUser,
};
