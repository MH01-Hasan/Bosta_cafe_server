
import { Categori } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoriService } from './categori.service';


const createCategori = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoriService.createCategori(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categori created successful',
    data: result,
  });
});


const getAllCategori = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoriService.getAllCategori();
  sendResponse<Categori[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categori retrieved successful',
    data: result,
  });
});


const getSingleCategori = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CategoriService.getSingleCategori(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category retrieved successful',
    data: result,
  });
});


const updateSingleCategori = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CategoriService.updateSingleCategori(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successful',
    data: result,
  });
});

const deleteSingleCategori = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CategoriService.deleteSingleCategori(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted successful',
    data: result,
  });
});


export const CategoriController = {
  createCategori,
  getAllCategori,
  getSingleCategori,
  updateSingleCategori,
  deleteSingleCategori,
};
