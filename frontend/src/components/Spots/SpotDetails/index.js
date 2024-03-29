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
import moocover from "../../../assets/moocover.png";

import "./SpotDetails.css";
import CreateBookingModal from "../../Bookings/CreateBooking/CreateBookingModal";
import AddSpotImage from "../AddSpotImage";
import SpotDetailsSkeleton from "./SpotDetailsSkeleton";

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
        } else if (spot.SpotImages.length > 1) {
            // console.log("spot.SpotImages", spot.SpotImages);

            let reversedArray = [];
            if (spot.SpotImages !== "No images for spot") {
                for (let i = spot.SpotImages.length - 1; i >= 0; i--) {
                    reversedArray.push(spot.SpotImages[i]);
                }
            }

            for (let i = 0; i < reversedArray.length; i++) {
                let image = reversedArray[i];
                altImages[i] = image.url;
            }

            // console.log("ALT IMAGES", altImages)
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
                        <CreateBookingForm rating={starRating(spot.avgStarRating)} numReviews={spot.numReviews} />
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

    const checkReviewer = (user) => {
        if (user) {
            if (spot.ownerId === user.id) {
                return (
                    ""
                )
            } else if (actualReviews && actualReviews.length > 0) {
                for (let i = 0; i < actualReviews.length; i++) {
                const reviewer = actualReviews[i].userId;

                    if (user.id === reviewer) {
                        return (
                            ""
                        );
                    }
                }

                return (
                    <OpenModalButton
                        buttonText="Write a Review"
                        onButtonClick={closeMenu}
                        modalComponent={<AddReviewForm spotId={+spotId} host={spot.Owner.firstName}/>}
                        className="LoginButton"
                    />
                )
            } else {
                return (
                    <OpenModalButton
                        buttonText="Write a Review"
                        onButtonClick={closeMenu}
                        modalComponent={<AddReviewForm spotId={+spotId} host={spot.Owner.firstName}/>}
                        className="LoginButton"
                    />
                )
            }

        }
    }

    // console.log("SpotDetails - altImages:", altImages)

    return spot && (
        <div className="SpotDetails-container">
            <div className="SpotDetails-top-container">
            <h1 className="SpotDetails-name">{spot.name}</h1>
            <div className="SpotDetails-subtitle">
                <div className="SpotDetails-subtitle-left">
                    <div className="SpotDetails-subtitle-rating SpotDetails-bold">
                        {starRating(spot.avgStarRating)}
                    </div>
                    <p className="SpotDetails-subtitle-text">·</p>
                    <p className="SpotDetails-subtitle-text SpotDetails-underline SpotDetails-bold">{spot.numReviews} reviews</p>
                    <p className="SpotDetails-subtitle-text">·</p>
                    <p className="SpotDetails-subtitle-text SpotDetails-underline SpotDetails-bold">{spot.city}, {spot.state}, {spot.country}</p>
                </div>
                { user && spot.ownerId === user.id ? (
                    <div className="SpotDetails-subtitle-right">
                        {/* eventually add spot images here
                            <i className="fa-regular fa-image"></i>
                         */}
                        <div className="SpotDetails-subtitle-group">
                            <i className="fa-solid fa-image"></i>
                            <OpenModalButton
                                    buttonText="Add Spot Image"
                                    onButtonClick={closeMenu}
                                    modalComponent={<AddSpotImage spotId={spotId} />}
                            />
                        </div>
                        <div className="SpotDetails-subtitle-group">
                            <NavLink
                                to={`/spot/${spotId}/bookings`}
                                className="SpotDetails-view-all-bookings"
                            >
                                <i className="fa-solid fa-book"></i>
                                View Spot Bookings
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
                                modalComponent={<ConfirmDelete spotId={spotId} user={user} type="spot" />
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
                { spot.SpotImages && spot.SpotImages.length > 0 && spot.SpotImages !== "No images for spot" && spot.SpotImages.map((image, idx) => (
                        <div key={idx} className="SpotDetails-images">
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
                                {altImages.slice(1, 5).map((image, idx) => (
                                    <div key={idx} className="SpotDetails-small-image-container">
                                        <img className="SpotDetails-small-image" src={image} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
            </div>
            <div className="SpotDetails-main-content">
                <div className="SpotDetails-main-content-left">
                    <div className="SpotDetails-header">
                        <h2 className="SpotDetails-host">Hosted by {spot.Owner.firstName}</h2>
                        <p className="SpotDetails-room-details">{randomNum()} guests · {randomNum()} bedrooms · {randomNum()} beds · {randomNum()} baths</p>
                    </div>

                    <div className="SpotDetails-host-details">
                        <div className="SpotDetails-host-details-container">
                            <div className="SpotDetails-icon">
                                <i className="fa-solid fa-door-closed spot-icon"></i>
                            </div>
                            <div className="SpotDetails-host-details-main">
                                <p className="SpotDetails-host-details-header">Self check-in</p>
                                <p className="SpotDetails-host-details-desc">Check yourself in with the lockbox.</p>
                            </div>
                        </div>
                        <div className="SpotDetails-host-details-container">
                            <div className="SpotDetails-icon">
                                <i className="fa-sharp fa-solid fa-medal spot-icon"></i>
                            </div>
                            <div className="SpotDetails-host-details-main">
                                <p className="SpotDetails-host-details-header">{spot.Owner.firstName} is a Superhost</p>
                                <p className="SpotDetails-host-details-desc">Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
                            </div>
                        </div>
                        <div className="SpotDetails-host-details-container">
                            <div className="SpotDetails-icon">
                                <i className="fa-regular fa-message spot-icon"></i>
                            </div>
                            <div className="SpotDetails-host-details-main">
                                <p className="SpotDetails-host-details-header">Great communication</p>
                                <p className="SpotDetails-host-details-desc">100% of recent guests rated {spot.Owner.firstName} 5-star in communication.</p>
                            </div>
                        </div>
                    </div>

                    <div className="SpotDetails-moo-cover">
                        <div className="SpotDetails-moo-cover-image">
                            <img src={moocover} alt="moocover image" />
                        </div>
                        <p>
                            Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.
                        </p>
                    </div>

                    <div className="SpotDetails-description">
                        {spot.description}
                    </div>


                    <div className="SpotDetails-offers-header">
                        <h2 className="SpotDetails-offers">What this place offers</h2>


                        <div className="SpotDetails-offers-details">
                            <div className="SpotDetails-offer-details-container">
                                <div className="SpotDetails-icon">
                                    <i className="fa-solid fa-mountain-sun spot-icon"></i>
                                </div>
                                <div className="SpotDetails-offer-details-main">
                                    <p className="SpotDetails-offer-details-header">Mountain view</p>
                                </div>
                            </div>


                            <div className="SpotDetails-offer-details-container">
                                <div className="SpotDetails-icon">
                                    <i className="fa-solid fa-kitchen-set spot-icon"></i>
                                </div>
                                <div className="SpotDetails-offer-details-main">
                                    <p className="SpotDetails-offer-details-header">Kitchen</p>
                                </div>
                            </div>

                            <div className="SpotDetails-offer-details-container">
                                <div className="SpotDetails-icon">
                                    <i className="fa-solid fa-car spot-icon"></i>
                                </div>
                                <div className="SpotDetails-offer-details-main">
                                    <p className="SpotDetails-offer-details-header">Free parking on premises</p>
                                </div>
                            </div>

                            <div className="SpotDetails-offer-details-container">
                                <div className="SpotDetails-icon">
                                    <i className="fa-solid fa-suitcase spot-icon"></i>
                                </div>
                                <div className="SpotDetails-offer-details-main">
                                    <p className="SpotDetails-offer-details-header">Luggage dropoff allowed</p>
                                </div>
                            </div>

                            <div className="SpotDetails-offer-details-container">
                                <div className="SpotDetails-icon">
                                    <i className="fa-solid fa-paw spot-icon"></i>
                                </div>
                                <div className="SpotDetails-offer-details-main">
                                    <p className="SpotDetails-offer-details-header">Pets allowed</p>
                                </div>
                            </div>

                            <div className="SpotDetails-offer-details-container">
                                <div className="SpotDetails-icon">
                                    <i className="fa-solid fa-wifi spot-icon"></i>
                                </div>
                                <div className="SpotDetails-offer-details-main">
                                    <p className="SpotDetails-offer-details-header">Wifi</p>
                                </div>
                            </div>

                            <div className="SpotDetails-offer-details-container">
                                <div className="SpotDetails-icon">
                                    <i className="fa-solid fa-charging-station spot-icon"></i>
                                </div>
                                <div className="SpotDetails-offer-details-main">
                                    <p className="SpotDetails-offer-details-header">EV charger</p>
                                </div>
                            </div>

                            <div className="SpotDetails-offer-details-container">
                                <div className="SpotDetails-icon">
                                    <i className="fa-solid fa-computer spot-icon"></i>
                                </div>
                                <div className="SpotDetails-offer-details-main">
                                    <p className="SpotDetails-offer-details-header">Public computer</p>
                                </div>
                            </div>

                            <div className="SpotDetails-offer-details-container">
                                <div className="SpotDetails-icon">
                                    <i className="fa-regular fa-snowflake spot-icon"></i>
                                </div>
                                <div className="SpotDetails-offer-details-main">
                                    <p className="SpotDetails-offer-details-header">Air conditioning</p>
                                </div>
                            </div>

                            <div className="SpotDetails-offer-details-container">
                                <div className="SpotDetails-icon">
                                    <i className="fa-solid fa-mattress-pillow spot-icon"></i>
                                </div>
                                <div className="SpotDetails-offer-details-main">
                                    <p className="SpotDetails-offer-details-header">Extra pillows and blankets</p>
                                </div>
                            </div>
                        </div>

                        <div className="SpotDetails-divider"></div>

                    </div>
                </div>
                    { checkUser(user) }
                    <div className="SpotDetails-reserve-bar">
                        <div className="SpotDetails-reserve-bar-left">
                            <h1 className="SpotDetails-reserve-bar-header">${Number(spot.price).toFixed(2)}</h1>
                            <span className="SpotDetails-reserve-bar-header-night">night</span>
                        </div>
                        <div className="SpotDetails-reserve-bar-right">
                            <OpenModalButton
                                buttonText="Reserve"
                                onButtonClick={closeMenu}
                                modalComponent={<CreateBookingModal spotId={spotId} rating={starRating(spot.avgStarRating)} numReviews={spot.numReviews} />}
                            />
                        </div>
                    </div>
            </div>

            <div className="SpotDetails-reviews-header">
                <h2 className="SpotDetails-reviews-num">{spot.numReviews} reviews</h2>
                <div className="SpotDetails-review-button-container">
                    {/* {spot && user && spot.ownerId !== user.id  && (
                        <OpenModalButton
                            buttonText="Write a Review"
                            onButtonClick={closeMenu}
                            modalComponent={<AddReviewForm spotId={+spotId} host={spot.Owner.firstName}/>}
                            className="LoginButton"
                        />
                    )} */}
                    { checkReviewer(user) }
                </div>
            </div>
                <AllReviews spotId={spotId} spot={spot} user={user} />


        </div>
    )
}
