import { z } from "zod";

export const commentSchema = z.object({
    comment: z.string()
        .min(5, `دیدگاه باید حداقل ${(5).toLocaleString('fa')} کاراکتر داشته باشد .`)
        .max(300, `دیدگاه باید حداکثر ${(300).toLocaleString('fa')} کاراکتر داشته باشد .`),

    productId: z.string(),

    score: z.number({message: 'لطفا امتیاز مورد نظرتون رو وارد کنید !'}).min(1, 'لطفا امتیاز مورد نظرتون رو وارد کنید !').max(5)
})