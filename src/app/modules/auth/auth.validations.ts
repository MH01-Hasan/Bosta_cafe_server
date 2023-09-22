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
        profileImg: z.string({
            required_error: "profileImg is required"
        }),
      
    })
})
export const AuthValidation = {
    create
    
}