import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import * as sessionActions from "../../store/session";
import "./Navigation.css";

export default function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <li>
                <ProfileButton user={sessionUser} />
            </li>
        );
    } else {
        sessionLinks = (
            <li>
                <NavLink to="/login" className="Navigation-links">Log In</NavLink>
                <NavLink to="/signup" className="Navigation-links">Sign Up</NavLink>
            </li>
        );
    }
    return (
        <nav className="Navigation-container">
            <ul className="Navigation-list">
                <li>
                    <NavLink to="/" className="Navigation-links">Home</NavLink>
                </li>
                { isLoaded && sessionLinks }
            </ul>
        </nav>
    )
}
