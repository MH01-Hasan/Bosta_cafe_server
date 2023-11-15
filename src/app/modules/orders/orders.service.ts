import { Order, Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { prisma } from "../../../shared/prisma";
import { OrdersSearchFields } from "./orders.contants";
import { IOrdersFilterRequest } from "./orders.interface";



const createOrders = async (payload:Order ): Promise<Order> => {
    const result = await prisma.order.create({
      data: {
        ...payload,
        cart:payload.cart as Prisma.JsonObject
      },
    });
    return result;
  };
const getAllOrders = async (
  filters:IOrdersFilterRequest,
  options:IPaginationOptions,
  userId:string

):Promise< IGenericResponse <Order[]>> =>{
  const{page,limit,skip} = paginationHelpers.calculatePagination(options);
  const {searchTerm,startDate, endDate, ...filterData} = filters;
  const andConditons = [];

  if(searchTerm){
      andConditons?.push({
          OR:OrdersSearchFields?.map((field) => ({
              [field]:{
                  contains:searchTerm,
                  mode:'insensitive'
              }
          }))
      })
  }

  if (startDate && endDate) {
    andConditons?.push({
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    });
  }


if (userId) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (user && user.role === 'seller') {
    if (userId) {
      andConditons?.push({
        userId: userId,
      });
    }
  }
}

  

  

  if (Object.keys(filterData)?.length > 0) {
      andConditons.push({
          AND: Object?.keys(filterData)?.map((key) => ({
              [key]: {
                  equals: (filterData as any)[key]
              }
          }))
      })
  }

  const whereConditons: Prisma.OrderWhereInput =
      andConditons.length > 0 ? { AND: andConditons } : {};
  const result = await prisma.order.findMany({
      where: whereConditons,
      include: {
        user: {
          select: {
              id: true,
              username: true,
              email: true,
              address: true,
              contactNo: true,         
          }
      }
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

  const total = await prisma?.order?.count();

  return {
      meta: {
          page,
          limit,
          total,
      },
      data: result
  }



}


  // const findAllOrdersbyShopID = async (userId: string, filters:IOrdersFilterRequest,): Promise<Order[] | null> => {
  //   const {searchTerm,startDate, endDate, } = filters;
  //   const andConditons = [];

  //   if(searchTerm){
  //       andConditons?.push({
  //           OR:OrdersSearchFields?.map((field) => ({
  //               [field]:{
  //                   contains:searchTerm,
  //                   mode:'insensitive'
  //               }
  //           }))
  //       })
  //   }
  
  //   if (startDate && endDate) {
  //     andConditons?.push({
  //       createdAt: {
  //         gte: startDate,
  //         lte: endDate,
  //       },
  //     });
  //   }


  //   if(userId){
  //     andConditons?.push({
  //       userId:userId
  //     })
  //   }

  
  //   const result = await prisma.order.findMany({
  //     where: {
  //       AND: andConditons
  //     },
  //     include: {
  //       user: {
  //         select: {
  //             id: true,
  //             username: true,
  //             email: true,
  //             address: true,
  //             contactNo: true,         
  //         }
  //     } },
  //   })

  //   return result
  
  // };

  const findSingrlOrdrs = async (id: string): Promise<Order | null> => {
    const result = await prisma.order.findUnique({
      where: {
        id
      },
      include: {
        user: {
          select: {
              id: true,
              username: true,
              email: true,
              address: true,
              contactNo: true,         
          }
      }
              },
    })
    return result;
  };


// const updateSingleProduct = async (id: string, payload: Partial<Product>): Promise<Product> => {


 
//   const result = await prisma.product.update({
//     where: {
//       id,
//     },
//     data:{
//       ...payload,
//       productImage:payload.productImage as Prisma.JsonObject
//     },
//     include: {
//       category: true,
//     },
//   });

//   return result;
// };


// const deleteSingleProduct = async (id: string): Promise<Product> => {
//   const result = await prisma.product.delete({
//     where: {
//       id
//     },
//     include: {
//       category: true,
//     },
//   })
//   return result;
// };

  export const OrdeersService = {
    createOrders,
    getAllOrders,
    // findAllOrdersbyShopID,
    findSingrlOrdrs
   
    
  };
  