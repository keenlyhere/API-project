import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router";
import { addBooking } from "../../../store/bookingReducer";
import { convertDates } from "../../../utils/dateFormatting";
import "./CreateBookingForm.css"

export default function CreateBookingForm({ rating, numReviews }) {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const spot = useSelector(state => state.spots.spot[spotId]);
    console.log("CreateBookingForm - spot:", spot, "*** spotId:", spotId);

    const [ startDate, setStartDate ] = useState("");
    const [ endDate, setEndDate ] = useState("");
    const [ errors, setErrors ] = useState([]);

    console.log("*** startDate:", startDate, "*** endDate:", endDate);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newBooking = {
            startDate,
            endDate
        }

        console.log("handleSubmit - newBooking:", newBooking);

        const sendNewBooking = await dispatch(addBooking(+spotId, newBooking))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })

        if (sendNewBooking) {
            history.push(`/my-trips`)
        }
    }

    return (
        <div className="CreateBookingForm-container">
            <div className="CreateBookingForm-header-container">
                <div className="CreateBookingForm-header-container-left">
                    <h1 className="CreateBookingForm-header">${spot.price.toFixed(2)}</h1>
                    <span className="CreateBookingForm-header-night">night</span>
                </div>
                <div className="CreateBookingForm-header-container-right">
                    <p className="CreateBookingForm-subtitle-text-rating"> {rating}</p>
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
                            <p className="CreateBookingForm-charge-header">${spot.price.toFixed(2)} x ### nights</p>
                            <p className="CreateBookingForm-charge-calc">$ PRICE</p>
                        </div>
                        <div className="CreateBookingForm-charge-group">
                            <p className="CreateBookingForm-charge-header">Cleaning fee</p>
                            <p className="CreateBookingForm-charge-calc">$ PRICE</p>
                        </div>
                        <div className="CreateBookingForm-charge-group">
                            <p className="CreateBookingForm-charge-header">Service fee</p>
                            <p className="CreateBookingForm-charge-calc">$ PRICE</p>
                        </div>
                    </div>
                    <div className="CreateBookingForm-charge-total">
                        <p className="CreateBookingForm-total-header">Total before taxes</p>
                        <p className="CreateBookingForm-total-calc">$ TOTAL</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
