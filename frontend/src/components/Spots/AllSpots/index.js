import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadSpots } from "../../../store/spotReducer";
import previewHandler from "../../../utils/previewHandler";

import "../Spots.css";
import AllSpotsSkeleton from "./AllSpotsSkeleton";
// import "./AllSpots-skeleton.css";

export default function AllSpots({ isLoaded }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const allSpots = useSelector(state => state.spots.spots);
    // console.log("AllSpots - allSpots:", allSpots);
    const spots = [];
    Object.values(allSpots).forEach(spot => spots.push(spot));
    // console.log("AllSpots - spots:", spots);

    useEffect(() => {
        dispatch(loadSpots());
    }, [dispatch]);

    const starRating = (rating) => {
        if (typeof rating === "number") {
            return (
                <div>
                    <i className="fa-solid fa-star star-icon"></i>
                    {Number(rating).toFixed(2)}
                </div>
                );
        } else {
            return "";
        }
    }

    const handleClick = (spotId) => {
        history.push(`/spots/${spotId}`)
    }

    if (!spots) return null;

    if (isLoaded === false) {
        [1,2,3,4,5,6,7,8,9,10].map(num => (
            <AllSpotsSkeleton key={num} />
        ))
    }

    const fixedPrice = (price) => {
        if (price) {
            const newPrice = Math.round(+price);
            return newPrice;
        }

        return null;
    }


    return (
        <div className="Spots-container">
            { spots && (
                spots.map((spot) => (
                    <div key={spot.id} className="Spots-card">
                        <div className="Spots-card-image">
                            <img
                                className="Spots-image"
                                src={previewHandler(spot.previewImage)}
                                onClick={() => handleClick(spot.id)}
                                alt={`Spot #${spot.id}'s image`}
                            />
                        </div>
                        <div className="Spots-card-description">
                            <div className="Spots-header">
                                <p className="Spots-location">{spot.city}, {spot.state}</p>
                                <p className="Spots-rating">
                                    {starRating(spot.avgRating)}
                                </p>
                            </div>
                            <div className="Spots-footer">
                                <span className="Spots-price">${fixedPrice(spot.price)}</span> night
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}
