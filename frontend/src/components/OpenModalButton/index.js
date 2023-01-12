import React from "react";
import { useModal } from "../../context/Modal";
import "./OpenModalButton.css";

export default function OpenModalButton({ modalComponent, buttonText, onButtonClick, onModalClose }) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (typeof onButtonClick === "function") onButtonClick();
        if (typeof onModalClose === "function") setOnModalClose(onModalClose);

        setModalContent(modalComponent);
    }

    const buttonClass = buttonText.replace(/\s/g,"");

    return (
        <div className="OpenModalButton-container">
            <button
                onClick={onClick}
                className={`OpenModalButton-button ${buttonClass}`}
            >
                {buttonText}
            </button>
        </div>
    )
}
