import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";

import './LoginForm.css';

export default function LoginFormModal() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [ credential, setCredential ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errors, setErrors ] = useState([]);
    const { closeModal } = useModal();

    if (sessionUser) return (
        <Redirect to="/" />
    )

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <div className="LoginFormModal-container">
            <h1 className="LoginFormModal-header">Welcome to BearBnB</h1>
            <ul className="LoginFormModal-errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <form
                className="LoginFormModal-form"
                onSubmit={handleSubmit}
            >
                {/* <label>
                    Username or Email
                    <input
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label> */}
                <div className="LoginFormModal-group">
                    <input
                        id="credential"
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                    <label for="credential">Username or Email</label>
                </div>
                <div className="LoginFormModal-group">
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label for="password">Password</label>
                </div>
                <div className="LoginFormModal-group">
                    <button
                        type="submit"
                        className="LoginFormModal-submit"
                    >
                        Log In
                    </button>
                </div>
            </form>
        </div>
    );
}
