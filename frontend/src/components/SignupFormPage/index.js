import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css"

export default function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [ email, setEmail ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ errors, setErrors ] = useState([]);

    if (sessionUser) return (
            <Redirect to="/" />
        )

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
        setErrors([]);
        return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
            .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
            });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <div className="SignupFormPage-container">
            <form
                onSubmit={handleSubmit}
                className="SignupFormPage-form"
            >
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div className="SignupFormPage-group">
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
            <div className="SignupFormPage-group">
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
            <div className="SignupFormPage-group">
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
            <div className="SignupFormPage-group">
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
            <div className="SignupFormPage-group">
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
            <div className="SignupFormPage-group">
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
            <div className="SignupFormPage-group">
                <button
                    type="submit"
                    className="SignupFormPage-submit"
                >Sign Up</button>
            </div>
            </form>
        </div>
    );
};
