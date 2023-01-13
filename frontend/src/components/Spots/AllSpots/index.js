import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSpots } from "../../../store/spotReducer";
import previewHandler from "../../../utils/previewHandler";

import "../Spots.css";

export default function AllSpots() {
    const dispatch = useDispatch();

    const allSpots = useSelector(state => state.spots.spots);
    console.log("AllSpots - allSpots:", allSpots);
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
        <div className="Spots-container">
            { spots && (
                spots.map((spot) => (
                    <div key={spot.id} className="Spots-card">
                        <div className="Spots-image">
                            <img
                                src={previewHandler(spot.previewImage)}
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
