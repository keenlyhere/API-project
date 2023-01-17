import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { deleteReview, loadSpotReviews } from "../../../store/reviewReducer";
import { loadSpotDetails } from "../../../store/spotReducer";

export default function AllReviews({ spotId, spot, user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const reviews = useSelector(state => state.reviews);

    useEffect(() => {
        dispatch(loadSpotReviews(+spotId));
        dispatch(loadSpotDetails(+spotId));
    }, [spotId, dispatch]);

    const handleDelete = (reviewId) => {
        dispatch(deleteReview(reviewId));
        dispatch(loadSpotDetails(+spotId));
        history.push(`/spots/${spotId}`);
    }

    const getMonthYear = (date) => {
        const newDate = new Date(date);
        // console.log("newDate:", newDate);
        const month = newDate.toLocaleString('default', { month: 'long' });
        const year = newDate.getFullYear();

        return (
            <p className="Reviews-date">{month} {year}</p>
        )
    }

    console.log("SPOT!!!", spot);

    if (spot === undefined) return null;

    if (user === undefined) return null;

    if (reviews === undefined) return null;

    let actualReviews;

    if (reviews.spot) {
        actualReviews = Object.values(reviews.spot);
        console.log("actual reviews:", actualReviews)
    }

    return (
        <div>
        {spot.numReviews === 0 ? (
                <div className="SpotDetails-reviews-container">No reviews to display.</div>
            ) : (
                <div className="SpotDetails-reviews-container">
                    { actualReviews && actualReviews.map((review) => (
                        <div key={review.id} className="SpotDetails-review-card">
                            <p className="Reviews-name">{review.User.firstName}</p>
                            {console.log("REVIEW", review)}
                            {getMonthYear(review.createdAt)}
                            <p className="Reviews-review-text">{review.review}</p>
                            {user.id === review.User.id ? (
                                <div className="Reviews-actions">
                                    <button className="Reviews-buttons">Edit</button>
                                    <button
                                        onClick={() => handleDelete(review.id)}
                                        className="Reviews-buttons"
                                    >Delete</button>
                                </div>
                            ) : ""}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
