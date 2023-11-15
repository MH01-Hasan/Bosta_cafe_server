import { Order } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { OrdersFilterFileds } from "./orders.contants";
import { OrdeersService } from "./orders.service";

const createOrders = catchAsync(async (req:Request,res:Response)=>{
    const result = await OrdeersService.createOrders(req.body);
    console.log(result)
    sendResponse<Order>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Order Created successfully",
        data:result
        
    })
})




const getAllOrders = catchAsync(async (req:Request,res:Response)=>{
  const filters = pick(req.query,OrdersFilterFileds);
  const {userId}= req.params
   const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
   const result = await OrdeersService.getAllOrders(filters, options,userId);
   sendResponse<Order[]>(res,{ 
    statusCode:httpStatus.OK,
    success:true,
    message:"Orders find successfully",
      meta: result.meta,
      data: result.data

  })

})



// const findAllOrdersbyShopID = catchAsync(async (req:Request,res:Response)=>{
//   const filters = pick(req.query,OrdersFilterFileds);

//   const {userId}= req.params
//   const result = await OrdeersService.findAllOrdersbyShopID(userId,filters);
//   sendResponse<Order[]>(res,{ 
//     statusCode:httpStatus.OK,
//     success:true,
//     message:"Orders find successfully",
//     data:result

//   })

// })

const findSingrlOrdrs = catchAsync(async (req:Request,res:Response)=>{
  const {id}= req.params
  const result = await OrdeersService.findSingrlOrdrs(id);
  sendResponse<Order>(res,{ 
    statusCode:httpStatus.OK,
    success:true,
    message:"Orders find successfully",
    data:result

  })

})


// const updateSingleProduct = catchAsync(async (req:Request,res:Response)=>{
//   const {oldproductimage,productImage} = req.body
//   if(oldproductimage?.mediaId !== productImage?.mediaId){
//     await cloudinaryDestroy(oldproductimage?.mediaId)
//   }

//   const body = req.body;
//   delete req.body.oldproductimage
//   const {id}= req.params
//   const result = await ProductService.updateSingleProduct(id,body);
//   sendResponse<Product>(res,{ 
//     statusCode:httpStatus.OK,
//     success:true,
//     message:"Product Update successfully",
//     data:result

//   })

// })

// const deleteSingleProduct = catchAsync(async (req:Request,res:Response)=>{
//   const {id}= req.params
//   const result = await ProductService.deleteSingleProduct(id);
//   sendResponse<Product>(res,{ 
//     statusCode:httpStatus.OK,
//     success:true,
//     message:"Product Delete successfully",
//     data:result

//   })

// })




  export const OrdersController = {
    createOrders,
    getAllOrders,
    // findAllOrdersbyShopID,
    findSingrlOrdrs
   
    
  };
  