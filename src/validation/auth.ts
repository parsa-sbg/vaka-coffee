import toPersianNumber from "@/utils/toPersianNubmer";
import { z } from "zod";


export const nameSchema = z.string({message: 'نام الزامی است.'})
    .min(3, 'نام بسیار کوتاه است !')
    .max(20, toPersianNumber('نام نمیتواند از 20 کاراکتر بیشتر باشد !'))
    .trim()

export const passwordSchema = z.string({message: 'پسسورد الزامی است.'})
    .regex(/^\S*$/, "فرمت پسورد صحیح نیست .")
    .min(8, toPersianNumber('رمز عبور باید حداقل 8 کاراکتر باشد.'))


export const usernameSchema = z.string({message: 'نام کاربری الزامی است.'})
    .min(5, toPersianNumber('نام کاربری باید از 5 کاراکتر بیشتر باشد.'))
    .max(20, toPersianNumber('نام کاربری نباید از 20 کاراکتر بیشتر باشد.'))
    .regex(/^[A-Za-z0-9]*$/, 'نام کاربری فقط میتواند شامل حروف و اعداد انگلیسی باشد.')
    .regex(/^\S*$/, "فرمت نام کاربری صحیح نیست !")
    .trim()
    .toLowerCase()


export const phoneSchema = z.string({message: 'شماره تماس الزامی است.'})
    .startsWith('09', 'شماره تماس باید با 09 شروع شود.')
    .regex(/^\d*$/, "شماره تماس صحیح نیست.")
    .length(11, 'شماره تماس باید شامل 11 عدد باشد.')

export const otpSchema = z.string({message: 'کد یکبار مصرف الزامی است.'})
    .length(5, 'کد یکبار مصرف باید 5 رقم داشته باشد.')


export const lastNameSchema = z.string()
    .min(3, 'نام خانوادگی بسیار کوتاه است !')
    .max(35, toPersianNumber('نام خانوادگی نمیتواند از 35 کاراکتر بیشتر باشد !'))
    .trim()


export const emailSchema = z.string()
    .email(' این ایمیل معتبر نیست !')
    .min(1, 'ُلطفا ایمیل را وارد کنید .')


export const cartItemSchema = z.object({
    count: z.number().min(1, 'تعداد محصول نمیتواند صفر یا منفی باشد .'),
    product: z.string().min(1, 'آیدی محصول وارد نشده است.')
})

// // // // // // // //


export const userRegisterSchema = z.object({
    name: nameSchema,
    username: usernameSchema,
    phone: phoneSchema,
    otp: otpSchema,
    password: passwordSchema,
    repeatPassword: z.string(),
    localCart: z.array(cartItemSchema)
}).refine((data) => data.password === data.repeatPassword, {
    path: ['repeatPassword'],
    message: 'تکرار رمز عبور صحیح نیست !'
})

export const userLoginWithOtpSchema = z.object({
    phone: phoneSchema,
    otp: otpSchema,
})


export const updateUserInfosSchema = z.object({
    name: nameSchema,
    lastName: z.optional(lastNameSchema),
    email: z.optional(emailSchema)
})


export const cahngePhoneSchema = z.object({
    newPhone: phoneSchema,
    otpCode: otpSchema,
})