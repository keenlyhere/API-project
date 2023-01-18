import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

import logo from "../../assets/dejamoo_logo_full.svg";

export default function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <nav className="Navigation-container">
            <ul className="Navigation-list">
                <li>
                    <NavLink exact to="/" className="Navigation-links">
                        <div className="Navigation-logo-container">
                            <img src={logo} className="Navigation-logo" />
                        </div>
                    </NavLink>
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
