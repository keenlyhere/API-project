import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { loadUserReviews } from "../../store/reviewReducer";

export default function Profile() {
    // TO-DO:
    // map out user info
    // map out review info
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    console.log("Profile - user:", user);
    const reviewsObj = useSelector(state => state.reviews.user);
    const reviewsArr = Object.values(reviewsObj);
    // console.log("Profile - reviews:", reviews, Object.values(reviews).length);

    useEffect(() => {
        dispatch(loadUserReviews(user.id));
    }, [dispatch]);

    if (!user) return null;

    if (!reviewsObj) return null;

    const confirmedText = ["Identity", "Email address"];

    return user && reviewsArr && (
        <div className="Profile-container">
            <div className="Profile-left">
                <div className="Profile-section">
                    <div className="Profile-photo">/photo/</div>
                    <h2 className="Profile-header-secondary">
                        <i class="fa-regular fa-star"></i>
                        {reviewsArr.length} reviews
                    </h2>
                    <h2 className="Profile-header-secondary">Indentity verified</h2>
                </div>
                <div className="Profile-section">
                    <h2 className="Profile-header-secondary">{user.firstName} confirmed</h2>
                    {user && confirmedText && confirmedText.map((text, idx) => (
                        <p
                            key={idx}
                            className="Profile-confirmation"
                        >
                            <i class="fa-solid fa-check"></i>
                            {text}
                        </p>
                    ))}

                    <div className="Profile-disclaimer">
                        Learn more about how confirming account info helps keep the Deja-Moo community secure.
                    </div>
                </div>
            </div>

            <div className="Profile-right">
                <div className="Profile-section">
                    <h1 className="Profile-header">Hi, I'm {user.firstName}!</h1>
                    <p className="Profile-sub-header">Joined in 2022</p>
                </div>
                <div className="Profile-section">
                    <h2 className="Profile-header-secondary">About</h2>
                    <p className="Profile-content">
                        <i class="fa-solid fa-house"></i>
                        Lives in Moo-resville, NC
                    </p>
                </div>

                <div className="Profile-section">
                    <h2 className="Profile-header-secondary">
                        <i className="fa-solid fa-star"></i>
                        {reviewsArr.length} reviews
                    </h2>
                    TO DO: PUT USER REVIEWS HERE
                    <p className="Profile-small-text">Month Year</p>
                    <p className="Review-content">Review details</p>
                    <p className="Review-reviewer">Name, City, Country</p>
                    <p className="Review-small-text">Joined in YEAR</p>
                </div>
                <div className="Profile-section">
                    <p className="Profile-small-text">Reviews by you</p>
                </div>
            </div>
        </div>
    )
}
