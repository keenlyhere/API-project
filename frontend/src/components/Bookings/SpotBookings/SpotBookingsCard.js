import { convertDate, getDaysUntilReservation, getMonthDayYear, getMonthName } from "../../../utils/dateFormatting";
import "./SpotBookingsCard.css";

export default function SpotBookingsCard({ booking }) {
    const { firstName, lastName } = booking.User;
    const { updatedAt, startDate, endDate } = booking;
    // console.log("SpotBookingsCard - booking:", booking);
    // console.log("SpotBookingsCard - updatedAt:", updatedAt);
    // console.log("SpotBookingsCard - firstName, lastName:", firstName, lastName);

    const getReservationDates = (startDate, endDate) => {
        const startDateObj = getMonthDayYear(startDate);
        const endDateObj = getMonthDayYear(endDate);
        const startMonth = getMonthName(startDate);
        const endMonth = getMonthName(endDate);

        const startDay = startDateObj.day;
        const startYear = startDateObj.year;
        const endDay = endDateObj.day;
        const endYear = endDateObj.year;

        return (
            <div className="SpotBookingsCard-booking-right">
                <div className="SpotBookingsCard-booking-right-top">
                    <div className="SpotBookingsCard-date">
                        <p className="SpotBookingsCard-booking-small-text">
                            start date:
                        </p>
                        <h2 className="SpotBookingsCard-booking-date-header">
                            {startMonth} {startDay}
                        </h2>
                        <h2 className="SpotBookingsCard-booking-date-header">
                            {startYear}
                        </h2>
                    </div>
                    <div className="SpotBookingsCard-dash">
                        <p className="SpotBookingsCard-booking-date-header">
                            -
                        </p>
                    </div>
                    <div className="SpotBookingsCard-date">
                        <p className="SpotBookingsCard-booking-small-text">
                            end date:
                        </p>
                        <h2 className="SpotBookingsCard-booking-date-header">
                            {endMonth} {endDay}
                        </h2>
                        <h2 className="SpotBookingsCard-booking-date-header">
                            {endYear}
                        </h2>
                    </div>
                </div>
                <div className="SpotBookingsCard-booking-right-bottom">
                    <div className="SpotBookingsCard-booking-bottom-right-bottom">
                        <p className="SpotBookingsCard-booking-small-text">
                            Days until {firstName}'s stay:
                        </p>
                        <h2 className="SpotBookingsCard-booking-date-header">
                            {getDaysUntilReservation(startDate)}
                        </h2>
                    </div>
                    <div className="SpotBookingsCard-booking-bottom-right-bottom">
                        <p className="SpotBookingsCard-booking-small-text">
                            Stay duration:
                        </p>
                        <h2 className="SpotBookingsCard-booking-date-header">
                            {getDaysUntilReservation(startDate, endDate)}
                        </h2>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="SpotBookingsCard-container">
            <div className="SpotBookingsCard-profile-pic">
                <img src="https://images.pexels.com/photos/2647053/pexels-photo-2647053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                <h2 className="SpotBookingsCard-name">
                    {firstName} {lastName}
                </h2>
                <p className="SpotBookingsCard-date-booked">
                    <span className="SpotBookingsCard-last-update">
                        Booking last updated on:
                    </span>
                    {convertDate(updatedAt)}
                </p>
            </div>
            <div className="SpotBookingsCard-renter-info">
                {getReservationDates(startDate, endDate)}
            </div>
        </div>
    )
}
