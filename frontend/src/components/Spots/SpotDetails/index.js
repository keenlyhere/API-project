import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { loadSpotDetails, loadSpots } from "../../../store/spotReducer";

import "./SpotDetails.css";

export default function SpotDetails() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();

    const spot = useSelector(state => state.spots.spot[spotId]);
    console.log("SpotDetails - spot", spot)

    const user = useSelector(state => state.session.user);
    console.log("SpotDetails - user", user);

    useEffect(() => {
        dispatch(loadSpotDetails(+spotId));
    }, [dispatch, spotId])

    const randomNum = () => {
        return Math.floor(Math.random() * 10)
    }

    const handleEdits = () => {
        history.push(`/spots/${spotId}/edit`);
    }

    if (spot === undefined) return null;

    return spot && (
        <div className="SpotDetails-container">
                <h1 className="SpotDetails-name">{spot.name}</h1>
                <div className="SpotDetails-subtitle">
                    <div className="SpotDetails-subtitle-left">
                        <p className="SpotDetails-subtitle-text">{spot.numReviews} reviews</p>
                        <p className="SpotDetails-subtitle-text">|</p>
                        <p className="SpotDetails-subtitle-text">{spot.city},{spot.state},{spot.country}</p>
                    </div>
                    { spot.ownerId === user.id ? (
                        <div className="SpotDetails-subtitle-right">
                            <button onClick={handleEdits}>Edit Spot</button>
                        </div>
                    ) : (
                        <div className="SpotDetails-subtitle-right">
                            <p className="SpotDetails-subtitle-text">Share</p>
                            <p className="SpotDetails-subtitle-text">Save</p>
                        </div>
                    ) }
                </div>
                {spot.SpotImages !== "No images for spot" && spot.SpotImages.map(image => (
                    <div className="SpotDetails-images">
                        <img src={image.url} />
                    </div>
                ))}
                <div className="SpotDetails-header">
                    <h2 className="SpotDetails-host">Hosted by {spot.Owner.firstName}</h2>
                    <p>{randomNum()} guests | {randomNum()} bedrooms | {randomNum()} beds | {randomNum()} baths</p>
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

                <div className="SpotDetails-reviews-container">
                    <h2 className="SpotDetails-reviews-num">{spot.numReviews} reviews</h2>
                    PUT SPOT REVIEWS HERE
                </div>
        </div>
    )
}
