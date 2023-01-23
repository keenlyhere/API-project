import { NavLink } from "react-router-dom";

import "./NotFound.css";

export default function NotFound() {
    return (
        <div className="NotFound-container">
            <h1 className="NotFound-header">Oh no!</h1>
            <p className="NotFound-message">
                Looks like Harry Moo-dini staged another great escape! Let's go back to the main page!
            </p>
            <div className="NotFound-button-container">
                <NavLink exact to="/"
                >
                    <button
                        className="NotFound-button"
                    >
                        Home
                    </button>
                </NavLink>
            </div>
        </div>
    )
}
