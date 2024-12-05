var moment = require('moment-jalaali')

export const toPersianDate = (date: Date) => {
    return (moment(date).locale('fa').format(' h:mm  -  jYYYY/jM/jD'))
}