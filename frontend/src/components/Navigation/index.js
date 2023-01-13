import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
// import * as sessionActions from "../../store/session";
import "./Navigation.css";
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";

export default function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <nav className="Navigation-container">
            <ul className="Navigation-list">
                <li>
                    <NavLink exact to="/" className="Navigation-links">Home</NavLink>
                </li>
                { isLoaded && (
                    <li>
                        <ProfileButton user={sessionUser} />
                    </li>
                ) }
            </ul>
        </nav>
    )
}

