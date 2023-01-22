import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router";
import { addBooking, loadUserBookings } from "../../../store/bookingReducer";
import { calcCleaningFee, calcPricePerNight, calcServiceFee, calcTotal } from "../../../utils/bookingCalculator";
import { convertDates, defaultDates, getDaysUntilReservation } from "../../../utils/dateFormatting";
import "./CreateBookingForm.css"

export default function CreateBookingForm({ rating, numReviews }) {
    const { spotId } = useParams();
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const spot = useSelector(state => state.spots.spot[spotId]);
    // console.log("CreateBookingForm - spot:", spot, "*** spotId:", spotId);

    const [ startDate, setStartDate ] = useState(defaultDates("start"));
    const [ endDate, setEndDate ] = useState(defaultDates("end"));
    const [ errors, setErrors ] = useState([]);

    // console.log("*** startDate:", startDate, "*** endDate:", endDate);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newBooking = {
            startDate,
            endDate
        }

        // console.log("handleSubmit - newBooking:", newBooking);

        const sendNewBooking = await dispatch(addBooking(+spotId, newBooking))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })

        if (sendNewBooking) {
            dispatch(loadUserBookings(user.id))
            history.push(`/my-trips`)
        }
    }

    const getFees = (startDate, endDate, price) => {
        const fees = {};
        const numDaysStay = getDaysUntilReservation(startDate, endDate);

        fees.nightsTotal = calcPricePerNight(price, numDaysStay);
        fees.cleaningTotal = calcCleaningFee(price, numDaysStay);
        fees.serviceTotal = calcServiceFee(price, numDaysStay);
        // console.log("fees", fees)
        fees.total = calcTotal(+fees.nightsTotal, +fees.cleaningTotal, +fees.serviceTotal);

        return fees;
    }

    const fees = getFees(startDate, endDate, spot.price);
    // console.log(fees)

    if (!user) return null;

    return (
        <div className="CreateBookingForm-container">
            <div className="CreateBookingForm-header-container">
                <div className="CreateBookingForm-header-container-left">
                    <h1 className="CreateBookingForm-header">${Number(spot.price).toFixed(2)}</h1>
                    <span className="CreateBookingForm-header-night">night</span>
                </div>
                <div className="CreateBookingForm-header-container-right">
                    <p className="CreateBookingForm-subtitle-text-rating SpotDetails-bold"> {rating}</p>
                    <p className="CreateBookingForm-subtitle-text">{numReviews} reviews</p>
                </div>
            </div>
            <div className="CreateBookingForm-error-container">
                <ul className="CreateBookingForm-errors">
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
            </div>
            <form
                onSubmit={handleSubmit}
                className="CreateBookingForm-form"
            >
            <div className="CreateBookingForm-main-container">
                <div className="CreateBookingForm-group">
                    <div className="startDate">
                        <input
                        className="CreateBookingForm-lat"
                            id="startDate"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <label htmlFor="lat">
                            Check-In
                        </label>
                    </div>
                    <div className="endDate">
                        <input
                        className="CreateBookingForm-lat"
                            id="endDate"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <label htmlFor="lat">
                            Check-Out
                        </label>
                    </div>
                </div>
            </div>

            <div className="CreateBookingForm-button-container">
                <button type="submit" className="CreateBookingForm-submit">Reserve</button>
            </div>

            </form>

            <div className="CreateBookingForm-bottom-container">
                <p className="CreateBookingForm-small-text-no-charge">
                    You won't be charged yet.
                </p>
                <div className="CreateBookingForm-charges-container">
                    <div className="CreateBookingForm-charges-groups">
                        <div className="CreateBookingForm-charge-group">
                            <p className="CreateBookingForm-charge-header">${Number(spot.price).toFixed(2)} x {getDaysUntilReservation(startDate, endDate)} nights</p>
                            <p className="CreateBookingForm-charge-calc">${fees.nightsTotal}</p>
                        </div>
                        <div className="CreateBookingForm-charge-group">
                            <p className="CreateBookingForm-charge-header">Cleaning fee</p>
                            <p className="CreateBookingForm-charge-calc">${fees.cleaningTotal}</p>
                        </div>
                        <div className="CreateBookingForm-charge-group">
                            <p className="CreateBookingForm-charge-header">Service fee</p>
                            <p className="CreateBookingForm-charge-calc">${fees.serviceTotal}</p>
                        </div>
                    </div>
                    <div className="CreateBookingForm-divider"></div>
                    <div className="CreateBookingForm-charge-total">
                        <p className="CreateBookingForm-total-header">Total before taxes</p>
                        <p className="CreateBookingForm-total-calc">${fees.total}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
