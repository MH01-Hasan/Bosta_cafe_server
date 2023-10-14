import { Product } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { cloudinaryDestroy } from "../../../helpers/FileUploadHelper";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { ProductFilterFileds } from "./product.contants";
import { ProductService } from "./product.service";

const createProduct = catchAsync(async (req:Request,res:Response)=>{
    const result = await ProductService.createProduct(req?.body);
    sendResponse<Product>(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Product Created successfully",
        data:result
    })
})




const getAllproduct = catchAsync(async (req:Request,res:Response)=>{
  const filters = pick(req.query,ProductFilterFileds);
   const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
   const result = await ProductService.getAllproduct(filters, options);
   sendResponse<Product[]>(res,{ 
    statusCode:httpStatus.OK,
    success:true,
    message:"Product find successfully",
      meta: result.meta,
      data: result.data

  })

})



const findSingleProduct = catchAsync(async (req:Request,res:Response)=>{
  const {id}= req.params
  const result = await ProductService.findSingleProduct(id);
  sendResponse<Product>(res,{ 
    statusCode:httpStatus.OK,
    success:true,
    message:"Product find successfully",
    data:result

  })

})


const updateSingleProduct = catchAsync(async (req:Request,res:Response)=>{
  const {oldproductimage} = req.body
  if(oldproductimage?.mediaId){
    await cloudinaryDestroy(oldproductimage?.mediaId)

  }
  const body = req.body;
  delete req.body.oldproductimage
  const {id}= req.params
  const result = await ProductService.updateSingleProduct(id,body);
  sendResponse<Product>(res,{ 
    statusCode:httpStatus.OK,
    success:true,
    message:"Product Update successfully",
    data:result

  })

})

const deleteSingleProduct = catchAsync(async (req:Request,res:Response)=>{
  const {id}= req.params
  const result = await ProductService.deleteSingleProduct(id);
  sendResponse<Product>(res,{ 
    statusCode:httpStatus.OK,
    success:true,
    message:"Product Delete successfully",
    data:result

  })

})




  export const ProductController = {
    createProduct,
    updateSingleProduct,
    deleteSingleProduct,
    findSingleProduct,
    getAllproduct
    
  };
  