import toPersionNumber from "@/utils/toPersianNubmer";
import { z } from "zod";

export const categorySchema = z.object({
    name: z.string({message: 'iosjgdi'})
        .min(3, 'نام بسیار کوتاه است !')
        .max(20, toPersionNumber('نام نمیتواند از 20 کاراکتر بیشتر باشد !'))
        .trim(),

    shortName: z.string()
        .min(3, toPersionNumber('نام کوتاه باید حداقل 3 کاراکتر داشته باشد !'))
        .max(15, toPersionNumber('نام کوتاه نمیتواند از 15 کاراکتر بیشتر باشد !'))
        .regex(/^\S*$/, "نام کوتاه نباید حاوی فاصله باشد .")
        .trim(),
})