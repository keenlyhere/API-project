import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { loadSpotReviews } from "../../../store/reviewReducer";
import { deleteSpot, loadSpotDetails } from "../../../store/spotReducer";
import AddReviewForm from "../../Reviews/AddReviewForm";
import AllReviews from "../../Reviews/AllReviews";

import "./SpotDetails.css";

function SpotDetails() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();

    const spot = useSelector(state => state.spots.spot[spotId]);
    console.log("SpotDetails - spotById:", spot);
    const user = useSelector(state => state.session.user);
    // console.log("SpotDetails - user:", user);
    // const reviews = useSelector(state => state.reviews);


    // console.log("SpotDetails - reviews:", reviews);

    useEffect(() => {
        // dispatch(loadSpotReviews(+spotId));
        dispatch(loadSpotDetails(+spotId));
    }, [spotId, dispatch]);

    const randomNum = () => {
        return Math.ceil(Math.random() * 10);
    }

    const handleEdits = () => {
        history.push(`/spots/${spotId}/edit`);
    }

    const handleDelete = () => {
        dispatch(deleteSpot(+spotId))
        history.push("/my-spots");
    }

    const starRating = (rating) => {
        if (typeof rating === "number") {
            return (
                <div>
                    {rating.toFixed(2)}
                </div>
                );
        } else {
            return "";
        }
    }

    if (spot === undefined) return null;

    if (user === undefined) return null;

    return spot && (
        <div className="SpotDetails-container">
            <h1 className="SpotDetails-name">{spot.name}</h1>
            <div className="SpotDetails-subtitle">
                <div className="SpotDetails-subtitle-left">
                    <div className="SpotDetails-subtitle-rating">
                        <div className="SpotDetails-subtitle-rating-star"><i className="fa-solid fa-star"></i></div>
                        <p className="SpotDetails-subtitle-text SpotDetails-subtitle-rating-rating"> {starRating(spot.avgStarRating)}</p>
                    </div>
                    <p className="SpotDetails-subtitle-text">·</p>
                    <p className="SpotDetails-subtitle-text">{spot.numReviews} reviews</p>
                    <p className="SpotDetails-subtitle-text">·</p>
                    <p className="SpotDetails-subtitle-text">{spot.city},{spot.state},{spot.country}</p>
                </div>
                { user && spot.ownerId === user.id ? (
                    <div className="SpotDetails-subtitle-right">
                        <button onClick={handleEdits}>Edit Spot</button>
                        <button onClick={handleDelete}>Delete Spot</button>
                    </div>
                ) : (
                    <div className="SpotDetails-subtitle-right">
                        <p className="SpotDetails-subtitle-text">Share</p>
                        <p className="SpotDetails-subtitle-text">Save</p>
                    </div>
                ) }
            </div>
            <div className="SpotDetails-images">
                { spot.SpotImages && spot.SpotImages.length > 0 && spot.SpotImages !== "No images for spot" && spot.SpotImages.map(image => (
                        <div className="SpotDetails-images">
                            <img className="SpotDetails-image" src={image.url} />
                        </div>
                    ))}
            </div>
            <div className="SpotDetails-main-content">
                <div className="SpotDetails-main-content-left">
                    <div className="SpotDetails-header">
                        <h2 className="SpotDetails-host">Hosted by {spot.Owner.firstName}</h2>
                        <p className="SpotDetails-room-details">{randomNum()} guests · {randomNum()} bedrooms · {randomNum()} beds · {randomNum()} baths</p>
                    </div>

                    <div className="SpotDetails-host-details">
                        <p className="SpotDetails-host-details-header">Experienced host</p>
                        <p className="SpotDetails-host-details-desc">{spot.Owner.firstName} has {spot.numReviews} reviews for other places.</p>
                        <p className="SpotDetails-host-details-header">Highly rated Host</p>
                        <p className="SpotDetails-host-details-desc">{spot.Owner.firstName} has received 5-star ratings from 95% of recent guests.</p>
                        <p className="SpotDetails-host-details-header">Great communication</p>
                        <p className="SpotDetails-host-details-desc">100% of recent guests rated {spot.Owner.firstName} 5-star in communication.</p>
                    </div>

                    <div className="SpotDetails-description">
                        {spot.description}
                    </div>
                </div>
                <div className="SpotDetails-main-content-right">
                    <AddReviewForm host={spot.Owner.firstName} />
                </div>
            </div>

            <h2 className="SpotDetails-reviews-num">{spot.numReviews} reviews</h2>
                <AllReviews spotId={spotId} spot={spot} user={user} />
            {/* {spot.numReviews === 0 ? (
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
                                    <button className="Reviews-buttons">Delete</button>
                                </div>
                            ) : ""}
                        </div>
                    ))}
                </div>
            )} */}


        </div>
    )
}

export default SpotDetails;
