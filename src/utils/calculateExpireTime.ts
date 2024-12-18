
type retureType1 = {
    isExpired: false,
    hoursRemaining: number
}

type retureType2 = {
    isExpired: true,
    hoursRemaining: 0
}

type retureType3 = {
    isExpired: false,
    hoursRemaining: 'infinite'
}

export const calculateExpireTime = (expireAt: Date | null): retureType1 | retureType2 | retureType3 => {


    if (!expireAt) {
        return {
            isExpired: false,
            hoursRemaining: 'infinite'
        }
    }

    const orderExpireTime = new Date(expireAt).getTime();
    const currentTime = Date.now()
    const timeDifference = orderExpireTime - currentTime


    if ( timeDifference <= 0) {
        return {
            isExpired: true,
            hoursRemaining: 0
        }
    }

    const hoursRemaining = Math.ceil(timeDifference / (1000 * 60 * 60));
    


    return {
        isExpired: false,
        hoursRemaining
    }
}