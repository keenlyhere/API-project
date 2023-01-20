import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { loadSpotBookings } from "../../../store/bookingReducer";
import "./SpotBookings.css";
import SpotBookingsCard from "./SpotBookingsCard";

export default function SpotBookings() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const bookings = useSelector(state => state.bookings.spot);
    console.log("SpotBookings - spotId:", spotId);
    console.log("SpotBookings - spotBookings:", bookings);
    let spotBookings;

    useEffect(() => {
        dispatch(loadSpotBookings(spotId))
    }, [dispatch])

    if (!bookings) {
        return (
            <div className="SpotBookings-container">
                <h1>Bookings</h1>
                <h2 className="SpotBookings-no-bookings">
                    There are no bookings yet...
                </h2>
            </div>
        )
    }

    if (bookings) {
        spotBookings = Object.values(bookings);
        console.log("SpotBookings - spotBookings:", spotBookings);
    }

    return (
        <div className="SpotBookings-container">
            <h1 className="SpotBookings-header">Bookings</h1>
            { spotBookings && spotBookings.length && spotBookings.map((booking) => (
                <div
                    key={booking.id}
                    className="SpotBookings-booking-container"
                >
                    <SpotBookingsCard booking={booking} />
                </div>
            ))}
        </div>
    )
}
