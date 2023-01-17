import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "../../../Forms.css";
import { editSpot, loadSpotDetails, addSpotImage } from "../../../store/spotReducer";

export default function EditSpotForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.spot[spotId])
    const user = useSelector(state => state.session.user);

    const [ address, setAddress ] = useState(spot.address);
    const [ city, setCity ] = useState(spot.city);
    const [ state, setState ] = useState(spot.city);
    const [ country, setCountry ] = useState(spot.country);
    const [ lat, setLat ] = useState(spot.lat);
    const [ lng, setLng ] = useState(spot.lng);
    const [ name, setName ] = useState(spot.name);
    const [ description, setDescription ] = useState(spot.description);
    const [ price, setPrice ] = useState(spot.price);
    const [ imageUrl, setImageUrl ] = useState("");

    const [ errors, setErrors ] = useState([]);

    useEffect(() => {
        dispatch(loadSpotDetails(Number(spotId)))
    }, [dispatch])

    useEffect(() => {
        const errors = [];

        if (address && !address.length) {
            errors.push("Address is required.");
        }

        if (city && !city.length) {
            errors.push("City is required.");
        }

        if (state && !state.length) {
            errors.push("State is required.");
        }

        if (country && !country.length) {
            errors.push("Country is required.");
        }

        if (name && !name.length) {
            errors.push("Name is required.")
        }

        if (description && !description.length) {
            errors.push("Description is required.")
        }

        if (price && price < 1) {
            errors.push("Price per night must be greater than 0.")
        }

        setErrors(errors);
    }, [address, city, state, country, lat, lng, name, description, price]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const editedSpot = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        };

        setErrors([]);

        const editSpotId = await dispatch(editSpot(+spotId, editedSpot))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })

        const newSpotImage = await dispatch(addSpotImage(editSpotId.id, imageUrl, true))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })

        console.log("EditSpotForm - editSpotId:", editSpotId);
        history.push(`/spots/${editSpotId.id}`);

    }

    if (spot === undefined || user === undefined ) return null;

    if (user && user.id !== spot.ownerId) {
        return (
            <div className="EditSpot-error">
                <h1>You do not have permission to edit this spot.</h1>
            </div>
        )
    }

    return spot && (
        <div className="Form-container">
            <h1 className="Form-title">Edit Your Spot!</h1>
            <ul className="Form-errors">
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <form
                onSubmit={handleSubmit}
                className="Form-form"
            >
                <div className="Form-group">
                    <input
                        id="address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                    <label htmlFor="address">
                        Address
                    </label>
                </div>

                <div className="Form-group">
                    <input
                        id="city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                    <label htmlFor="city">
                        City
                    </label>
                </div>

                <div className="Form-group">
                    <input
                        id="state"
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                    <label htmlFor="state">
                        State
                    </label>
                </div>

                <div className="Form-group">
                    <input
                        id="country"
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                    <label htmlFor="country">
                        Country
                    </label>
                </div>

                <div className="Form-group">
                    <input
                        id="lat"
                        type="number"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        required
                    />
                    <label htmlFor="lat">
                        Latitude
                    </label>
                </div>

                <div className="Form-group">
                    <input
                        id="lng"
                        type="number"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        required
                    />
                    <label htmlFor="lng">
                        Longitude
                    </label>
                </div>

                <div className="Form-group">
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label htmlFor="name">
                        Name
                    </label>
                </div>

                <div className="Form-group">
                    <textarea
                        className="Form-description"
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <label htmlFor="description">
                        Description
                    </label>
                </div>

                <div className="Form-group">
                    <input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <label htmlFor="price">
                        Price
                    </label>
                </div>

                <div className="Form-group">
                    <input
                        id="image"
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    />
                    <label htmlFor="image">
                        Image
                    </label>
                </div>

                <button type="submit" className="Form-submit">Edit Spot</button>

            </form>
        </div>
    )
}
