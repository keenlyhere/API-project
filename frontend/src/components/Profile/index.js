export default function Profile() {
    // TO-DO:
    // map out user info
    // map out review info
    return (
        <div className="Profile-container">
            <div className="Profile-section">
                <h1 className="Profile-header">Hi, I'm /Name/</h1>
                <p className="Profile-sub-header">Joined in /year/</p>
                <div className="Profile-photo">/photo/</div>
                <h2 className="Profile-header-secondary"># reviews</h2>
                <h2 className="Profile-header-secondary">Indentity verified</h2>
            </div>
            <div className="Profile-section">
                <h1 className="Profile-header-secondary">About</h1>
                <p className="Profile-content">Lives in city, state</p>
            </div>
            <div className="Profile-section">
                <h1 className="Profile-header-secondary">/Name/ confirmed</h1>
                <p className="Profile-content">Identity | Email address | Phone number</p>
                <p className="Profile-small-text">Learn more about how confirming account info helps keep the MooBnB community secure.</p>
            </div>
            <div className="Profile-section">
                <h1 className="Profile-header-secondary"># reviews</h1>
                <p className="Profile-small-text">Month Year</p>
                <p className="Review-content">Review details</p>
                <p className="Review-reviewer">Name, City, Country</p>
                <p className="Review-small-text">Joined in YEAR</p>
            </div>
            <div className="Profile-section">
                <p className="Profile-small-text">Reviews by you</p>
            </div>
        </div>
    )
}
