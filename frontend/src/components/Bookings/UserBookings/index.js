import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { loadUserBookings } from "../../../store/bookingReducer";
import { loadSpotDetails } from "../../../store/spotReducer";
import BookingCard from "./BookingCard";

import "./UserBookings.css";

export default function UserBookings() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const bookings = useSelector(state => state.bookings.user);
    const spots = useSelector(state => state.spot);
    let userBookings;
    console.log("UserBookings - user:", user);
    console.log("UserBookings - bookings:", bookings);
    console.log("UserBookings - spots", spots);

    useEffect(() => {
        dispatch(loadUserBookings(user.id));
    }, [dispatch])

    const getSpotOwnerName = async (spotId) => {
        const spot = await dispatch(loadSpotDetails(spotId));
        let spotOwner;
        console.log("SPOT", spot);

        if (spot) {
            spotOwner = spot.Owner.firstName;
            return spotOwner;
        }
    }

    if (!user) return null;

    if (!bookings) {
        console.log("hit line 20")
        return (
        <div className="UserBookings-container">
            <h1 className="UserBookings-header">Trips</h1>
            <div className="UserBookings-no-trips-container">
                <h2 className="UserBookings-secondary-header">
                    No trips booked...yet
                </h2>
                <p className="UserBookings-small-text">
                    Time to dust off your bags and start planning your next adventure
                </p>
            </div>
        </div>
        )
    }


    if (bookings) {
        userBookings = Object.values(bookings);
        console.log("UserBookings - userBookings:", userBookings);
    }

    if (!userBookings) return null;

    // if (!spots) return null;

    return (
        <div className="UserBookings-container">
            <h1 className="UserBookings-header">Trips</h1>
            { userBookings && userBookings.length && userBookings.map((booking) => (
                <div
                    key={booking.id}
                    className="UserBookings-booking-container"
                >
                    <BookingCard booking={booking} spotId={booking.spotId}/>
                </div>
            ))}
        </div>
    )
}
