import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { addReview, addReviewImage, loadSpotReviews } from "../../../store/reviewReducer";
import { loadSpotDetails } from "../../../store/spotReducer";

import "./AddReviewForm.css";

export default function AddReviewForm({ host }) {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const [ review, setReview ] = useState("");
    const [ stars, setStars ] = useState("");
    const [ reviewImageUrl, setReviewImageUrl ] = useState("");

    const [ on, setOn ] = useState(false);

    const [ errors, setErrors ] = useState([]);

    console.log("stars.........", stars)

    useEffect(() => {
        console.log("on")
    }, [on])

    const starClickHandler = (idx) => {
        if (idx <= stars) {
            setOn(true);
        } else {
            setOn(false);
        }

        setStars(idx)
    }

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

        const newReviewImage = {
            reviewImageUrl
        }

        let sendNewReview;

        console.log("newReview:", newReview);

        try {
            sendNewReview = await dispatch(addReview(spotId, newReview))
            // console.log("AddReviewForm - sendNewReview:", sendNewReview);
            dispatch(loadSpotDetails(+spotId));
            dispatch(loadSpotReviews(+spotId));
            if (newReviewImage.length) {
                const newReviewImage = await dispatch(addReviewImage(sendNewReview.id, reviewImageUrl))
            }
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
            {/* <div className="AddReviewForm-group">
                <p className="AddReviewForm-subheader">Enter a star rating:</p>
                <input
                className="AddReviewForm-stars"
                    id="stars"
                    type="number"
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    required
                />
            </div> */}
            <div className="AddReviewForm-group">
                <p className="AddReviewForm-subheader">Enter a star rating:</p>
                <div className="AddReviewForm-stars-container">
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
            <div className="AddReviewForm-group">
                <p className="AddReviewForm-subheader">Add a review image:</p>
                <input
                className="AddReviewForm-image"
                    id="image"
                    type="text"
                    value={reviewImageUrl}
                    onChange={(e) => setReviewImageUrl(e.target.value)}
                />
            </div>

            <button type="submit" className="AddReviewForm-submit">Create Review</button>

            </form>
        </div>
    )
}
