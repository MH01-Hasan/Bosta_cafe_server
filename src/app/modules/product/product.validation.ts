import { z } from "zod";

const create = z.object({
    body: z.object({
        name: z.string({
            required_error: "name is required"
        }),
      
        price: z.string({
            required_error: "price is required"
        }),
        flavor: z.string({
            required_error: "flavor is required"
        }),
        productImage: z.object({
            
        }),
        discount: z.string().optional(),
        size: z.string().optional(),
        categoryId: z.string({
            required_error: "categoryId is required"
        }),
       
    })
})

const update = z.object({
    body: z.object({
        name: z.string().optional(),
        price: z.string().optional(),
        flavor: z.string().optional(),
        discount: z.string().optional(),
        size: z.string().optional(),
        categoryId: z.string().optional(),
    })
});

export const ProductValidation = {
    create,
    update
}