import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { loadSpotReviews } from "../../../store/reviewReducer";
import { deleteSpot, loadSpotDetails } from "../../../store/spotReducer";
import CreateBookingForm from "../../Bookings/CreateBooking";
import Footer from "../../Footer";
import LoginFormModal from "../../LoginFormModal";
import OpenModalButton from "../../OpenModalButton";
import AddReviewForm from "../../Reviews/AddReviewForm";
import AllReviews from "../../Reviews/AllReviews";
import SignupFormModal from "../../SignupFormModal";
import ConfirmDelete from "../ConfirmDelete";
import EditSpotForm from "../EditSpot";

import "./SpotDetails.css";

export default function SpotDetails() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();

    const spot = useSelector(state => state.spots.spot[spotId]);
    const user = useSelector(state => state.session.user);
    const [ showMenu, setShowMenu ] = useState(false);
    const ulRef = useRef();
    const reviews = useSelector(state => state.reviews);
    // console.log("SpotDetails - spotById:", spot);
    // console.log("SpotDetails - reviews:", reviews)

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

    // const handleEdits = () => {
    //     history.push(`/spots/${spotId}/edit`);
    // }

    // const handleDelete = () => {
    //     dispatch(deleteSpot(+spotId))
    //     history.push("/my-spots");
    // }

    const starRating = (rating) => {
        if (typeof rating === "number") {
            return (
                <div className="SpotDetails-subtitle-rating">
                    <div className="SpotDetails-subtitle-rating-star"><i className="fa-solid fa-star"></i></div>
                    <p className="SpotDetails-subtitle-text SpotDetails-subtitle-rating-rating"> {Number(rating).toFixed(2)}</p>
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

    if (reviews === undefined) return null;

    let actualReviews;

    if (reviews.spot) {
        actualReviews = Object.values(reviews.spot);
        // console.log("actual reviews:", actualReviews)
    }

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
        } else if (spot.SpotImages.length > 1 && spot.SpotImages.length < 4) {
            spot.SpotImages.forEach(image => altImages.unshift(image.url));
        }
    }

    const checkUser = (user) => {
        if (user) {
            if (spot.ownerId === user.id) {
                return (
                    ""
                )
            }
            // else if (actualReviews && actualReviews.length > 0) {
            //     for (let i = 0; i < actualReviews.length; i++) {
            //         const reviewer = actualReviews[i].userId;

            //         if (user.id === reviewer) {
            //             return (
            //                 ""
            //             );
            //         }
            //     }

            //     return (
            //         <div className="SpotDetails-main-content-right">
            //             {/* <AddReviewForm host={spot.Owner.firstName} /> */}
            //             <CreateBookingForm rating={starRating(spot.avgStarRating)} numReviews={spot.numReviews}/>
            //         </div>
            //     )

            // }
            else {
                return (
                    <div className="SpotDetails-main-content-right">
                        {/* <AddReviewForm host={spot.Owner.firstName} /> */}
                        <CreateBookingForm rating={starRating(spot.avgStarRating)} numReviews={spot.numReviews}/>
                    </div>
                )
            }
        } else if (user === null) {
            return (
                <div className="SpotDetails-main-content-right">
                    <div className="SpotDetails-login-signup">
                        <h2 className="SpotDetails-login-signup-header">
                            Oops, you're not logged in!
                        </h2>

                        <div className="SpotDetails-login-signup-buttons">
                                <OpenModalButton
                                    buttonText="Log In Now"
                                    onButtonClick={closeMenu}
                                    modalComponent={<LoginFormModal spotId={spotId} />}
                                    className="LoginButton"
                                />
                                <OpenModalButton
                                    buttonText="Sign Up Today"
                                    onButtonClick={closeMenu}
                                    modalComponent={<SignupFormModal />}
                                />
                        </div>
                    </div>
                </div>
            )
        }
    }

    // console.log("SpotDetails - altImages:", altImages)

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
                        {/* eventually add spot images here
                            <i class="fa-regular fa-image"></i>
                         */}
                        <div className="SpotDetails-subtitle-group">
                            <NavLink
                                to={`/spot/${spotId}/bookings`}
                                className="SpotDetails-view-all-bookings"
                            >
                                <i className="fa-solid fa-book"></i>
                                View All Spot Bookings
                            </NavLink>
                        </div>
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
                                modalComponent={<ConfirmDelete spotId={spotId} user={user} />
                            }
                            />
                        </div>
                    </div>
                ) : (
                    <div className="SpotDetails-subtitle-right">
                        {/* <p className="SpotDetails-subtitle-text">Share</p>
                        <p className="SpotDetails-subtitle-text">Save</p> */}
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
                            <img className="SpotDetails-image" src={altImages[0]} alt={`Spot #${spotId}'s image`} />
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
                    { checkUser(user) }
                    {/* { user && spot.ownerId !== user.id ? (
                        <div className="SpotDetails-main-content-right">
                                <AddReviewForm host={spot.Owner.firstName} />
                        </div>
                    ) : "" } */}
            </div>

            <div className="SpotDetails-reviews-header">
                <h2 className="SpotDetails-reviews-num">{spot.numReviews} reviews</h2>
                <div className="SpotDetails-review-button-container">
                    <OpenModalButton
                        buttonText="Write a Review"
                        onButtonClick={closeMenu}
                        modalComponent={<AddReviewForm spotId={+spotId} host={spot.Owner.firstName}/>}
                        className="LoginButton"
                    />
                </div>
            </div>
                <AllReviews spotId={spotId} spot={spot} user={user} />


        </div>
    )
}
