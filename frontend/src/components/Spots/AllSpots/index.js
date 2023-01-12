import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSpots } from "../../../store/spotReducer";

import "./AllSpots.css";

export default function AllSpots() {
    const dispatch = useDispatch();

    const allSpots = useSelector(state => state.spots.spots);
    const spots = [];
    Object.values(allSpots).forEach(spot => spots.push(spot));
    console.log("AllSpots - spots:", spots);

    useEffect(() => {
        dispatch(loadSpots());
    }, [dispatch]);

    const starRating = (rating) => {
        if (typeof rating === "number") {
            return rating;
        } else {
            return 0;
        }
    }

    return (
        <div className="AllSpots-container">
            { spots && (
                spots.map((spot) => (
                    <div key={spot.id} className="AllSpots-spot-card">
                        <div className="AllSpots-spot-image">
                            <img
                                src={spot.previewImage}
                            />
                        </div>
                        <div className="AllSpots-spot-card-description">
                            <div className="AllSpots-spot-header">
                                <p className="AllSpots-spot-location">{spot.city}, {spot.state}</p>
                                <p className="AllSpots-spot-rating">{starRating(spot.avgRating)}</p>
                            </div>
                            <p className="AllSpots-spot-price">${spot.price} <span className="Allspots-spot-night">night</span></p>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}
