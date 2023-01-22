export default function UserReviews() {
    // TO-DO
    // map out review info
    return (
        <div className="UserReviews-container">
            <div className="UserReviews-section">
                <h1 className="UserReviews-header">Reviews by you</h1>
                <div className="UserReviews-buttons-container">
                    <button className="UserReviews-buttons">Reviews about you</button>
                    <button className="UserReviews-buttons">Reviews by you</button>
                </div>
            </div>
            <div className="UserReviews-section">
                <h2 className="UserReviews-header-secondary">Past reviews</h2>
                <div className="UserReviews-reviews-container">
                    <p className="UserReviews-name">FIRST LAST</p>
                    <p className="UserReviews-small-text">MONTH YEAR</p>
                    <p className="UserReviews-content">REVIEW</p>
                </div>
            </div>
            <div className="UserReviews-section">
                <h2 className="UserReviews-header-secondary">Past reviews you've written</h2>
                <div className="UserReviews-reviews-container">
                    <p className="UserReviews-name">FIRST LAST</p>
                    <p className="UserReviews-small-text">MONTH YEAR</p>
                    <p className="UserReviews-content">REVIEW</p>
                </div>
            </div>
        </div>
    )
}
