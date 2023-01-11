import React from "react";
import { useModal } from "../../context/Modal";

export default function OpenModalButton({ modalComponent, buttonText, onButtonClick, onModalClose }) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (typeof onButtonClick === "function") onButtonClick();
        if (typeof onModalClose === "function") setOnModalClose(onModalClose);

        setModalContent(modalComponent);
    }
    return (
        <div className="OpenModalButton">
            <button
                onClick={onClick}
            >
                {buttonText}
            </button>
        </div>
    )
}
