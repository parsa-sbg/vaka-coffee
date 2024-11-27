const persianJs = require('persianjs');

export default function toPersianNumber(string: string) {
     return persianJs(string).englishNumber().toString()
}