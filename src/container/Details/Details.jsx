import React from "react";
import './Details.css';
import {TextField, OptionField} from "../../components/FieldInput/FieldInput";
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
                <OptionField id="species" title="Species" readonly={true}/>
                <OptionField id="activity" title="Activity" readonly={true}/>
                <OptionField id="skppkh" title="SKPPKH" readonly={true}/>
                <TextField id="height" title="Height" readonly={true}/>
                <TextField id="diameter" title="Diameter" type="number" readonly={true}/>
                <OptionField id="status" title="Status" type="number" readonly={true}/>
                <OptionField id="plot" title="Plot" readonly={true}/>
                <TextField id="easting" title="Easting" type="number" readonly={true}/>
                <TextField id="northing" title="Northing" type="number" readonly={true}/>
                <TextField id="elevasi" title="Elevasi" type="number" readonly={true}/>
            </div>
        </div>
    );
}

export default Details;
