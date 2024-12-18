const persianJs = require('persianjs');

export default function toPersianNumber(string: string) {
     if (!string) {
          return ''
     }
     return persianJs(string).englishNumber().toString()
}