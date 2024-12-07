var moment = require('moment-jalaali')

export const toPersianDate = (date: Date) => {
    return (moment(date).locale('fa').format(' H:mm   -  jYYYY/jM/jD'))
}