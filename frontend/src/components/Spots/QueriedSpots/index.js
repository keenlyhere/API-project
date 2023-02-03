import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { loadSearch } from "../../../store/searchReducer";
import previewHandler from "../../../utils/previewHandler";

export default function QueriedSpots({ isLoaded }) {
    const dispatch = useDispatch();
    const { query } = useParams();
    console.log("QUERY", query);
    // const location = useLocation();
    const history = useHistory();
    // console.log("location search", location.search)
    const queriedSpots = useSelector(state => state.searches.search);
    console.log("QueriedSpots - queriedSpots:", queriedSpots);
    const spotsArray = Object.values(queriedSpots);
    console.log("QueriedSpots - spotsArray:", spotsArray);

    useEffect(() => {
        console.log("hit use effect")
        dispatch(loadSearch(query));
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

    const fixedPrice = (price) => {
        if (price) {
            const newPrice = Math.round(+price);
            return newPrice;
        }

        return null;
    }

    if (!queriedSpots) return null;

    return (
        isLoaded && queriedSpots ? <div className="Spots-container">
            { spotsArray && spotsArray.length() && spotsArray.map((spot) => (
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
            )) }
        </div>  : "meow"
    )
}
