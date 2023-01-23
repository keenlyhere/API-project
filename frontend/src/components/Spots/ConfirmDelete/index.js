import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useModal } from "../../../context/Modal";
import { deleteBooking, loadUserBookings } from "../../../store/bookingReducer";
import { deleteSpot, loadSpots } from "../../../store/spotReducer";

import "./ConfirmDelete.css";

export default function ConfirmDelete({ spotId, user, type, bookingId }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const { closeModal } = useModal();
    console.log("bookingId:", bookingId);

    const handleDelete = async () => {

        if (type === "spot") {
            console.log("DELETE SPOT")
            dispatch(deleteSpot(+spotId))
            dispatch(loadSpots());
            closeModal();
            history.push("/");
        } else if (type === "booking") {
            const deletedReview = await dispatch(deleteBooking(+bookingId));
            dispatch(loadUserBookings(+user.id));
            closeModal();
            history.push(`/my-trips`);
        }
    }

    if (spotId === undefined) return null;

    if (user === undefined) return null;

    if (type === "booking") {
        return (
            <div className="ConfirmDelete-container">
            <div className="ConfirmDelete-top">
                <button
                    className="ConfirmDelete-close"
                    onClick={closeModal}
                >
                    <i className="fa-sharp fa-solid fa-xmark"></i>
                </button>
                <h2 className="ConfirmDelete-top-header">Are you sure?</h2>
            </div>
            <p className="ConfirmDelete-message">
                Do you really want to cancel your booking? This process cannot be undone.
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
                    Delete Booking
                </button>
            </div>
        </div>
        )
    }

    return (
        <div className="ConfirmDelete-container">
            <div className="ConfirmDelete-top">
                <button
                    className="ConfirmDelete-close"
                    onClick={closeModal}
                >
                    <i className="fa-sharp fa-solid fa-xmark"></i>
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
