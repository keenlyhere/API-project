import React, { useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import "./ChangeProfileImageModal.css";

export default function ChangeProfileImageModal({ userId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const [ profileImageUrl, setProfileImageUrl ] = useState(null);
    const [ imageUrl, setImageUrl ] = useState(user.profileImageUrl);
    const [ errors, setErrors ] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.editUser({ userId, profileImageUrl }))
            .then(console.log("passed dispatch"))
            .then(history.push(`/user/${+userId}`))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImageUrl(file);
            const url = URL.createObjectURL(file);
            setImageUrl(url);
        }
    }

    return (
        <div className="EditProfileImageFormModal-container">
            <div className="EditProfileImageFormModal-top">
                <button
                    className="LoginFormModal-close"
                    onClick={closeModal}
                >
                    <i className="fa-sharp fa-solid fa-xmark"></i>
                </button>
                <h2 className="EditProfileImageFormModal-edit">Change your profile image</h2>
            </div>
            <div className="EditProfileImageFormModal-errors-container">
                <ul className="EditProfileImageFormModal-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
            </div>

            <form
                className="EditProfileImageFormModal-form"
                onSubmit={handleSubmit}
            >
                <div className="EditProfileImageFormModal-group-profile-pic">
                    <img
                        src={ imageUrl ? imageUrl : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                        alt="default-profile-image"
                        className="EditProfileImageFormModal-default-profile-image"
                    />
                    <label htmlFor="profile-pic-upload" className="EditProfileImageFormModal-profile-pic-upload clickable">
                        Upload your photo!
                    </label>
                    <input id="profile-pic-upload" type="file" onChange={updateFile} />
                </div>
                <div className="EditProfileImageFormModal-button-container">
                    <button
                        type="submit"
                        className="EditProfileImageFormModal-submit"
                    >Change your photo!</button>
                </div>
            </form>
        </div>
    )
}
