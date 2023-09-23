import { Category } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { categoryService } from './category.service';

const createcategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.createcategory(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category created successful',
    data: result,
  });
});

const getAllcategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.getAllcategory();
  sendResponse<Category[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category retrieved successful',
    data: result,
  });
});

const getSinglecategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await categoryService.getSinglecategory(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category retrieved successful',
    data: result,
  });
});

const updateSinglecategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await categoryService.updateSinglecategory(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successful',
    data: result,
  });
});

const deleteSinglecategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await categoryService.deleteSinglecategory(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted successful',
    data: result,
  });
});

export const categoryController = {
  createcategory,
  getAllcategory,
  getSinglecategory,
  updateSinglecategory,
  deleteSinglecategory,
};
