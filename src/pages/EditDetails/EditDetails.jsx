import React, { useState } from "react";
import './EditDetails.css';
import FieldInput from "../../components/FieldInput/FieldInput";
import Image from "../../components/Image/Image";
import { QRCode, Cross, PencileAltOutline, Save, Trash } from "../../components/Icons/Icon";

const EditDetails = ({ onClose }) => {
    const [tooltipText, setTooltipText] = useState("");
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

    const handleMenuHover = (title) => {
        setTooltipText(title);
    };

    const handleMenuLeave = () => {
        setTooltipText(""); // Clear tooltip when mouse leaves
    };

    return (
        <div className="edit-details-wrapper">

            <div className="edit-details-header-wrapper">
                <div className="qrCode">
                    <div className="icon">
                        <QRCode />
                    </div>
                    <p className="value">22400001</p>
                </div>
                <div
                    className="detail-delete-button"
                    onMouseEnter={() => handleMenuHover("Delete")}
                    onMouseLeave={handleMenuLeave}
                >
                    <Trash />
                    {tooltipText === "Delete" && (
                        <div className="detail-tooltip">
                            <p>{tooltipText}</p>
                        </div>
                    )}
                </div>

                <div
                    className="detail-save-button"
                    onMouseEnter={() => handleMenuHover("Save")}
                    onMouseLeave={handleMenuLeave}
                >
                    <Save />
                    {tooltipText === "Save" && (
                        <div className="detail-tooltip">
                            <p>{tooltipText}</p>
                        </div>
                    )}
                </div>

                <div className="detail-close-button">
                    <Cross />
                </div>
            </div>
            <div className="detail-form-wrapper">
                <div className="detail-image">
                    <Image />
                </div>
                <div className="detail-input-wrapper">
                    <FieldInput />
                    <FieldInput />
                    <FieldInput />
                    <FieldInput />
                    <FieldInput />
                    <FieldInput />
                    <FieldInput />
                    <FieldInput />
                    <FieldInput />
                    <FieldInput />
                    <FieldInput />
                    <FieldInput />
                    <FieldInput />
                    <FieldInput />
                </div>
            </div>
        </div>
    );
}

export default EditDetails;
