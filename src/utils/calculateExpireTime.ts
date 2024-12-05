export const calculateExpireTime = (createdAt: Date) => {

    const orderCreatedAt = new Date(createdAt);
    const currentTime = Date.now();
    const timeDifference = currentTime - orderCreatedAt.getTime();

    const expirationTime = 24 * 60 * 60 * 1000;
    const remainingTime = expirationTime - timeDifference;

    const hoursRemaining = Math.floor(remainingTime / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

    return {
        hoursRemaining,
        minutesRemaining
    }
}