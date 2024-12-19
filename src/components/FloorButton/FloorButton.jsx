import React from "react";
import './FloorButton.css';

const FloorButton = ({
    title = "Title",
    isSelected = false, // Tambahkan properti isSelected
    onClick, // Tambahkan handler untuk klik
}) => {
    return (
        <div className="floorButton-wrapper" onClick={onClick}>
            <p className="title">{title}</p>
            <div className={`floor ${isSelected ? "selected" : ""}`}></div>
        </div>
    )
}

export default FloorButton;
