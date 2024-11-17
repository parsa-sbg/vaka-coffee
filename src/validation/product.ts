import toPersionNumber from '@/utils/toPersianNubmer'
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
    message: toPersionNumber(`حجم تصویر محصول نباید از 5 مگابایت بیشتر باشد .`),
    path: ['pictures']
});


const dynamicFieldSchema = z.object({

    key: z.string()
        .min(2, 'کلید داینامیک فیلد نباید از دو کاراکتر کمتر باشد.')
        .max(15, toPersionNumber('کلید داینامیک فیلد نباید از 15 کاراکتر بیشتر باشد.')),

    value: z.string()
        .min(2, 'مقدار داینامیک فیلد نباید از دو کاراکتر کمتر باشد.')
        .max(15, toPersionNumber('مقدار داینامیک فیلد نباید از 15 کاراکتر بیشتر باشد.')),

    id: z.any()
})

export const productSchema = z.object({

    name: z.string()
        .min(7, toPersionNumber('نام محصول باید حداقل 7 کاراکتر داشته باشد.'))
        .max(20, toPersionNumber('نام محصول باید حداکثر 20 کاراکتر داشته باشد.')),


    price: z.number()
        .min(0, 'مبلغ نمیتواند از صفر کمتر باشد !'),


    discount: z.number()
        .min(0, 'درصد تخفیف نمیتواند از صفر کمتر باشد !')
        .max(100, toPersionNumber('درصد تخفیف نمیتواند از 100 بیشتر باشد !')),


    dynamicFields: z.array(dynamicFieldSchema),

    stock: z.number()
        .min(0, 'موجودی انبار نمیتواند از صفر کمتر باشد !'),

    category: z.string({ message: 'دسته بندی انتخاب نشده !' }).min(1, "دسته‌بندی نمی‌تواند خالی باشد"),


    pictures: z.array(imageFileSchema)
})