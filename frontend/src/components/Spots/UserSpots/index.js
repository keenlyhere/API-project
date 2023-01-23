import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { loadUserSpots } from "../../../store/spotReducer";
import previewHandler from "../../../utils/previewHandler";
import LoginFormModal from "../../LoginFormModal";
import OpenModalButton from "../../OpenModalButton";
import SignupFormModal from "../../SignupFormModal";
import ConfirmDelete from "../ConfirmDelete";
import CreateSpotForm from "../CreateSpot";
import EditSpotForm from "../EditSpot";

import "../Spots.css";
import "./UserSpots.css";

export default function UserSpots() {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const allSpots = useSelector(state => state.spots.spots);
    const userSpots = Object.values(allSpots).filter(spot => spot.ownerId === user.id);
    // console.log("UserSpots - allSpots", allSpots);
    // console.log("UserSpts - sessionUser", user);
    // console.log("UserSpots - userSpots", userSpots);

    const [ showMenu, setShowMenu ] = useState();
    const ulRef = useRef();

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        }

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        dispatch(loadUserSpots());
    }, [dispatch])

    const handleClick = (spotId) => {
        history.push(`/spots/${spotId}`)
    }

    const spotImage = (spot) => {
        if (spot.previewImage) {
            return (
                <img
                    className="Spots-image"
                    src={previewHandler(spot.previewImage)}
                    onClick={() => handleClick(spot.id)}
                    alt={`Spot #${spot.id}'s image`}
                />
            )
        } else {
            return
        }
    }

    if (!user) {
        return (
                <div className="UserSpots-container">
                    <div className="SpotDetails-login-signup">
                        <h2 className="SpotDetails-login-signup-header">
                            Oops, you're not logged in!
                        </h2>

                        <div className="SpotDetails-login-signup-buttons">
                                <OpenModalButton
                                    buttonText="Log In Now"
                                    onButtonClick={closeMenu}
                                    modalComponent={<LoginFormModal />}
                                    className="LoginButton"
                                />
                                <OpenModalButton
                                    buttonText="Sign Up Today"
                                    onButtonClick={closeMenu}
                                    modalComponent={<SignupFormModal />}
                                />
                        </div>
                    </div>
                </div>
        )
    }

    return (
        <div className="UserSpots-container">
            { userSpots && userSpots.length > 0 ? (
                userSpots.map((spot) => (
                    <div key={spot.id} className="UserSpots-card">
                        <div className="UserSpots-card-image">

                            <img
                                className="UserSpots-image"
                                src={previewHandler(spot.previewImage)}
                                onClick={() => handleClick(spot.id)}
                                alt={`Spot #${spot.id}'s image`}
                            />
                        </div>
                        <div className="Spots-card-button-group">
                            <div className="SpotDetails-subtitle-group">
                                <OpenModalButton
                                        buttonText="Edit"
                                        onButtonClick={closeMenu}
                                        modalComponent={<EditSpotForm spot={spot} />}
                                        icon={"edit"}
                                />
                            </div>
                            <div className="SpotDetails-subtitle-group">
                                <OpenModalButton
                                    buttonText="Delete"
                                    onButtonClick={closeMenu}
                                    modalComponent={<ConfirmDelete spotId={spot.id} user={user} type="spot" />}
                                    icon={"delete"}
                                />
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="UserSpots-container-oops">
                    <div className="SpotDetails-login-signup">
                        <h2 className="SpotDetails-login-signup-header">
                            Oops, you have no spots!
                        </h2>

                        <p className="SpotDetails-small-text">
                            But we can fix that! Just click the button below to begin listing your home on Deja-Moo!
                        </p>

                        <div className="SpotDetails-login-signup-buttons">
                                <OpenModalButton
                                    buttonText="Deja-Moo your home today"
                                    onButtonClick={closeMenu}
                                    modalComponent={<CreateSpotForm />}
                                />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
