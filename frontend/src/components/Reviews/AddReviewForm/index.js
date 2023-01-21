import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { useModal } from "../../../context/Modal";
import { addReview, addReviewImage, loadSpotReviews } from "../../../store/reviewReducer";
import { loadSpotDetails } from "../../../store/spotReducer";

import "./AddReviewForm.css";

export default function AddReviewForm({ spotId, host }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const [ review, setReview ] = useState("");
    const [ stars, setStars ] = useState("");
    const [ reviewImageUrl, setReviewImageUrl ] = useState("");

    const [ on, setOn ] = useState(false);

    const [ errors, setErrors ] = useState([]);

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
        setErrors([]);

        const newReview = {
            review,
            stars
        };

        const newReviewImage = {
            reviewImageUrl
        }

        // let sendNewReview;÷

        // console.log("newReview:", newReview);

        const sendNewReview = await dispatch(addReview(spotId, newReview))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })


        if (sendNewReview) {
            if (newReviewImage.length) {
                const newReviewImage = await dispatch(addReviewImage(sendNewReview.id, reviewImageUrl))
            }

            closeModal();
            dispatch(loadSpotDetails(+spotId));
            dispatch(loadSpotReviews(+spotId));
            history.push(`/spots/${spotId}`);
        }

        setReview("");
        setStars("");


    }

    return (
        <div className="AddReviewForm-container">
            <div className="AddReviewForm-top">
                <button
                    className="Form-close"
                    onClick={closeModal}
                >
                    <i class="fa-sharp fa-solid fa-xmark"></i>
                </button>
                <h2 className="AddReviewForm-create">Leave a public review!</h2>
            </div>
            <div className="AddReviewForm-error-container">
                <ul className="Form-errors">
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
            </div>
            <form
                onSubmit={handleSubmit}
                className="AddReviewForm-form"
            >
            <p className="AddReviewForm-subheader">{`Write a fair and honest review about your stay at ${host}'s home so future guests know what to expect.`}</p>
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
                <div className="AddReviewForm-stars-container">
                    {[1, 2, 3, 4, 5].map((star, idx) => {
                        idx++;
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
            {/* <div className="Form-group">
                <p className="Form-subheader">Add a review image:</p>
                <input
                className="Form-image"
                    id="image"
                    type="text"
                    value={reviewImageUrl}
                    onChange={(e) => setReviewImageUrl(e.target.value)}
                />
            </div> */}

            <div className="AddReviewForm-button-container">
                <button type="submit" className="AddReviewForm-submit">Create Review</button>
            </div>

            </form>
        </div>
    )
}
