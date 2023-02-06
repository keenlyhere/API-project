import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { loadUserReviews } from "../../store/reviewReducer";
import OpenModalButton from "../OpenModalButton";
import ChangeProfileImageModal from "./ChangeProfileImageModal";

import "./Profile.css";

export default function Profile() {
    // TO-DO:
    // map out user info
    // map out review info
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const { userId } = useParams();
    const [ showMenu, setShowMenu ] = useState(false);
    const ulRef = useRef();

    const reviewsObj = useSelector(state => state.reviews.user);
    const reviewsArr = Object.values(reviewsObj);
    console.log("Profile - user:", user);
    console.log("Profile - userId:", +userId);
    console.log("user.id === userId:", user.id === +userId)
    // console.log("Profile - reviews:", reviewsObj, Object.values(reviewsObj).length);

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
    }, [showMenu])

    const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        dispatch(loadUserReviews(user.id));
    }, [dispatch]);

    if (!user) return null;

    console.log("Profile - profile pic:", user.profileImageUrl)

    if (!reviewsObj) return null;

    const confirmedText = ["Identity", "Email address"];

    const getMonthYear = (date) => {
        const newDate = new Date(date);
        const month = newDate.toLocaleString("default", { month: "long" });
        const year = newDate.getFullYear();

        return (
            <p className="Profile-small-text">{month} {year}</p>
        )
    }

    console.log("Profile - userId:", userId)
    if (user.id === +userId && reviewsArr) {
        return (
            <div className="Profile-container">
                <div className="Profile-left">
                    <div className="Profile-section-photo">
                        <div className="Profile-photo">
                            <img src={user.profileImageUrl} alt="Profile photo" />
                        </div>
                        <OpenModalButton
                            buttonText="Change Photo"
                            onButtonClick={closeMenu}
                            modalComponent={<ChangeProfileImageModal userId={+userId} />}
                        />
                        <h2 className="Profile-header-secondary-verified">
                            <i className="fa-regular fa-star profile-icon"></i>
                            {reviewsArr.length} reviews
                        </h2>
                        <h2 className="Profile-header-secondary-verified">
                            <i className="fa-solid fa-user-shield profile-icon"></i>
                            Identity verified
                        </h2>
                    </div>
                    <div className="Profile-section">
                        <h2 className="Profile-header-secondary">{user.firstName} confirmed</h2>
                        {user && confirmedText && confirmedText.map((text, idx) => (
                            <p
                                key={idx}
                                className="Profile-confirmation"
                            >
                                <i className="fa-solid fa-check profile-icon"></i>
                                {text}
                            </p>
                        ))}

                        <div className="Profile-disclaimer">
                            Confirming account info helps keep the Deja-Moo community secure.
                        </div>
                    </div>
                </div>

                <div className="Profile-right">
                    <div className="Profile-section">
                        <h1 className="Profile-header">Hi, I'm {user.firstName}!</h1>
                        <p className="Profile-sub-header">Joined in 2022</p>
                    </div>
                    <div className="Profile-section-about">
                        <h2 className="Profile-header-secondary">About</h2>
                        <p className="Profile-content">
                            <i className="fa-solid fa-house profile-icon"></i>
                            Lives in Moo-resville, NC
                        </p>
                    </div>

                    <div className="Profile-section">
                        <h2 className="Profile-header-secondary-reviews">
                            <i className="fa-solid fa-star profile-icons"></i>
                            {reviewsArr.length} reviews
                        </h2>
                        { reviewsArr && reviewsArr.length ? (reviewsArr.map((review) => (
                            <div
                                key={review.id}
                                className="Profile-review-card"
                            >
                                {/* {console.log(review)} */}
                                <div className="Profile-review-card-date-review">
                                    {getMonthYear(review.createdAt)}
                                    <p className="Review-content">{review.review}</p>
                                </div>
                                <div className="Reviews-profile-image">
                                    {/* <i className="fa-solid fa-circle-user user profile-icon"></i> */}
                                    <p className="Review-reviewer">{review.Spot.name}</p>
                                </div>
                            </div>
                        ))
                        ) : (
                            "You have not written any reviews"
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return user && reviewsArr && (
        <div className="Profile-container">
            <div className="Profile-left">
                <div className="Profile-section-photo">
                    <div className="Profile-photo">
                        <img src={user.profileImageUrl} alt="Profile photo" />
                    </div>
                    <h2 className="Profile-header-secondary-verified">
                        <i className="fa-regular fa-star profile-icon"></i>
                        {reviewsArr.length} reviews
                    </h2>
                    <h2 className="Profile-header-secondary-verified">
                        <i className="fa-solid fa-user-shield profile-icon"></i>
                        Identity verified
                    </h2>
                </div>
                <div className="Profile-section">
                    <h2 className="Profile-header-secondary">{user.firstName} confirmed</h2>
                    {user && confirmedText && confirmedText.map((text, idx) => (
                        <p
                            key={idx}
                            className="Profile-confirmation"
                        >
                            <i className="fa-solid fa-check profile-icon"></i>
                            {text}
                        </p>
                    ))}

                    <div className="Profile-disclaimer">
                        Confirming account info helps keep the Deja-Moo community secure.
                    </div>
                </div>
            </div>

            <div className="Profile-right">
                <div className="Profile-section">
                    <h1 className="Profile-header">Hi, I'm {user.firstName}!</h1>
                    <p className="Profile-sub-header">Joined in 2022</p>
                </div>
                <div className="Profile-section-about">
                    <h2 className="Profile-header-secondary">About</h2>
                    <p className="Profile-content">
                        <i className="fa-solid fa-house profile-icon"></i>
                        Lives in Moo-resville, NC
                    </p>
                </div>

                <div className="Profile-section">
                    <h2 className="Profile-header-secondary-reviews">
                        <i className="fa-solid fa-star profile-icons"></i>
                        {reviewsArr.length} reviews
                    </h2>
                    { reviewsArr && reviewsArr.length ? (reviewsArr.map((review) => (
                        <div
                            key={review.id}
                            className="Profile-review-card"
                        >
                            {/* {console.log(review)} */}
                            <div className="Profile-review-card-date-review">
                                {getMonthYear(review.createdAt)}
                                <p className="Review-content">{review.review}</p>
                            </div>
                            <div className="Reviews-profile-image">
                                {/* <i className="fa-solid fa-circle-user user profile-icon"></i> */}
                                <p className="Review-reviewer">{review.Spot.name}</p>
                            </div>
                        </div>
                    ))
                    ) : (
                        "You have not written any reviews"
                    )}
                </div>
            </div>
        </div>
    )
}
