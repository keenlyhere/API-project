import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import "../../../Forms.css";
import { editSpot, loadSpotDetails } from "../../../store/spotReducer";

export default function EditSpotForm({ spot }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    // const spot = useSelector(state => state.spots.spot[spotId])
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
    // const [ imageUrl, setImageUrl ] = useState("");

    const [ errors, setErrors ] = useState([]);

    useEffect(() => {
        dispatch(loadSpotDetails(Number(spot.id)))
    }, [dispatch])

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

        const editSpotId = await dispatch(editSpot(+spot.id, editedSpot))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })

        console.log("spot", spot)
        console.log("EditSpotForm - editSpotId:", editSpotId);
        if (editSpotId !== undefined) {
            closeModal();
            dispatch(loadSpotDetails(Number(spot.id)))
            history.push(`/spots/${editSpotId.id}`);
        }

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
            <div className="Form-top">
                <button
                    className="Form-close"
                    onClick={closeModal}
                >
                    <i class="fa-sharp fa-solid fa-xmark"></i>
                </button>
                <h2 className="Form-create">Edit Your Spot!</h2>
            </div>
            <div className="Form-error-container">
                <ul className="Form-errors">
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
            </div>
            <form
                onSubmit={handleSubmit}
                className="Form-form"
            >
                <div className="Form-main-container">
                <div className="Form-group-top address">
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

                <div className="Form-group-middle city">
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

                <div className="Form-group-middle state">
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

                <div className="Form-group-middle country">
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

                <div className="Form-group-middle-latlng">
                    <div className="lat">
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
                    <div className="lng">
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
                </div>

                <div className="Form-group-middle name">
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

                <div className="Form-group-description description">
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

                <div className="Form-group-bottom price bottom-price">
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

                </div>
                <div className="Form-button-container">
                    <button type="submit" className="Form-submit">Edit Spot</button>
                </div>

            </form>
        </div>
    )
}
