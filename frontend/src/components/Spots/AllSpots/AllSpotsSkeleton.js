import "./AllSpots-skeleton.css";

export default function AllSpotsSkeleton () {
    return (
        <div className="Spots-card">
            <div className="Spots-card-image">
                <div className="Spots-image skeleton-all-spots-image skeleton"></div>
                <div className="Spots-card-description">
                    <div className="Spots-header">
                        <div className="Spots-location skeleton-text skeleton"></div>
                        <div className="Spots-rating skeleton-text skeleton"></div>
                    </div>
                    <div className="Spots-footer skeleton-text-body skeleton">
                        <div className="Spots-price skeleton-text-body skeleton"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
