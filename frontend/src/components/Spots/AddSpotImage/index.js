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
    const [ images, setImages ] = useState([]);
    const [ errors, setErrors ] = useState([]);
    const spot = useSelector(state => state.spots.spot[spotId]);
    const [ numFiles, setNumFiles ] = useState(0)
    // console.log("AddSpotImage - spot:", spot);

    const handleSubmit = async (e) => {
        // previously (removed true for preview)
        // const newSpotImage = await dispatch(addSpotImage(+spotId, imageUrl, true))
        console.log("IMAGES", images)
        const parsedSpotId = +spotId
        console.log("handle submit");
        const newSpotImage = await dispatch(addSpotImage({ parsedSpotId, images, preview: true }))
            .then(dispatch(loadSpotDetails(parsedSpotId)))
            .then(closeModal())
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })

        // console.log("spotId", spotId);
        dispatch(loadSpotDetails(+spotId))
        closeModal();
    }

    const updateFiles = (e) => {
        const files = e.target.files;
        console.log(files);
        setImages(Array.from(files));
        setNumFiles(Array.from(files).length);
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
                <h2 className="AddSpotImageForm-create">Liven up your listing with photos</h2>
            </div>
            <div className="AddSpotImageForm-description">
                Take photos using a phone or camera. Upload at least one photo to publish your listing. You can always add or edit your photos later.
            </div>
            <div className="AddSpotImageForm-error-container">
                <ul className="AddSpotImageForm-errors">
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
            </div>
            {/* {} */}
            <form
                onSubmit={handleSubmit}
                className="AddSpotImageForm-Form"
            >
                <div className="AddSpotImageForm-main-container">
                    <div className="AddSpotImageForm-group">
                        <div className="AddSpotImageForm-input">
                            {/* <input
                                id="image"
                                type="url"
                                value={imageUrl}
                                // onChange={(e) => setImageUrl(e.target.value)}
                                onChange={(e) => setImages(e.target.value)}
                                required
                            />
                            <label htmlFor="image">
                                Image
                            </label> */}
                            <label htmlFor="spot-image-upload" className="AddSpotImageForm-upload clickable">
                                <i className="fa-solid fa-cloud-arrow-up"></i> Upload Photos
                            </label>
                            <input id="spot-image-upload" type="file" onChange={updateFiles} multiple />
                        </div>
                    </div>

                    <div className="AddSpotImageForm-num-files">
                        { images.length === 1 && (
                            `${images.length} file added`
                        )}
                        { images.length > 1 && (
                            `${images.length} files added`
                        )}
                        {/* { images.length  ? (
                            `${images.length} file(s) added`
                        ) : ""} */}
                    </div>
                </div>

                <div className="AddSpotImageForm-button-container">
                    <button onClick={closeModal} className="AddSpotImageForm-skip clickable">Skip for now</button>
                    <button type="submit" className="AddSpotImageForm-submit">Add Spot Image</button>
                </div>
            </form>
        </div>
    )
}
