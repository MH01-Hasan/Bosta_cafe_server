import { User } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { UserFilterFileds } from "./user.contants";
import { UserService } from "./user.service";





const getAllUser = catchAsync(async (req:Request,res:Response)=>{
    const filters = pick(req.query,UserFilterFileds);
     const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
     const result = await UserService.getAllUser(filters, options);
     sendResponse<User[]>(res,{ 
      statusCode:httpStatus.OK,
      success:true,
      message:"User find successfully",
        meta: result.meta,
        data: result.data
  
    })
  
  })
  
  const findSingleUser = catchAsync(async (req:Request,res:Response)=>{
    const {id}= req.params
    const result = await UserService.findSingleUser(id);
    sendResponse<User>(res,{ 
      statusCode:httpStatus.OK,
      success:true,
      message:"User find successfully",
      data:result
  
    })
  
  })
  
  
  const updateSingleUser = catchAsync(async (req:Request,res:Response)=>{
    const {id}= req.params
    const result = await UserService.updateSingleUser(id,req.body);
    sendResponse<User>(res,{ 
      statusCode:httpStatus.OK,
      success:true,
      message:"User Update successfully",
      data:result
  
    })
  
  })
  
  const deleteSingleUser = catchAsync(async (req:Request,res:Response)=>{
    const {id}= req.params
    const result = await UserService.deleteSingleUser(id);
    sendResponse<User>(res,{ 
      statusCode:httpStatus.OK,
      success:true,
      message:"User Delete successfully",
      data:result
  
    })
  
  })
  
  
  
  
    export const UserController = {
        getAllUser,
        findSingleUser,
        updateSingleUser,
      deleteSingleUser
      
    };