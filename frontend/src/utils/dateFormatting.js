export const getMonthDayYear = (date) => {
    const [ year, month, day ] = date.split("-");
    console.log("year/month/day", year, month, day)
    const dateObj = {
        year,
        month,
        day
    }
    // console.log("dateObj", dateObj);
    return dateObj;
}

export const convertDate = (date) => {
    const newDate = new Date(date);
    const month = newDate.toLocaleDateString("default", { month: "long" }).slice(0, 3);
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    console.log("day", day);

    return `${month} ${day} ${year}`
}

export const convertDates = (date) => {
    const [ year, month, day ] = date.split("-");
    const monthIndex = month - 1;
    const dateObj = new Date(year, monthIndex, day);
    return dateObj;
}

export const getMonthName = (date) => {
    const newDate = new Date(date);
    console.log("newDate:", newDate);
    const month = newDate.toLocaleDateString("default", { month: "long" })
    console.log("month:", month)
    return month.slice(0,3);
}

export const getDaysUntilReservation = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);

    if (endDate) {
        const end = new Date(endDate);
        const difference = end.getTime() - start.getTime();
        const convertToDays = difference / ( 1000 * 60 * 60 * 24 ) + 1;
        return Math.round(convertToDays);
    }

    const difference = start.getTime() - now.getTime();
    console.log("getMonthName - difference:", difference);
    const convertToDays = difference / ( 1000 * 60 * 60 * 24 );
    console.log("getMonthName - convertToDays:", convertToDays);

    return Math.round(convertToDays);
}
