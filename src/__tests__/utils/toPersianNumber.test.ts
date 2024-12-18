import toPersianNumber from "@/utils/toPersianNubmer";

test('testing toPersianNumber util', () => {
    expect(toPersianNumber('152')).toBe('۱۵۲');
    expect(toPersianNumber('2358987')).toBe('۲۳۵۸۹۸۷');

    expect(toPersianNumber('0')).toBe('۰');

    expect(toPersianNumber('-123')).toBe('-۱۲۳');

    expect(toPersianNumber('')).toBe('');

    expect(toPersianNumber('abc')).toBe('abc');
    expect(toPersianNumber('!@#')).toBe('!@#');

    expect(toPersianNumber('12abc34')).toBe('۱۲abc۳۴');
});