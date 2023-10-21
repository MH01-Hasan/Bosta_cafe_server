import { z } from "zod";

const create = z.object({
    body: z.object({
        username: z.string({
            required_error: "username is required"
        }),
        password: z.string({
            required_error: "password is required"
        }),
        email: z.string().optional(),

        role: z.string({
            required_error: "role is required"
        }),
        contactNo: z.string({
            required_error: "contactNo is required"
        }),
        address: z.string({
            required_error: "address is required"
        }),
        status: z.string({
            required_error: "status is required"
        }),
     
      
    })
})

const Userupdate = z.object({
    body: z.object({
        username: z.string().optional(),
        password: z.string().optional(),
        email: z.string().optional(),
        role: z.string().optional(),
        contactNo: z.string().optional(),
        address: z.string().optional(),
        status: z.string().optional(), 
    })
})

export const AuthValidation = {
    create,
    Userupdate
    
}