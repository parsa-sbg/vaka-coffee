import toPersionNumber from "@/utils/toPersianNubmer";
import { z } from "zod";

const MAX_FILE_SIZE = 1 * 1024 * 512; //500kb
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];


export const imageFileSchema = z.custom<File>()
    .superRefine((file, ctx) => {

        if (!file) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "لطفا آیکون را انتخاب کنید .",
            });
            return;
        }

        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "فرمت فایل مجاز نیست. فرمت‌های مجاز: JPEG, PNG و غیره.",
            });
        }

        if (file.size > MAX_FILE_SIZE) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `حجم فایل باید کمتر از 500 کیلوبایت باشد.`,
            });
        }
    });


export const CategoryImageFileSchema = z.object({
    icon: imageFileSchema
})

export const categorySchema = z.object({
    name: z.string({ message: 'iosjgdi' })
        .min(3, 'نام بسیار کوتاه است !')
        .max(20, toPersionNumber('نام نمیتواند از 20 کاراکتر بیشتر باشد !'))
        .trim(),

    shortName: z.string()
        .min(3, toPersionNumber('نام کوتاه باید حداقل 3 کاراکتر داشته باشد !'))
        .max(15, toPersionNumber('نام کوتاه نمیتواند از 15 کاراکتر بیشتر باشد !'))
        .regex(/^\S*$/, "نام کوتاه نباید حاوی فاصله باشد .")
        .regex(/^[A-Za-z0-9]*$/, 'نام کوتاه فقط میتواند شامل حروف و اعداد انگلیسی باشد.')
        .trim(),
})