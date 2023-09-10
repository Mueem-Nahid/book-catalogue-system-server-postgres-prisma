import { z } from 'zod';
import { userRole } from '../auth/auth.constants';

const updateUserZodSchema = z.object({
  body: z
    .object({
      password: z.string().optional(),
      name: z.string().optional(),
      contactNo: z.string().optional(),
      address: z.string().optional(),
      profileImg: z.string().optional(),
      role: z.enum([...userRole] as [string, ...string[]]).optional(),
    })
    .strict(),
});

export const UserValidation = {
  updateUserZodSchema,
};
