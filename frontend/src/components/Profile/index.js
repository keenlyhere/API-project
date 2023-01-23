import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { loadUserReviews } from "../../store/reviewReducer";

import "./Profile.css";

export default function Profile() {
    // TO-DO:
    // map out user info
    // map out review info
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const reviewsObj = useSelector(state => state.reviews.user);
    const reviewsArr = Object.values(reviewsObj);
    // console.log("Profile - user:", user);
    // console.log("Profile - reviews:", reviewsObj, Object.values(reviewsObj).length);

    useEffect(() => {
        dispatch(loadUserReviews(user.id));
    }, [dispatch]);

    if (!user) return null;

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

    return user && reviewsArr && (
        <div className="Profile-container">
            <div className="Profile-left">
                <div className="Profile-section-photo">
                    <div className="Profile-photo">
                        <img src="https://images.pexels.com/photos/2647053/pexels-photo-2647053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Profile photo" />
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
