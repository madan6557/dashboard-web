import React from "react";
import { NoIcon } from "../Icons/Icon";
import "./Notification.css";
import PropTypes from "prop-types";

const Notification = ({ id, message, type, time, isPopup = false, onClose = null }) => {
    return (
        <div className="notification-wrapper">
            <div className={`icon ${type}`}>
                <NoIcon />
            </div>
            <div>
                <p className="message">{message}</p>
                <p className="time">{time}</p>
            </div>
            {/* Hanya tampilkan tombol close jika isPopup adalah false */}
            {!isPopup && (
                <div
                    className="close-button"
                    aria-label="Close notification"
                    onClick={() => onClose?.(id)}
                >
                    <NoIcon />
                </div>
            )}
        </div>
    );
};

// Move propTypes and defaultProps here after the component
Notification.propTypes = {
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["info", "success", "error", "caution"]).isRequired,
    time: PropTypes.string.isRequired,
    isPopup: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
};

export default Notification;
