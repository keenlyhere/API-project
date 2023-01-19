import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { loadSpotDetails } from "../../../store/spotReducer";

import "./BookingCard.css";

export default function BookingCard({ booking, spotId }) {
    const dispatch = useDispatch();

    const spot = useSelector(state => state.spots.spot[spotId]);
    console.log("BookingCard - spot:", spot);
    console.log("BookingCard - booking:", booking);
    // const startDate = booking.startDate;
    // const endDate = booking.endDate;
    const { startDate, endDate } = booking;
    const { address, city, state, country } = booking.Spot;
    console.log("city", city)

    useEffect(() => {
        dispatch(loadSpotDetails(+spotId));
    }, [dispatch]);

    const getMonthYear = (date) => {
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

    const getReservationDates = (startDate, endDate) => {
        const startDateObj = getMonthYear(startDate);
        const endDateObj = getMonthYear(endDate);
        console.log("startobj", startDateObj);
        console.log("endobj", endDateObj)
        const startMonth = getMonthName(startDate);
        const endMonth = getMonthName(endDate);

        if (startDateObj.month === endDateObj.month) {
            return (
                <div className="BookingCard-description-date">
                    <p className="BookingCard-tertiary-header">
                        {startMonth}
                    </p>
                    <p className="BookingCard-tertiary-header">
                        {startDateObj.day} - {endDateObj.day}
                    </p>
                    <p className="BookingCard-small-text">
                        {startDateObj.year}
                    </p>
                </div>
            )
        } else if (startDateObj.month < endDateObj.month || (+startDateObj.month === 12 && +endDateObj.month < 12)) {
            if (startDateObj.year === endDateObj.year) {
                return (
                    <div className="BookingCard-description-date">
                        <p className="BookingCard-tertiary-header">
                            {startMonth} {startDateObj.day} -
                        </p>
                        <p className="BookingCard-tertiary-header">
                            {endMonth} {endDateObj.day}
                        </p>
                        <p className="BookingCard-description-small-text">
                            {startDateObj.year}
                        </p>
                    </div>
                )
            } else {
                return (
                    <div className="BookingCard-description-date">
                        <p className="BookingCard-tertiary-header">
                            {startMonth} {startDateObj.day} -
                        </p>
                        <p className="BookingCard-tertiary-header">
                            {endMonth} {endDateObj.day}
                        </p>
                        <p className="BookingCard-description-small-text">
                            {startDateObj.year} - {endDateObj.year}
                        </p>
                    </div>
                )
            }
        }
    }

    let altImages = [
        "https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/12776422/pexels-photo-12776422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/4910769/pexels-photo-4910769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/10549901/pexels-photo-10549901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/4909803/pexels-photo-4909803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        ];

    if (spot) {
        if (spot.SpotImages.length === 1 && spot.SpotImages !== "No images for spot") {
            altImages = [spot.SpotImages[0].url];
        } else if (spot.SpotImages.length > 1 && spot.SpotImages.length < 4) {
            spot.SpotImages.forEach(image => altImages.unshift(image.url));
        }
    }

    const getMonthName = (date) => {
        const newDate = new Date(date);
        console.log("newDate:", newDate);
        const month = newDate.toLocaleDateString("default", { month: "long" })
        console.log("month:", month)
        return month.slice(0,3);
    }

    const getDaysUntilReservation = (startDate) => {
        const now = new Date();
        const start = new Date(startDate);

        const difference = start.getTime() - now.getTime();
        console.log("getMonthName - difference:", difference);
        const convertToDays = difference / ( 1000 * 60 * 60 * 24 )
        console.log("getMonthName - convertToDays:", convertToDays);

        return Math.round(convertToDays);
    }

    if (!spot) return null;

    return (
        <div className="BookingCard-container">
            <div className="BookingCard-description">
                <div className="BookingCard-description-top">
                    <h2 className="BookingCard-description-spot-name">{booking.Spot.name}</h2>
                    <p className="BookingCard-description-small-text">
                        Entire home hosted by {spot.Owner.firstName}
                    </p>
                </div>

                {getReservationDates(startDate, endDate)}

                <div className="BookingCard-description-address">
                    <p className="BookingCard-tertiary-header">
                        {address}
                    </p>
                    <p className="BookingCard-tertiary-header">
                        {city}, {state}
                    </p>
                    <p className="BookingCard-description-small-text">
                        {country}
                    </p>
                </div>
            </div>

            <div className="BookingCard-image-container">
                <p className="BookingCard-image-days">
                    In {getDaysUntilReservation(startDate, endDate)} days
                </p>
                <div className="BookingCard-image">
                    <img src={altImages[0]} />
                </div>
            </div>
        </div>
    )
}
