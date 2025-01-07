import React from "react";
import './ActionButton.css';
import PropTypes from "prop-types";

const ActionButton = ({
    title,
    type = "ghost",
    icon = null, // Ikon default diubah menjadi null
    disabled = false,
    onClick
}) => {
    return (
        <div
            className={`actionButton-wrapper ${type} ${disabled ? "disabled" : ""}`}
            onClick={!disabled ? onClick : undefined}
            role="button"
            tabIndex={0}
        >
            {icon && ( // Render ikon hanya jika icon tidak null
                <div className="icon">
                    {icon}
                </div>
            )}
            <p className="title">{title}</p>
        </div>
    );
};

// PropTypes validation
ActionButton.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["ghost", "primary", "secondary", "danger", "confirm"]).isRequired,
    icon: PropTypes.node,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

export default ActionButton;