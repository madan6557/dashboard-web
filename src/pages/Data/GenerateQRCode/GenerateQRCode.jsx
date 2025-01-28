import React, { useState, useEffect, useContext } from 'react';
import "./GenerateQRCode.css";
import ActionButton from "../../../components/ActionButton/ActionButton";
import QRSample from "../../../assets/images/QR_Sample.png";
import { DataOptionContext } from "../../../context/dataOptionContext";
import { SiteIDContext } from "../../../context/SiteIDContext";
import { OptionField } from '../../../components/FieldInput/FieldInput';
import { getCounter, requestQRCode } from '../../../api/controller/qrCodeController';

const GenerateQRCode = () => {
    const { dataOption } = useContext(DataOptionContext);
    const { selectedSite } = useContext(SiteIDContext);
    const [siteOption, setSiteOption] = useState([{ text: "", value: "" }]);
    const [site, setSite] = useState("");
    const [startID, setStartID] = useState(0);
    const [endID, setEndId] = useState(0);
    const [amount, setAmount] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showDownload, setShowDownload] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState("");

    const fetchCounter = async () => {
        try {

            const response = await getCounter(site);
            setStartID(parseInt(response.lastPrintedQR) + 1);
            setEndId(parseInt(response.lastPrintedQR) + 1);
        } catch (error) {
            console.error("Error fetching QR code:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleGenerateQRCode = async () => {
        try {
            setIsGenerating(true);
            setShowDownload(false);
            setDownloadUrl(""); // Clear previous download URL

            const data = {
                id_site: site,
                generate: parseInt(amount)
            };
            const response = await requestQRCode(data);

            if (response) {
                const blob = new Blob([response], { type: 'application/zip' });
                const url = window.URL.createObjectURL(blob);
                setDownloadUrl(url);
                setShowDownload(true);
            }
        } catch (error) {
            console.error("Error fetching QR code:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    useEffect(() => {
        if (selectedSite) {
            setSite(selectedSite);
            setSiteOption(dataOption.tb_site);
        }// eslint-disable-next-line
    }, [selectedSite]);

    useEffect(() => {
        if (selectedSite) {
            fetchCounter();
        }
        // eslint-disable-next-line
    }, [site]);

    const handleSiteChange = (value) => {
        setSite(value);
    };

    const handleAmountChange = (value) => {
        let validAmount = Math.max(1, parseInt(value, 10));
        setAmount(validAmount);
        setEndId(validAmount === 1 ? startID : startID + validAmount);
    };

    const handleGenerate = () => {
        handleGenerateQRCode();
    };

    const handleAbort = () => {
        setIsGenerating(false);
        setShowDownload(false);
        if (downloadUrl) {
            window.URL.revokeObjectURL(downloadUrl);
            setDownloadUrl(""); // Clear the download URL
        }
    };

    const handleDownload = () => {
        if (downloadUrl) {
            const selectedSiteText = siteOption.find(option => option.value === site)?.text || "QR_Code"; // Get the text from siteOption
            const fileName = `${selectedSiteText}_QR_Code.zip`; // Dynamic file name based on siteOption
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    return (
        <div className="generateQR-container">
            <div className="qrGenerator-container">
                <p className="container-title">QR Generator</p>
                <div className="qrGenerator-wrapper">
                    <div className="qr-image-container">
                        <img src={QRSample} alt="qr" />
                    </div>
                    <div className="qr-input-wrapper">
                        <div className="qr-counter">
                            <p>Start from <span><strong>{startID}</strong></span> to <span><strong>{endID}</strong></span></p>
                        </div>
                        <div className="qr-input-container">
                            <OptionField id="site" title="Site" value={site} optionItem={siteOption} onChange={(e) => { handleSiteChange(e.target.value) }} />
                        </div>
                        <div className="qr-input-container">
                            <p className='title'>Amount</p>
                            <input
                                id='amount'
                                type="number"
                                className="qr-number-value"
                                value={amount}
                                min="1"
                                onChange={(e) => { handleAmountChange(e.target.value); }}
                            />
                        </div>
                        <div className='generating-progress-bar'>
                            {isGenerating && <div>Processing . . .</div>}
                            {showDownload && <ActionButton title="Download" type="primary" onClick={handleDownload} />}
                        </div>
                        <div className="qr-button-container">
                            <ActionButton title="Cancel" type="ghost" onClick={handleAbort} />
                            <ActionButton title="Generate" type="confirm" onClick={handleGenerate} disabled={isGenerating} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GenerateQRCode;
