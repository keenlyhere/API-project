import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { loadSpotReviews } from "../../../store/reviewReducer";
import { deleteSpot, loadSpotDetails } from "../../../store/spotReducer";
import Footer from "../../Footer";
import OpenModalButton from "../../OpenModalButton";
import AddReviewForm from "../../Reviews/AddReviewForm";
import AllReviews from "../../Reviews/AllReviews";
import ConfirmDelete from "../ConfirmDelete";
import EditSpotForm from "../EditSpot";

import "./SpotDetails.css";

function SpotDetails() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();

    const spot = useSelector(state => state.spots.spot[spotId]);
    console.log("SpotDetails - spotById:", spot);
    const user = useSelector(state => state.session.user);
    const [ showMenu, setShowMenu ] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        }

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);


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
                <div className="SpotDetails-subtitle-rating">
                    <div className="SpotDetails-subtitle-rating-star"><i className="fa-solid fa-star"></i></div>
                    <p className="SpotDetails-subtitle-text SpotDetails-subtitle-rating-rating"> {rating.toFixed(2)}</p>
                </div>
                );
        } else {
            return (
                <p className="SpotDetails-subtitle-text SpotDetails-subtitle-rating-rating">No rating yet</p>
            );
        }
    }

    if (spot === undefined) return null;

    if (user === undefined) return null;

    let altImages = [
        "https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/12776422/pexels-photo-12776422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/4910769/pexels-photo-4910769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/10549901/pexels-photo-10549901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/4909803/pexels-photo-4909803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        ];

    if (spot) {
        if (spot.SpotImages.length === 1 && spot.SpotImages !== "No images for spot") {
            altImages = [spot.SpotImages[0].url];
            // mainImage.push(spot.SpotImages[0].url);
        } else if (spot.SpotImages.length > 1 && spot.SpotImages.length < 4) {
            console.log("hit else if........")
            spot.SpotImages.forEach(image => altImages.unshift(image.url));
        }
    }

    console.log("SpotDetails - altImages:", altImages)

    return spot && (
        <div className="SpotDetails-container">
            <h1 className="SpotDetails-name">{spot.name}</h1>
            <div className="SpotDetails-subtitle">
                <div className="SpotDetails-subtitle-left">
                    <div className="SpotDetails-subtitle-rating">
                        {starRating(spot.avgStarRating)}
                    </div>
                    <p className="SpotDetails-subtitle-text">·</p>
                    <p className="SpotDetails-subtitle-text">{spot.numReviews} reviews</p>
                    <p className="SpotDetails-subtitle-text">·</p>
                    <p className="SpotDetails-subtitle-text">{spot.city},{spot.state},{spot.country}</p>
                </div>
                { user && spot.ownerId === user.id ? (
                    <div className="SpotDetails-subtitle-right">
                        <div className="SpotDetails-subtitle-group">
                            <i className="fa-regular fa-pen-to-square"></i>
                            <OpenModalButton
                                    buttonText="Edit Spot"
                                    onButtonClick={closeMenu}
                                    modalComponent={<EditSpotForm spot={spot} />}
                            />
                        </div>
                        <div className="SpotDetails-subtitle-group delete">
                            <i className="fa-solid fa-trash"></i>
                            <OpenModalButton
                                buttonText="Delete Spot"
                                onButtonClick={closeMenu}
                                modalComponent={<ConfirmDelete host={spot.Owner.firstName} spotId={spotId} user={user} />
                            }
                            />
                        </div>
                    </div>
                ) : (
                    <div className="SpotDetails-subtitle-right">
                        <p className="SpotDetails-subtitle-text">Share</p>
                        <p className="SpotDetails-subtitle-text">Save</p>
                    </div>
                ) }
            </div>
            {/* <div className="SpotDetails-images">
                { spot.SpotImages && spot.SpotImages.length > 0 && spot.SpotImages !== "No images for spot" && spot.SpotImages.map(image => (
                        <div className="SpotDetails-images">
                            <img className="SpotDetails-image" src={image.url} />
                        </div>
                    ))}
            </div> */}
                { altImages.length === 1 ? (
                        <div className="SpotDetails-one-image">
                            <img className="SpotDetails-image" src={altImages[0]} />
                        </div>
                    ) : (
                        <div className="SpotDetails-images">
                            <div className="SpotDetails-main">
                                <img className="SpotDetails-main-image" src={altImages[0]} />
                            </div>
                            <div className="SpotDetails-small-images">
                                {altImages.slice(1, 5).map(image => (
                                    <div className="SpotDetails-small-image-container">
                                        <img className="SpotDetails-small-image" src={image} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
            <div className="SpotDetails-main-content">
                <div className="SpotDetails-main-content-left">
                    <div className="SpotDetails-header">
                        <h2 className="SpotDetails-host">Hosted by {spot.Owner.firstName}</h2>
                        <p className="SpotDetails-room-details">{randomNum()} guests · {randomNum()} bedrooms · {randomNum()} beds · {randomNum()} baths</p>
                    </div>

                    <div className="SpotDetails-host-details">
                        <div className="SpotDetails-host-details-container">
                            <div className="SpotDetails-icon">
                                <i class="fa-solid fa-door-closed"></i>
                            </div>
                            <div className="SpotDetails-host-details-main">
                                <p className="SpotDetails-host-details-header">Self check-in</p>
                                <p className="SpotDetails-host-details-desc">Check yourself in with the lockbox.</p>
                            </div>
                        </div>
                        <div className="SpotDetails-host-details-container">
                            <div className="SpotDetails-icon">
                                <i class="fa-sharp fa-solid fa-medal"></i>
                            </div>
                            <div className="SpotDetails-host-details-main">
                                <p className="SpotDetails-host-details-header">{spot.Owner.firstName} is a Superhost</p>
                                <p className="SpotDetails-host-details-desc">Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
                            </div>
                        </div>
                        <div className="SpotDetails-host-details-container">
                            <div className="SpotDetails-icon">
                                <i class="fa-regular fa-message"></i>
                            </div>
                            <div className="SpotDetails-host-details-main">
                                <p className="SpotDetails-host-details-header">Great communication</p>
                                <p className="SpotDetails-host-details-desc">100% of recent guests rated {spot.Owner.firstName} 5-star in communication.</p>
                            </div>
                        </div>
                    </div>

                    <div className="SpotDetails-description">
                        {spot.description}
                    </div>
                </div>
                    { user && spot.ownerId !== user.id ? (
                        <div className="SpotDetails-main-content-right">
                                <AddReviewForm host={spot.Owner.firstName} />
                        </div>
                    ) : "" }
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
