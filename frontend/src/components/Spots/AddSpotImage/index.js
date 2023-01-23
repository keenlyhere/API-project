import React, { useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { addSpotImage, loadSpotDetails } from "../../../store/spotReducer";

import "./AddSpotImage.css"

export default function AddSpotImage({spotId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [ imageUrl, setImageUrl ] = useState("");
    const [ errors, setErrors ] = useState([]);
    const spot = useSelector(state => state.spots.spot[spotId]);
    console.log("AddSpotImage - spot:", spot);

    const handleSubmit = async (e) => {

        const newSpotImage = await dispatch(addSpotImage(+spotId, imageUrl, true))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })

        dispatch(loadSpotDetails(+spotId))
        closeModal();
    }

    if (!spot) return null;

    return (
        <div className="AddSpotImageForm-container">
            <div className="AddSpotImageForm-top">
                <button
                    className="Form-close"
                    onClick={closeModal}
                >
                    <i className="fa-sharp fa-solid fa-xmark"></i>
                </button>
                <h2 className="Form-create">Add Spot Image</h2>
            </div>
            <div className="AddSpotImageForm-error-container">
                <ul className="AddSpotImageForm-errors">
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
            </div>
            <form
                onSubmit={handleSubmit}
                className="AddSpotImageForm-Form"
            >
                <div className="AddSpotImageForm-main-container">
                    <div className="AddSpotImageForm-group">
                        <div className="AddSpotImageForm-input">
                            <input
                                id="image"
                                type="url"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                required
                            />
                            <label htmlFor="image">
                                Image
                            </label>
                        </div>
                    </div>
                </div>

                <div className="AddSpotImageForm-button-container">
                    <button type="submit" className="AddSpotImageForm-submit">Add Spot Image</button>
                </div>
            </form>
        </div>
    )
}
