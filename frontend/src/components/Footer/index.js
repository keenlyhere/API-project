import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import AddReviewForm from "../Reviews/AddReviewForm";
import "./Footer.css";

export default function Footer({ spot }) {
    const price = Math.round(spot.price);
    const dispatch = useDispatch();

    const ulRef = useRef();
    const [ showMenu, setShowMenu ] = useState(false);

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
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    return (
        <div className="Footer-container">
            <h2 className="Footer-price">${price} night</h2>
            <OpenModalButton
                buttonText="Review Spot"
                onButtonClick={closeMenu}
                modalComponent={<AddReviewForm host={spot.Owner.firstName} />}
            />
        </div>
    )
}
