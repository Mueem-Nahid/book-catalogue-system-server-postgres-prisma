import {z} from 'zod';
import {userRole} from "./auth.constants";

const signupZodSchema = z.object({
   body: z.object({
      name: z.string({
         required_error: 'Name is required'
      }),
      email: z.string({
         required_error: 'Email is required',
      }),
      password: z.string({
         required_error: 'Password is required',
      }),
      role: z.enum([...userRole] as [string, ...string[]]),
      contactNo: z.string({
         required_error: 'Contact number is required'
      }),
      address: z.string({
         required_error: 'Address is required'
      }),
      profileImg: z.string({
         required_error: 'Address is required'
      }),
   }),
})

const loginZodSchema = z.object({
   body: z.object({
      email: z.string({
         required_error: 'Email is required',
      }),
      password: z.string({
         required_error: 'Password is required',
      }),
   }),
});

const refreshTokenZodSchema = z.object({
   cookies: z.object({
      refreshToken: z.string({
         required_error: 'Token is required',
      }),
   }),
});

export const AuthValidation = {
   signupZodSchema,
   loginZodSchema,
   refreshTokenZodSchema,
};
