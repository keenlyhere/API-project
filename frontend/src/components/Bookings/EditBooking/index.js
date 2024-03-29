import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { addBooking, editBooking, loadUserBookings } from "../../../store/bookingReducer";
import { calcCleaningFee, calcPricePerNight, calcServiceFee, calcTotal } from "../../../utils/bookingCalculator";
import { defaultDates, getDaysUntilReservation, setEndDateOnStartDateChange } from "../../../utils/dateFormatting";

export default function EditBooking({ spotId, booking }) {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const spot = useSelector(state => state.spots.spot[spotId]);
    // console.log("EditBooking - booking:", booking);


    const [ startDate, setStartDate ] = useState(booking.startDate);
    const [ endDate, setEndDate ] = useState(booking.endDate);
    const [ errors, setErrors ] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const editedBooking = {
            startDate,
            endDate
        }

        const sendEditedBooking = await dispatch(editBooking(+booking.id, editedBooking))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })

        if (sendEditedBooking) {
            dispatch(loadUserBookings(user.id));
            // history.push(`/my-trips`)
            closeModal();
        }
    }

    const getFees = (startDate, endDate, price) => {
        const fees = {};
        const numDaysStay = getDaysUntilReservation(startDate, endDate);

        fees.nightsTotal = calcPricePerNight(price, numDaysStay);
        fees.cleaningTotal = calcCleaningFee(price, numDaysStay);
        fees.serviceTotal = calcServiceFee(price, numDaysStay);
        fees.total = calcTotal(+fees.nightsTotal, +fees.cleaningTotal, +fees.serviceTotal);

        return fees;
    }

    const fees = getFees(startDate, endDate, spot.price);

    if (!user) return null;

    return (
        <div className="CreateBookingFormModal-container">
            <div className="CreateBookingFormModal-top">
                <button
                    className="Form-close"
                    onClick={closeModal}
                >
                    <i class="fa-sharp fa-solid fa-xmark"></i>
                </button>
                <h2 className="CreateBookingFormModal-reserve">Reserve a stay!</h2>
            </div>
            <div className="CreateBookingFormModal-header-container">
                <div className="CreateBookingFormModal-header-container-left">
                    <h1 className="CreateBookingFormModal-header">${Number(spot.price).toFixed(2)}</h1>
                    <span className="CreateBookingFormModal-header-night">night</span>
                </div>
                {/* <div className="CreateBookingFormModal-header-container-right">
                    <p className="CreateBookingFormModal-subtitle-text-rating SpotDetails-bold"> {rating}</p>
                    <p className="CreateBookingFormModal-subtitle-text">{numReviews} reviews</p>
                </div> */}
            </div>
            <div className="CreateBookingFormModal-error-container">
                <ul className="CreateBookingFormModal-errors">
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
            </div>
            <form
                onSubmit={handleSubmit}
                className="CreateBookingFormModal-form"
            >
            <div className="CreateBookingFormModal-main-container">
                <div className="CreateBookingFormModal-group">
                    <div className="startDate">
                        <input
                        className="CreateBookingFormModal-lat"
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
                        className="CreateBookingFormModal-lat"
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

            <div className="CreateBookingFormModal-button-container">
                <button type="submit" className="CreateBookingFormModal-submit">Reserve</button>
            </div>

            </form>

            <div className="CreateBookingFormModal-bottom-container">
                <p className="CreateBookingFormModal-small-text-no-charge">
                    You won't be charged yet.
                </p>
                <div className="CreateBookingFormModal-charges-container">
                    <div className="CreateBookingFormModal-charges-groups">
                        <div className="CreateBookingFormModal-charge-group">
                            <p className="CreateBookingFormModal-charge-header">${Number(spot.price).toFixed(2)} x {getDaysUntilReservation(startDate, endDate)} nights</p>
                            <p className="CreateBookingFormModal-charge-calc">${fees.nightsTotal}</p>
                        </div>
                        <div className="CreateBookingFormModal-charge-group">
                            <p className="CreateBookingFormModal-charge-header">Cleaning fee</p>
                            <p className="CreateBookingFormModal-charge-calc">${fees.cleaningTotal}</p>
                        </div>
                        <div className="CreateBookingFormModal-charge-group">
                            <p className="CreateBookingFormModal-charge-header">Service fee</p>
                            <p className="CreateBookingFormModal-charge-calc">${fees.serviceTotal}</p>
                        </div>
                    </div>
                    <div className="CreateBookingFormModal-divider"></div>
                    <div className="CreateBookingFormModal-charge-total">
                        <p className="CreateBookingFormModal-total-header">Total before taxes</p>
                        <p className="CreateBookingFormModal-total-calc">${fees.total}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
