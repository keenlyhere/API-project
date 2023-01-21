import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import "../../../Forms.css";
import { addSpot, addSpotImage } from "../../../store/spotReducer";

export default function CreateSpotForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const [ address, setAddress ] = useState("");
    const [ city, setCity ] = useState("");
    const [ state, setState ] = useState("");
    const [ country, setCountry ] = useState("");
    const [ lat, setLat ] = useState(111.11);
    const [ lng, setLng ] = useState(22.2222);
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ price, setPrice ] = useState("");
    const [ imageUrl, setImageUrl ] = useState("");

    const [ errors, setErrors ] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newSpot = {
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

        const newSpotId = await dispatch(addSpot(newSpot))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })

        const newSpotImage = await dispatch(addSpotImage(newSpotId.id, imageUrl, true))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })

        closeModal();
        history.push(`/spots/${newSpotId.id}`);

    }

    return (
        <div className="Form-container">
            <div className="Form-top">
                <button
                    className="Form-close"
                    onClick={closeModal}
                >
                    <i class="fa-sharp fa-solid fa-xmark"></i>
                </button>
                <h2 className="Form-create">Create a Spot!</h2>
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

                <div className="Form-group-middle price">
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

                <div className="Form-group-bottom image">
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
                </div>

                <div className="Form-button-container">
                    <button type="submit" className="Form-submit">Create New Spot</button>
                </div>

            </form>
        </div>
    )
}
