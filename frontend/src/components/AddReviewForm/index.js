import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { addReview } from "../../store/reviewReducer";

import "./AddReviewForm.css";

// TO-DO:
// fix res.json error on submit

export default function AddReviewForm({ host }) {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    console.log("AddReviewForm - spotId:", spotId);

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

        console.log("newReview:", newReview);

        setErrors([]);

        const sendNewReview = await dispatch(addReview(spotId, newReview))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })

        console.log("AddReviewForm - sendNewReview:", sendNewReview);

        history.push(`/spots/${spotId}`);
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
                />
                <label htmlFor="review">Say a few words about your stay!</label>
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
