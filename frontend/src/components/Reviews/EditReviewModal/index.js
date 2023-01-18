import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { editReview, loadSpotReviews } from "../../../store/reviewReducer";
import { loadSpotDetails } from "../../../store/spotReducer";

import "./EditReviewForm.css";

export default function EditReviewModal({ host, reviewId, spotId }) {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews);

    const [ review, setReview ] = useState(reviews.spot[reviewId].review);
    const [ stars, setStars ] = useState(reviews.spot[reviewId].stars);

    const [ on, setOn ] = useState(false);

    const [ errors, setErrors ] = useState([]);
    const { closeModal } = useModal();

    const starClickHandler = (idx) => {
        if (idx <= stars) {
            setOn(true);
        } else {
            setOn(false);
        }

        setStars(idx)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const editedReview = {
            review,
            stars
        };

        let sendEditedReview;

        console.log("newReview:", editedReview);

        try {
            console.log("SPOT ID!!!!", spotId)
            sendEditedReview = await dispatch(editReview(+reviewId, editedReview));
            dispatch(loadSpotDetails(+spotId))
            dispatch(loadSpotReviews(+spotId))
            .then(closeModal);
        } catch(err) {
            const data = await err.json();
            console.log("EditReviewForm - err data:", data);
            setErrors([...Object.values(data.errors)]);
        }

        setReview("");
        setStars("");
        setErrors([]);


    }
    return (
        <div className="EditReviewForm-container">
            <form
                onSubmit={handleSubmit}
                className="EditReviewForm-form"
            >
            <div className="EditReviewForm-top">
                <button
                    className="EditReviewForm-close"
                    onClick={closeModal}
                >
                    <i className="fa-sharp fa-solid fa-xmark"></i>
                </button>
                <h2 className="EditReviewForm-create">Leave a public review</h2>
            </div>

            <div className="EditReviewForm-main-container">
            <p className="EditReviewForm-subheader-review">{`Write a fair and honest review about your stay at ${host}'s home so future guests know what to expect.`}</p>
            <ul className="Form-errors">
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <div className="EditReviewForm-group">
                <textarea
                className="EditReviewForm-review"
                    id="review"
                    type="text"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                    placeholder="Say a few words about your stay!"
                />
            </div>
            <div className="EditReviewForm-group">
                <p className="EditReviewForm-subheader-star">Enter a star rating:</p>
                <div className="EditReviewForm-stars-container">
                    {[1, 2, 3, 4, 5].map((star, idx) => {
                        idx++;
                        {console.log("idx", idx)}
                        return (
                            <div
                                className={idx <= stars ? "on" : "off"}
                                onClick={() => starClickHandler(idx)}
                                >
                                    ★
                            </div>
                        )
                    })}
                </div>
            </div>
            </div>

                <div className="EditReviewForm-button-container">
                    <button type="submit" className="EditReviewForm-submit">Edit Review</button>
                </div>
            </form>
        </div>
    )
}
