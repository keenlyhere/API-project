import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { loadUserSpots } from "../../../store/spotReducer";
import previewHandler from "../../../utils/previewHandler";

import "../Spots.css";

export default function UserSpots() {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const allSpots = useSelector(state => state.spots.spots);
    const userSpots = Object.values(allSpots).filter(spot => spot.ownerId === sessionUser.id);
    console.log("UserSpts - sessionUser", sessionUser);
    console.log("UserSpots - userSpots", userSpots);

    useEffect(() => {
        dispatch(loadUserSpots());
    }, [dispatch])

    const starRating = (rating) => {
        if (typeof rating === "number") {
            return rating;
        } else {
            return 0;
        }
    }

    const handleClick = (spotId) => {
        history.push(`/spots/${spotId}`)
    }

    return (
        <div className="Spots-container">
            { userSpots && (
                userSpots.map((spot) => (
                    <div key={spot.id} className="Spots-card">
                        <div className="Spots-image">
                            <img
                                src={previewHandler(spot.previewImage)}
                                onClick={() => handleClick(spot.id)}
                            />
                        </div>
                        <div className="Spots-card-description">
                            <div className="Spots-header">
                                <p className="Spots-location">{spot.city}, {spot.state}</p>
                                <p className="Spots-rating">{starRating(spot.avgRating)}</p>
                            </div>
                            <div className="Spots-footer">
                                <span className="Spots-price">${spot.price}</span> night
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}
