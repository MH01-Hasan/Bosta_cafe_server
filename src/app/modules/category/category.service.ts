
// import { category } from '@prisma/client';
import { Category } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const createcategory = async (payload: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data: payload,
  });
  return result;
};

const getAllcategory = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany();
  return result;
};

const getSinglecategory = async (id: string) => {
  const Category = await prisma.category.findUnique({
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
