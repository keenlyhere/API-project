import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

export default function SignupFormModal() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [ email, setEmail ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ errors, setErrors ] = useState([]);
    const { closeModal } = useModal();


    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
                .then(closeModal)
                .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
                });
        }

        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <div className="SignUpForm-container">
            <div className="SignUpForm-top">
                <button
                    className="SignUpForm-close"
                    onClick={closeModal}
                >
                    <i className="fa-sharp fa-solid fa-xmark"></i>
                </button>
                <h2 className="SignUpForm-create">Sign up</h2>
            </div>
            <h1 className="SignUpForm-title">Welcome to Deja-Moo</h1>
            <div className="SignUpForm-errors-container">
                <ul className="SignUpForm-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
            </div>
            <form
                onSubmit={handleSubmit}
                className="SignUpForm-form"
            >
            <div className="SignUpForm-main-container">
            <div className="SignUpForm-group-top email">
                <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label for="email">
                    Email
                </label>
            </div>
            <div className="SignUpForm-group-middle username">
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label for="username">
                    Username
                </label>
            </div>
            <div className="SignUpForm-group-middle firstName">
                <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <label for="firstName">
                    First Name
                </label>
            </div>
            <div className="SignUpForm-group-middle lastName">
                <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <label for="lastName">
                    Last Name
                </label>
            </div>
            <div className="SignUpForm-group-middle password">
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label for="password">
                    Password
                </label>
            </div>
            <div className="SignUpForm-group-bottom confirmPassword">
                <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <label for="confirmPassword">
                    Confirm Password
                </label>
            </div>
            </div>
            <div className="SignUpForm-button-container">
                <button
                    type="submit"
                    className="SignUpForm-submit"
                >Sign Up</button>
            </div>
            </form>
        </div>
    );
};
