import React from "react";
import {
    NoIcon,
    checkCircle,
    exclamationCircle,
    informationCircle,
    xCircle,
} from "../Icons/Icon";
import "./Notification.css";
import PropTypes from "prop-types";

// Map icon based on type
const iconMap = {
    success: checkCircle,
    caution: exclamationCircle,
    error: exclamationCircle,
    failed: xCircle,
    info: informationCircle,
};

const Notification = ({ id, message, type, time, isPopup = false, onClose = null }) => {
    // Get the appropriate icon based on the type
    const IconComponent = iconMap[type] || NoIcon;

    return (
        <div className="notification-wrapper">
            <div className={`icon ${type}`}>
                <IconComponent />
            </div>
            <div>
                <p className="message">{message}</p>
                <p className="time">{time}</p>
            </div>
            {/* Show close button only if isPopup is false */}
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

// PropTypes validation
Notification.propTypes = {
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["info", "success", "error", "failed", "caution"]).isRequired,
    time: PropTypes.string.isRequired,
    isPopup: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
};

export default Notification;
