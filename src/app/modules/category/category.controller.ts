import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { CategoryService } from './category.service';
import { Category, User } from '@prisma/client';
import { UserService } from '../user/user.service';

const createCategory = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const categoryData = req.body;
    const result: Category = await CategoryService.createCategory(categoryData);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Category created',
      data: result,
    });
  }
);

const getAllCategory = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await CategoryService.getAllCategory();
    sendResponse<Category[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All category.',
      data: result,
    });
  }
);

const getSingleCategory = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const result = await CategoryService.getSingleCategory(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User',
      data: result,
    });
  }
);

export const CategoryController = {
  createCategory,
  getAllCategory,
  getSingleCategory,
};
