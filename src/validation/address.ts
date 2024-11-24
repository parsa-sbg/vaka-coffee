import { z } from "zod";

export const addressSchema = z.object({
    name: z.string().min(3, 'نام بسیار کوتاه است .'),
    family: z.string().min(3, 'نام خانوادگی بسیار کوتاه است .'),
    state: z.string().min(1, 'استان انتخاب نشده است .'),
    city: z.string().min(1, 'شهر انتخاب نشده است .'),
    address: z.string().min(10, 'آدرس بسیار کوتاه است .'),
    houseNumber: z.string().min(1, 'پلاک را وارد کنید .'),
})