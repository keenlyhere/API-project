import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { addReview, loadSpotReviews } from "../../../store/reviewReducer";
import { loadSpotDetails } from "../../../store/spotReducer";

import "./AddReviewForm.css";

export default function AddReviewForm({ host }) {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const [ review, setReview ] = useState("");
    const [ stars, setStars ] = useState("");

    const [ errors, setErrors ] = useState([]);

    useEffect(() => {
        const errors = [];

        if (review && !review.length) {
            errors.push("Please enter a review.");
        }

        if (stars && (stars < 1 || stars > 5)) {
            errors.push("Star rating should be between 1 and 5.")
        }

        setErrors(errors);
    }, [review, stars])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReview = {
            review,
            stars
        };

        let sendNewReview;

        console.log("newReview:", newReview);

        try {
            sendNewReview = await dispatch(addReview(spotId, newReview))
            // console.log("AddReviewForm - sendNewReview:", sendNewReview);
            dispatch(loadSpotDetails(+spotId));
            dispatch(loadSpotReviews(+spotId));
            history.push(`/spots/${spotId}`);
        } catch(err) {
            const data = await err.json();
            console.log("AddReviewForm - err data:", data);
            setErrors([...Object.values(data.errors)]);
        }

        setReview("");
        setStars("");
        setErrors([]);


    }
    return (
        <div className="AddReviewForm-container">
            <h1 className="AddReviewForm-header">Leave a public review</h1>
            <p className="AddReviewForm-subheader">{`Write a fair and honest review about your stay at ${host}'s home so future guests know what to expect.`}</p>
            <form
                onSubmit={handleSubmit}
                className="AddReviewForm-form"
            >
            <ul className="Form-errors">
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <div className="AddReviewForm-group">
                <textarea
                className="AddReviewForm-review"
                    id="review"
                    type="text"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                    placeholder="Say a few words about your stay!"
                />
            </div>
            <div className="AddReviewForm-group">
                <p className="AddReviewForm-subheader">Enter a star rating:</p>
                <input
                className="AddReviewForm-stars"
                    id="stars"
                    type="number"
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    required
                />
            </div>

            <button type="submit" className="AddReviewForm-submit">Create Review</button>

            </form>
        </div>
    )
}
