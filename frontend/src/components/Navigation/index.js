import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import CreateSpotForm from "../Spots/CreateSpot";

import logo from "../../assets/dejamoo_logo_full.svg";
import OpenModalButton from "../OpenModalButton";

export default function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const [ showMenu, setShowMenu ] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        }

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu])

    const closeMenu = () => setShowMenu(false);

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
                <div className="Navigation-list-right">
                    { sessionUser &&
                        <li className="Navigation-list-modal">
                            <OpenModalButton
                                buttonText="Deja-Moo your home"
                                onButtonClick={closeMenu}
                                modalComponent={<CreateSpotForm />}
                            />
                        </li>
                    }
                    { isLoaded && (
                        <li>
                            <ProfileButton user={sessionUser} />
                        </li>
                    ) }
                </div>
            </ul>
        </nav>
    )
}
