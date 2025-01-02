import React, { useState } from "react";
import './EditDetails.css';
import { TextField, OptionField } from "../../components/FieldInput/FieldInput";
import Image from "../../components/Image/Image";
import { QRCode, Cross, Save, Trash } from "../../components/Icons/Icon";

const EditDetails = ({ onClose }) => {
    const [tooltipText, setTooltipText] = useState("");

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

                <div className="detail-close-button" onClick={onClose}>
                    <Cross />
                </div>
            </div>
            <div className="detail-form-wrapper">
                <div className="detail-image">
                    <Image
                        imageEditable={true}
                    />
                </div>
                <div className="detail-input-wrapper">
                    <OptionField id="species" title="Species" readonly={false} />
                    <OptionField id="activity" title="Activity" readonly={false} />
                    <OptionField id="skppkh" title="SKPPKH" readonly={false} />
                    <TextField id="height" title="Height" readonly={false} />
                    <TextField id="diameter" title="Diameter" type="number" readonly={false} />
                    <OptionField id="status" title="Status" type="number" readonly={false} />
                    <OptionField id="plot" title="Plot" readonly={false} />
                    <TextField id="easting" title="Easting" type="number" readonly={false} />
                    <TextField id="northing" title="Northing" type="number" readonly={false} />
                    <TextField id="elevasi" title="Elevasi" type="number" readonly={false} />
                </div>
            </div>
        </div>
    );
}

export default EditDetails;
