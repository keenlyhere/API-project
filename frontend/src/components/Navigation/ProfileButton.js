import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux"
import * as sessionActions from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import CreateSpotForm from "../Spots/CreateSpot";

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
            <button onClick={openMenu} className="ProfileButton-icons">
                <i className="fa-sharp fa-solid fa-bars hamburger"></i>
                <i className="fa-solid fa-circle-user user"></i>
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
                        <li className="profile-dropdown-links">
                            <OpenModalButton
                                buttonText="Log In"
                                onButtonClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                        </li>
                        <li className="profile-dropdown-links">
                            <OpenModalButton
                                buttonText="Sign Up"
                                onButtonClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </li>
                        <div className="profile-dropdown-divide"></div>
                        <li className="profile-dropdown-links">
                            <OpenModalButton
                                buttonText="Deja-Moo your home"
                                onButtonClick={closeMenu}
                                modalComponent={<CreateSpotForm />}
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
