import { Order, Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { prisma } from "../../../shared/prisma";
import { OrdersSearchFields } from "./orders.contants";
import { IOrdersFilterRequest } from "./orders.interface";
//@ts-ignore

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
    
    filters: IOrdersFilterRequest,
    options: IPaginationOptions,
  ): Promise<IGenericResponse<Order[]>> => {
    const { page, limit, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, startDate, endDate, ...filterData } = filters;
  

    const andConditions = [];
  
    if (searchTerm) {
      andConditions.push({
        OR: OrdersSearchFields?.map((field) => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
      });
    }
    
    const utcDate = new Date().toLocaleString().split(",")[0]+" 00:00:00 AM";
    const bstTimeZone = "Asia/Dhaka";
    const bstDate = new Date(utcDate.toLocaleString('en-US', { timeZone: bstTimeZone }));

    if (!startDate && !endDate) {
      andConditions?.push({
        createdAt: {
          gte:new Date(bstDate).toISOString()
          ,
          lte:`${new Date(bstDate).toISOString().split('T')[0]}T23:59:59.000Z`,
        },
      });
    }
   
    const utcDate2 = new Date(startDate).toLocaleString().split(",")[0]+" 00:00:00 AM";
    const bstTimeZone2 = "Asia/Dhaka";
    const bstDate2 = new Date(utcDate2.toLocaleString('en-US', { timeZone: bstTimeZone2 }));

    const utcDate3 = new Date(endDate).toLocaleString().split(",")[0]+" 11:59:59 PM";
    const bstTimeZone3 = "Asia/Dhaka";
    const bstDate3 = new Date(utcDate3.toLocaleString('en-US', { timeZone: bstTimeZone3 }));

    if (startDate && endDate) {
      andConditions?.push({
        createdAt: {
          gte: new Date(bstDate2).toISOString(),
          lte: new Date(bstDate3).toISOString(),
        },
      });
    }

   

    if (Object.keys(filterData).length > 0) {
      andConditions.push({
        AND: Object.keys(filterData).map((key) => ({
          [key]: {
            equals: (filterData as any)[key],
          },
        })),
      });
    }
   
    const whereConditions: Prisma.OrderWhereInput =
      andConditions.length > 0 ? { AND: andConditions } : {};
    const result = await prisma.order.findMany({
      where: whereConditions,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            address: true,
            contactNo: true,
            role: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy:
        options.sortBy && options.sortOrder
          ? {
              [options.sortBy]: options.sortOrder,
            }
          : {
              createdAt: 'desc',
            },
    });
  
    const total =  result.length;
  
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  };
  


  const findAllOrdersbyShopID = async (userId: string, filters:IOrdersFilterRequest,): Promise<Order[] | null> => {
    const {searchTerm,startDate, endDate, } = filters;

    const andConditons = [];
    if(userId){
      andConditons?.push({
        userId:userId
      })
  }
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

    const utcDate = new Date().toLocaleString().split(",")[0]+" 00:00:00 AM";
    const bstTimeZone = "Asia/Dhaka";
    const bstDate = new Date(utcDate.toLocaleString('en-US', { timeZone: bstTimeZone }));

    if (!startDate && !endDate) {
      andConditons?.push({
        createdAt: {
          gte:new Date(bstDate).toISOString()
          ,
          lte:`${new Date(bstDate).toISOString().split('T')[0]}T23:59:59.000Z`,
        },
      });
    }
   
    const utcDate2 = new Date(startDate).toLocaleString().split(",")[0]+" 00:00:00 AM";
    const bstTimeZone2 = "Asia/Dhaka";
    const bstDate2 = new Date(utcDate2.toLocaleString('en-US', { timeZone: bstTimeZone2 }));

    const utcDate3 = new Date(endDate).toLocaleString().split(",")[0]+" 11:59:59 PM";
    const bstTimeZone3 = "Asia/Dhaka";
    const bstDate3 = new Date(utcDate3.toLocaleString('en-US', { timeZone: bstTimeZone3 }));

    if (startDate && endDate) {
      andConditons?.push({
        createdAt: {
          gte: new Date(bstDate2).toISOString(),
          lte: new Date(bstDate3).toISOString(),
        },
      });
    }
   
   

    const whereConditions: Prisma.OrderWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

    const result = await prisma.order.findMany({
      where: {
        AND: whereConditions
      },
      include: {
        user: {
          select: {
              id: true,
              username: true,
              email: true,
              address: true,
              contactNo: true, 
              role: true,        
          }
      } },
    })

    return result
  
  };

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
    findAllOrdersbyShopID,
    findSingrlOrdrs
   
    
  };
  