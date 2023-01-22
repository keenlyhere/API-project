import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { addReview, deleteReview, loadSpotReviews } from "../../../store/reviewReducer";
import { loadSpotDetails } from "../../../store/spotReducer";
import OpenModalButton from "../../OpenModalButton";
import EditReviewModal from "../EditReviewModal";

import "./AllReviews.css";

export default function AllReviews({ spotId, spot, user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const reviews = useSelector(state => state.reviews);
    const [ showMenu, setShowMenu ] = useState(false);
    const ulRef = useRef();

    useEffect(() => {
        dispatch(loadSpotReviews(+spotId));
        dispatch(loadSpotDetails(+spotId));
    }, [spotId, dispatch]);

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        }

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu])

    const closeMenu = () => setShowMenu(false);

    const handleDelete = async (reviewId) => {
        const deletedReview = await dispatch(deleteReview(reviewId));
        dispatch(loadSpotDetails(+spotId));
        history.push(`/spots/${spotId}`);
    }

    const getMonthYear = (date) => {
        const newDate = new Date(date);
        // console.log("newDate:", newDate);
        const month = newDate.toLocaleString("default", { month: "long" });
        const year = newDate.getFullYear();

        return (
            <p className="Reviews-date">{month} {year}</p>
        )
    }

    if (spot === undefined) return null;

    if (user === undefined) return null;

    if (reviews === undefined) return null;

    let actualReviews;

    if (reviews.spot) {
        actualReviews = Object.values(reviews.spot);
    }

    if (!reviews.spot) {
        return (
            <div className="AllReviews-container">
                <div className="SpotDetails-reviews-container">No reviews to display.</div>
            </div>
        )
    }

    return actualReviews && (
        <div className="AllReviews-container">
        {spot.numReviews == 0 ? (
                <div className="SpotDetails-reviews-container">No reviews to display.</div>
            ) : (
                <div className="SpotDetails-reviews-container">
                    { actualReviews && actualReviews.map((review) => (
                        <div key={review.id} className="SpotDetails-review-card">
                            <div className="Reviews-profile-image">
                                <i className="fa-solid fa-circle-user user"></i>
                            </div>
                            <div className="Reviews-card-right">
                                <p className="Reviews-name">{review.User.firstName}</p>
                                {getMonthYear(review.createdAt)}
                                <p className="Reviews-review-text">{review.review}</p>
                                {user && user.id === review.User.id ? (
                                    <div className="Reviews-actions">
                                        <div
                                            className="Review-action-edit clickable"
                                        >
                                            {/* <i className="fa-regular fa-pen-to-square"></i> */}
                                            <OpenModalButton
                                                buttonText="Edit"
                                                onButtonClick={closeMenu}
                                                modalComponent={<EditReviewModal host={spot.Owner.firstName} reviewId={review.id} spotId={spotId} />}
                                                icon={"edit"}
                                            />
                                        </div>
                                        <div
                                            className="Review-action-delete clickable"
                                            onClick={() => handleDelete(review.id)}
                                        >
                                            <i className="fa-solid fa-trash clickable Reviews-buttons"></i>
                                            <p
                                                className="Reviews-buttons"
                                            >
                                                Delete
                                            </p>
                                        </div>
                                    </div>
                                ) : ""}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
