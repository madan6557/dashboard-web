import React from "react";
import "./GenerateQRCode.css";
import ActionButton from "../../../components/ActionButton/ActionButton";
import QRSample from "../../../assets/images/QR_Sample.png"

const GenerateQRCode = () => {
    return (
        <div className="generateQR-container">
            <div className="qrGenerator-container">
                <p className="container-title" >QR Generator</p>
                <div className="qrGenerator-wrapper">
                    <div className="qr-image-container">
                        <img src={QRSample} alt="qr" />
                    </div>
                    <div className="qr-input-wrapper">
                        <div className="qr-counter">
                            <p>Start from <span>22400001</span> to <span>22400009</span></p>
                        </div>
                        <div className="input-container">
                            <p>Site</p>
                            <select className="site-dropdown" name="site" id="site" >
                                <option value="2">JBG</option>
                                <option value="1">Rehab Das</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <p>Amount</p>
                            <input type="number" className="qr-number-value"/>
                        </div>
                        <div className="qr-button-container">
                            <ActionButton title="Cancel" type="ghost"/>
                            <ActionButton title="Generate" type="confirm"/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default GenerateQRCode;