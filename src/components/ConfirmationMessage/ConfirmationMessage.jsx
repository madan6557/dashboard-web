import React, { useState, useEffect } from "react";
import "./ConfirmationMessage.css";
import ActionButton from "../ActionButton/ActionButton";

const ConfirmationMessage = ({
    message = "Are you sure want to continue?",
    type = "primary",
    isImportant = false,
    onConfirm,
    onCancel
}) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isConfirmDisabled, setIsConfirmDisabled] = useState(isImportant); // Disable confirm button if important
    const [countdown, setCountdown] = useState(isImportant ? 3 : 0); // 3 seconds countdown only if important

    useEffect(() => {
        // Load initial value from sessionStorage
        const storedValue = sessionStorage.getItem("confirmationCheckbox");
        if (storedValue) {
            setIsChecked(JSON.parse(storedValue));
        }

        if (isImportant) {
            // Start countdown for important message
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);

            // Disable the button for countdown duration (3 seconds)
            const timeout = setTimeout(() => {
                setIsConfirmDisabled(false);
            }, 3000);

            return () => {
                clearInterval(timer);
                clearTimeout(timeout);
            };
        }
    }, [isImportant]);

    useEffect(() => {
        if (countdown <= 0) {
            setCountdown(0);
        }
    }, [countdown]);

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
                        {!isImportant && (
                            <>
                                <input
                                    type="checkbox"
                                    id="confirmationCheckbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="confirmationCheckbox">Remember my choice</label>
                            </>
                        )}
                    </div>
                </div>
                <div className="confirmation-message-button-wrapper">
                    <ActionButton
                        title="Cancel"
                        type="ghost"
                        onClick={onCancel}
                    />
                    <ActionButton
                        title={`Confirm${isImportant && isConfirmDisabled ? ` (${countdown})` : ''}`}
                        type={type}
                        onClick={onConfirm}
                        disabled={isConfirmDisabled}
                    />
                </div>
            </div>
        </div>
    );
};

export default ConfirmationMessage;
