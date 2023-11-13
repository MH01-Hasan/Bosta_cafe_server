import { z } from "zod";

const create = z.object({
    body: z.object({
        cart: z.object({
            
        }),
        changeReturn: z.string({
            required_error: "changeReturn is change Return"
        }),
        discount: z.number({
            required_error: "discount is required"
        }),
        paymentMethod: z.string({
            required_error: "paymentMethod is required"
        }),

        grandTotal: z.number({
            required_error: "grandTotal is required"
        }),
        receivedAmount: z.number({
            required_error: "receivedAmount is required"
        }),
        shipping: z.number({
            required_error: "shipping is required"
        }),
        tax: z.number({
            required_error: "tax is required"
        }),

        userId: z.string({
            required_error: "userId is required"
        }),
   
    })
})


// id             String    @id @default(uuid())
// cart           Json
// changeReturn   String
// discount       Int
// grandTotal     Int
// paymentMethod  String
// receivedAmount Int
// shipping       Int
// tax            Int
// userId         String
// user           User   @relation(fields: [userId], references: [id])



// const update = z.object({
//     body: z.object({
//         name: z.string().optional(),
//         price: z.string().optional(),
//         flavor: z.string().optional(),
//         discount: z.string().optional(),
//         size: z.string().optional(),
//         categoryId: z.string().optional(),
//     })
// });

export const OrdersValidation = {
    create,
    // update
}