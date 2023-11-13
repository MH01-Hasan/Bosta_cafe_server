
import { Category, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { IProductFilterRequest } from '../product/product.interface';
import { CategorySearchFields } from './category.contants';

const createcategory = async (payload: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data: payload,
  });
  return result;
};

const getAllcategory = async (

  filters:IProductFilterRequest,
  options:IPaginationOptions

):Promise< IGenericResponse <Category[]>> =>{

  const{page,limit,skip} = paginationHelpers.calculatePagination(options);
  const {searchTerm, ...filterData} = filters;
  const andConditons = [];

  if(searchTerm){
      andConditons.push({
          OR:CategorySearchFields?.map((field) => ({
              [field]:{
                  contains:searchTerm,
                  mode:'insensitive'
              }
          }))
      })
  }
 
  if (Object.keys(filterData).length > 0) {
      andConditons.push({
          AND: Object.keys(filterData)?.map((key) => ({
              [key]: {
                  equals: (filterData as any)[key]
              }
          }))
      })
  }

  const whereConditons: Prisma.CategoryWhereInput =
      andConditons.length > 0 ? { AND: andConditons } : {};

  const result = await prisma?.category?.findMany({
      where: whereConditons,
      skip,
      take: limit,
      orderBy: options.sortBy && options.sortOrder
          ? {
              [options.sortBy]: options.sortOrder
          }
          : {
              createdAt: 'desc'
          }
  });

  const total = await prisma.category?.count();

  return {
      meta: {
          page,
          limit,
          total,
      },
      data: result
  }



}

const getSinglecategory = async (id: string) => {
  const Category = await prisma?.category?.findUnique({
    where: {
      id,
    },
  });
  return Category;
};
const updateSinglecategory = async (id: string, payload: Partial<Category>) => {
  const category = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
  return category;
};

const deleteSinglecategory = async (id: string) => {
  const category = await prisma.category.delete({
    where: {
      id,
    },
  });
  return category;
};

export const categoryService = {
  createcategory,
  getAllcategory,
  getSinglecategory,
  updateSinglecategory,
  deleteSinglecategory,
};
