import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useModal } from "../../../context/Modal";
import { deleteSpot } from "../../../store/spotReducer";

import "./ConfirmDelete.css";

export default function ConfirmDelete({ spotId, user }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(deleteSpot(+spotId))
        closeModal();
        history.push("/");
    }

    if (spotId === undefined) return null;

    if (user === undefined) return null;

    console.log("user", user);

    return (
        <div className="ConfirmDelete-container">
            <div className="ConfirmDelete-top">
                <button
                    className="ConfirmDelete-close"
                    onClick={closeModal}
                >
                    <i class="fa-sharp fa-solid fa-xmark"></i>
                </button>
                <h2 className="ConfirmDelete-top-header">Are you sure?</h2>
            </div>
            <p className="ConfirmDelete-message">
                Do you really want to delete this spot? This process cannot be undone.
            </p>
            <div className="ConfirmDelete-button-container">
                <button
                    onClick={closeModal}
                    className="ConfirmDelete-cancel-button"
                >
                    Cancel
                </button>
                <button
                    onClick={handleDelete}
                    className="ConfirmDelete-delete-button"
                >
                    Delete Spot
                </button>
            </div>
        </div>
    )
}
