import toPersianNumber from '@/utils/toPersianNubmer'
import { z } from 'zod'


const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const imageFileSchema = z.custom<File>((file) => {
    return (
        file instanceof File &&
        ALLOWED_FILE_TYPES.includes(file.type) &&
        file.size <= MAX_FILE_SIZE
    );
}, {
    message: toPersianNumber(`حجم تصویر محصول نباید از 5 مگابایت بیشتر باشد .`),
    path: ['pictures']
});


const dynamicFieldSchema = z.object({

    key: z.string()
        .min(2, 'کلید داینامیک فیلد نباید از دو کاراکتر کمتر باشد.')
        .max(30, toPersianNumber('کلید داینامیک فیلد نباید از 30 کاراکتر بیشتر باشد.')),

    value: z.string()
        .min(2, 'مقدار داینامیک فیلد نباید از دو کاراکتر کمتر باشد.')
        .max(30, toPersianNumber('مقدار داینامیک فیلد نباید از 30 کاراکتر بیشتر باشد.')),

    id: z.any()
})

export const productSchema = z.object({

    name: z.string()
        .min(7, toPersianNumber('نام محصول باید حداقل 7 کاراکتر داشته باشد.'))
        .max(50, toPersianNumber('نام محصول باید حداکثر 50 کاراکتر داشته باشد.')),

    shortName: z.string({message: 'نام کوتاه وارد نشده است.'})
        .max(20, 'نام کوتاه باید حداکثر بیست کاراکتر داشته باشد .')
        .min(5, 'نام کوتاه باید حداقل پنج کاراکتر داشته باشد .'),

    price: z.number()
        .min(0, 'مبلغ نمیتواند از صفر کمتر باشد !'),


    discount: z.number()
        .min(0, 'درصد تخفیف نمیتواند از صفر کمتر باشد !')
        .max(100, toPersianNumber('درصد تخفیف نمیتواند از 100 بیشتر باشد !')),


    dynamicFields: z.array(dynamicFieldSchema),

    stock: z.number()
        .min(0, 'موجودی انبار نمیتواند از صفر کمتر باشد !'),

    category: z.string({ message: 'دسته بندی انتخاب نشده !' }).min(1, "دسته‌بندی نمی‌تواند خالی باشد"),


    pictures: z.array(imageFileSchema)
})