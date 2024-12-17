import React from "react";
import './Details.css';
import FieldInput from "../../components/FieldInput/FieldInput";
import Image from "../../components/Image/Image";
import { QRCode, Cross, PencileAltOutline } from "../../components/Icons/Icon";

const Details = ({ onClose, onEdit }) => {
    return (
        <div className="details-wrapper">
            <div className="details-header-wrapper">
                <div className="qrCode">
                    <div className="icon">
                        <QRCode />
                    </div>
                    <p className="value">22400001</p>
                </div>
                <div className="edit-button" onClick={onEdit}>
                    <PencileAltOutline />
                </div>
                <div className="close-button" onClick={onClose}>
                    <Cross />
                </div>
            </div>
            <div className="form-wrapper">
                <Image />
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
    );
}

export default Details;
