export const calcPricePerNight = (price, nights) => {
    return Number(price * nights).toFixed(2);
}

export const calcCleaningFee = (price, nights) => {
    if (nights < 7) {
        return Number(price * nights * 0.15).toFixed(2);
    } else {
        const weeks = Math.floor(nights / 7);
        const remainingDays = nights % 7;
        const discount = (price * weeks * 0.1) + (price * remainingDays * 0.15);
        return Number(discount).toFixed(2);
    }
}

export const calcServiceFee = (price, nights) => {
    return Number(price * nights * 0.09).toFixed(2);
}

export const calcTotal = (nightly, cleaning, service) => {
    return Number(nightly + cleaning + service).toFixed(2);
}
