import React, { useState, useEffect } from "react";
import "./ConfirmationMessage.css";
import ActionButton from "../ActionButton/ActionButton";

const ConfirmationMessage = ({
    message = "Are you sure want to continue?",
    type = "confirm",
    onConfirm,
    onCancel
}) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        // Load initial value from sessionStorage
        const storedValue = sessionStorage.getItem("confirmationCheckbox");
        if (storedValue) {
            setIsChecked(JSON.parse(storedValue));
        }
    }, []);

    const handleCheckboxChange = (e) => {
        const checked = e.target.checked;
        setIsChecked(checked);
        sessionStorage.setItem("confirmationCheckbox", JSON.stringify(checked));
    };

    return (
        <div className="confirmation-message-container">
            <div className="confirmation-message-wrapper">
                <div className="confirmation-message-content">
                    <p className="confirmation-message-text">{message}</p>
                    <div className="checkbox-wrapper">
                        <input
                            type="checkbox"
                            id="confirmationCheckbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="confirmationCheckbox">Remember my choice</label>
                    </div>
                </div>
                <div className="confirmation-message-button-wrapper">
                    <ActionButton
                        title="Cancel"
                        type="ghost"
                        onClick={onCancel}
                    />
                    <ActionButton
                        title="Confirm"
                        type={type}
                        onClick={onConfirm}
                    />
                </div>
            </div>
        </div>

    );
};

export default ConfirmationMessage;
