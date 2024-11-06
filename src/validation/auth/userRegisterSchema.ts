import toPersionNumber from "@/utils/toPersianNubmer";
import { z } from "zod";


export const userRegisterSchema = z.object({
    name: z.string()
        .min(3, 'نام بسیار کوتاه است !')
        .max(20, toPersionNumber('نام نمیتواند از 20 کاراکتر بیشتر باشد !'))
        .regex(/^\S*$/, "فرمت نام صحیح نیست !")
        .trim(),
    username: z.string()
        .min(5, toPersionNumber('نام کاربری باید از 5 کاراکتر بیشتر باشد.'))
        .max(20, toPersionNumber('نام کاربری نباید از 20 کاراکتر بیشتر باشد.'))
        .regex(/^[A-Za-z0-9]*$/, 'نام کاربری فقط میتواند شامل حروف و اعداد انگلیسی باشد.')
        .regex(/^\S*$/, "فرمت نام کاربری صحیح نیست !")
        .trim(),
    phone: z.string()
        .startsWith('09', 'شماره تماس باید با 09 شروع شود.')
        .regex(/^\d*$/, "شماره تماس صحیح نیست.")
        .length(11, 'شماره تماس باید شامل 11 عدد باشد.'),
    password: z.string()
        .regex(/^\S*$/, "فرمت پسورد صحیح نیست .")
        .min(8, toPersionNumber('رمز عبور باید حداقل 8 کاراکتر باشد.')),
    repeatPassword: z.string(),
}).refine((data) => data.password === data.repeatPassword, {
    path: ['repeatPassword'],
    message: 'تکرار رمز عبور صحیح نیست !'
})