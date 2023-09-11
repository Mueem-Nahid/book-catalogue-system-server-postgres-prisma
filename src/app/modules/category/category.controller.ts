import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';

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

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const data = req.body;
  const result = await CategoryService.updateCategory(id, data);
  sendResponse<Partial<Category>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated !',
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const result = await CategoryService.deleteCategory(id);
  sendResponse<Partial<Category>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted !',
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
