import { Product } from "@prisma/client";
import { prisma } from "../../../shared/prisma";

const createProduct = async (payload:Product ): Promise<Product> => {
    const result = await prisma.product.create({
      data: payload,
    });
    return result;
  };





  const findSingleProduct = async (id: string): Promise<Product | null> => {
    const result = await prisma.product.findUnique({
      where: {
        id
      },
      include: {
        categori: true,
      },
    })
    return result;
  };


const updateSingleProduct = async (id: string, payload: Partial<Product>): Promise<Product> => {
  const result = await prisma.product.update({
    where: {
      id,
    },
    data: payload,
    include: {
      categori: true,
    },
  });
  return result;
};


const deleteSingleProduct = async (id: string): Promise<Product> => {
  const result = await prisma.product.delete({
    where: {
      id
    },
    include: {
      categori: true,
    },
  })
  return result;
};

  export const ProductService = {
    createProduct,
    updateSingleProduct,
    deleteSingleProduct,
    findSingleProduct
    
  };
  