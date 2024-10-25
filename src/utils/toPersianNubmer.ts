const persianJs = require('persianjs');

export default function toPersionNumber(string: string) {
     return persianJs(string).englishNumber().toString()
}