import { Prisma, User } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { prisma } from "../../../shared/prisma";
import { UserSearchFields } from "./user.contants";
import { IUserFilterRequest } from "./user.interface";


const getAllUser = async (
    filters:IUserFilterRequest,
    options:IPaginationOptions
  
  ):Promise< IGenericResponse <User[]>> =>{
    const{page,limit,skip} = paginationHelpers.calculatePagination(options);
    const {searchTerm, ...filterData} = filters;
    const andConditons = [];
  
    if(searchTerm){
        andConditons.push({
            OR:UserSearchFields.map((field) => ({
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
  
    const whereConditons: Prisma.UserWhereInput =
        andConditons.length > 0 ? { AND: andConditons } : {};
  
    const result = await prisma.user.findMany({
        where: whereConditons,
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
    const total = await prisma.user.count();
 
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result
    } 
  }
  
  
    const findSingleUser = async (id: string): Promise<User|null> => {
      const result = await prisma.user.findUnique({
        where: {
          id
        },     
      })
      return result;
    };
  
  
  const updateSingleUser = async (id: string, payload: Partial<User>): Promise<User> => {
    const result = await prisma.user.update({
      where: {
        id,
      },
      data:payload   
    })
    return result;
  };
  
  const deleteSingleUser = async (id: string): Promise<User> => {
    const result = await prisma.user.delete({
      where: {
        id
      }
    })
    return result;
  };
  
    export const UserService = {
        getAllUser,
        findSingleUser,
        updateSingleUser,
       deleteSingleUser
      
    };