import toPersianNumber from "@/utils/toPersianNubmer";
import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 512; //1 mb
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const imageFileSchema = z.custom<File>()
	.superRefine((file, ctx) => {

		if (!file) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "لطفا عکس را انتخاب کنید .",
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
				message: `حجم عکس باید کمتر از 500 کیلوبایت باشد.`,
			});
		}
	})



export const articleSchema = z.object({

	shortName: z
		.string()
		.min(3, toPersianNumber("نام کوتاه باید حداقل 3 کاراکتر داشته باشد !"))
		.max(30, toPersianNumber("نام کوتاه نمیتواند از 30 کاراکتر بیشتر باشد !"))
		.regex(/^\S*$/, "نام کوتاه نباید حاوی فاصله باشد .")
		.regex(/^[A-Za-z0-9]*$/, "نام کوتاه فقط میتواند شامل حروف و اعداد انگلیسی باشد.")
		.trim(),

	title: z.string()
		.min(8, "عنوان بسیار کوتاه است !")
		.trim(),

	description: z.string()
		.min(20, 'توضیحات باید بیشتر باشد !')
		.trim(),

	content: z.string()
		.min(50, 'مقاله بسیار کوتاه است !'),

	image: z.optional(imageFileSchema)

});
