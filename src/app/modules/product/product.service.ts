import { Prisma, Product } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { prisma } from "../../../shared/prisma";
import { ProductSearchFields } from "./product.contants";
import { IProductFilterRequest } from "./product.interface";

const createProduct = async (payload:Product ): Promise<Product> => {
    const result = await prisma.product.create({
      data: {
        ...payload,
        productImage:payload.productImage as Prisma.JsonObject
      },
    });
    return result;
  };



const getAllproduct = async (
  filters:IProductFilterRequest,
  options:IPaginationOptions

):Promise< IGenericResponse <Product[]>> =>{
  const{page,limit,skip} = paginationHelpers.calculatePagination(options);
  const {searchTerm, ...filterData} = filters;
  const andConditons = [];

  if(searchTerm){
      andConditons.push({
          OR:ProductSearchFields.map((field) => ({
              [field]:{
                  contains:searchTerm,
                  mode:'insensitive'
              }
          }))
      })
  }
 
  if (Object.keys(filterData).length > 0) {
      andConditons.push({
          AND: Object.keys(filterData).map((key) => ({
              [key]: {
                  equals: (filterData as any)[key]
              }
          }))
      })
  }

  const whereConditons: Prisma.ProductWhereInput =
      andConditons.length > 0 ? { AND: andConditons } : {};

  const result = await prisma.product.findMany({
      where: whereConditons,
      include: {
                  category: true,
              },
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

  const total = await prisma.product.count();

  return {
      meta: {
          page,
          limit,
          total,
      },
      data: result
  }



}


  const findSingleProduct = async (id: string): Promise<Product | null> => {
    const result = await prisma.product.findUnique({
      where: {
        id
      },
      include: {
        category: true,
      },
    })
    return result;
  };


const updateSingleProduct = async (id: string, payload: Partial<Product>): Promise<Product> => {


 
  const result = await prisma.product.update({
    where: {
      id,
    },
    data:{
      ...payload,
      productImage:payload.productImage as Prisma.JsonObject
    },
    include: {
      category: true,
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
      category: true,
    },
  })
  return result;
};

  export const ProductService = {
    createProduct,
    updateSingleProduct,
    deleteSingleProduct,
    findSingleProduct,
    getAllproduct
    
  };
  