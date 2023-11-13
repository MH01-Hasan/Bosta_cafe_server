import { Order, Prisma } from "@prisma/client";
import { prisma } from "../../../shared/prisma";



const createOrders = async (payload:Order ): Promise<Order> => {
  // const user = await prisma.user.findUnique({
  //   where: { id: payload.userId },
  // });
  
  // if (!user) {
  //   throw new Error("User not found");
  // }
  // payload.userId = user.id;
    const result = await prisma.order.create({
      data: {
        ...payload,
        cart:payload.cart as Prisma.JsonObject
      },
    });
    return result;
  };



// const getAllproduct = async (
//   filters:IProductFilterRequest,
//   options:IPaginationOptions

// ):Promise< IGenericResponse <Product[]>> =>{
//   const{page,limit,skip} = paginationHelpers.calculatePagination(options);
//   const {searchTerm, ...filterData} = filters;
//   const andConditons = [];

//   if(searchTerm){
//       andConditons?.push({
//           OR:ProductSearchFields?.map((field) => ({
//               [field]:{
//                   contains:searchTerm,
//                   mode:'insensitive'
//               }
//           }))
//       })
//   }
 
//   if (Object.keys(filterData)?.length > 0) {
//       andConditons.push({
//           AND: Object?.keys(filterData)?.map((key) => ({
//               [key]: {
//                   equals: (filterData as any)[key]
//               }
//           }))
//       })
//   }

//   const whereConditons: Prisma.ProductWhereInput =
//       andConditons.length > 0 ? { AND: andConditons } : {};
//   const result = await prisma.product.findMany({
//       where: whereConditons,
//       include: {
//                   category: true,
//               },
//       skip,
//       take: limit,
//       orderBy: options.sortBy && options.sortOrder
//           ? {
//               [options.sortBy]: options.sortOrder
//           }
//           : {
//               createdAt: 'desc'
//           }
//   });

//   const total = await prisma?.product?.count();

//   return {
//       meta: {
//           page,
//           limit,
//           total,
//       },
//       data: result
//   }



// }


//   const findSingleProduct = async (id: string): Promise<Product | null> => {
//     const result = await prisma.product.findUnique({
//       where: {
//         id
//       },
//       include: {
//         category: true,
//       },
//     })
//     return result;
//   };


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
   
    
  };
  