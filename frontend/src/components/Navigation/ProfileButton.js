import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux"
import * as sessionActions from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";

export default function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [ showMenu, setShowMenu ] = useState(false);
    const ulRef = useRef();

    console.log("ProfileButton - user:", user);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

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

    const logout = (e) => {
        e.preventDefault();

        dispatch(sessionActions.logout());
        closeMenu();
    }

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <div className="ProfileButton-dropdown-container">
            <button onClick={openMenu} className="ProfileButton-icon">
                <i className="fa-solid fa-circle-user"></i>
            </button>
            <ul className={ulClassName} ref={ulRef}>
                { user ? (
                    <div>
                        <li className="profile-dropdown-links">{user.username}</li>
                        <li className="profile-dropdown-links">{user.firstName} {user.lastName}</li>
                        <li className="profile-dropdown-links">{user.email}</li>
                        <li className="profile-dropdown-links">
                            <button onClick={logout} className="profile-dropdown-logout">Log Out</button>
                        </li>
                    </div>
                ) : (
                    <div>
                        <li>
                            <OpenModalButton
                                buttonText="Log In"
                                onButtonClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                        </li>
                        <li>
                            <OpenModalButton
                                buttonText="Sign Up"
                                onButtonClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </li>
                    </div>
                )}

                {/* <li className="profile-dropdown-links">{user.username}</li>
                <li className="profile-dropdown-links">{user.firstName} {user.lastName}</li>
                <li className="profile-dropdown-links">{user.email}</li>
                <li className="profile-dropdown-links">
                    <button onClick={logout} className="profile-dropdown-logout">Log Out</button>
                </li> */}
            </ul>
        </div>
    )
}
