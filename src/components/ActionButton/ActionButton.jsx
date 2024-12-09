import React from "react";
import './ActionButton.css';
import { NoIcon } from '../Icons/Icon';
import PropTypes from "prop-types";

const ActionButton = ({
    title,
    type = "ghost",
    icon = <NoIcon />, // Ikon default
    disabled = false,
    onClick // Tambahkan properti onClick
}) => {
    return (
        <div
            className={`actionButton-wrapper ${type} ${disabled ? "disabled" : ""}`}
            onClick={!disabled ? onClick : undefined} // Hanya panggil onClick jika tidak disabled
            role="button" // Tambahkan role untuk aksesibilitas
            tabIndex={0} // Membuatnya dapat diakses dengan keyboard
        >
            <div className="icon">
                {icon}
            </div>
            <p className="title"> {title}</p>
        </div>
    );
};

// PropTypes validation
ActionButton.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["ghost", "primary", "secondary", "danger", "confirm"]).isRequired,
    icon: PropTypes.node,
    disabled: PropTypes.bool,
    onClick: PropTypes.func // Validasi bahwa onClick adalah fungsi
};

export default ActionButton;
