import { z } from "zod";

const create = z.object({
    body: z.object({
        name: z.string({
            required_error: "name is required"
        }),
      
        price: z.number({
            required_error: "price is required"
        }),
        flavor: z.string({
            required_error: "flavor is required"
        }),
        discount: z.number().optional(),
        categoriId: z.string({
            required_error: "categoriId is required"
        }),
    })
})

const update = z.object({
    body: z.object({
        name: z.string().optional(),
        price: z.number().optional(),
        flavor: z.string().optional(),
        discount: z.number().optional(),
        categoriId: z.string().optional(),
    })
});

export const ProductValidation = {
    create,
    update
}