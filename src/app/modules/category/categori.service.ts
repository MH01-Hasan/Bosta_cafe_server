
import { Categori } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const createCategori = async (payload: Categori): Promise<Categori> => {
  const result = await prisma.categori.create({
    data: payload,
  });
  return result;
};

const getAllCategori = async (): Promise<Categori[]> => {
  const result = await prisma.categori.findMany();
  return result;
};

const getSingleCategori = async (id: string) => {
  const Category = await prisma.categori.findUnique({
    where: {
      id,
    },
    // include: {
    //   books: true,
    // },
  });
  return Category;
};
const updateSingleCategori = async (id: string, payload: Partial<Categori>) => {
  const Categori = await prisma.categori.update({
    where: {
      id,
    },
    data: payload,
  });
  return Categori;
};
const deleteSingleCategori = async (id: string) => {
  const Categori = await prisma.categori.delete({
    where: {
      id,
    },
  });
  return Categori;
};

export const CategoriService = {
  createCategori,
  getAllCategori,
  getSingleCategori,
  updateSingleCategori,
  deleteSingleCategori,
};
