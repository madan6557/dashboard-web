import React, { useState, useEffect, useContext } from 'react';
import "./GenerateQRCode.css";
import ActionButton from "../../../components/ActionButton/ActionButton";
import QRSample from "../../../assets/images/QR_Sample.png";
import { DataOptionContext } from "../../../context/dataOptionContext";
import { SiteIDContext } from "../../../context/SiteIDContext";
import { OptionField, AreaField } from '../../../components/FieldInput/FieldInput';
import { checkMissingQRCode, getCounter, getQRCode, requestQRCode } from '../../../api/controller/qrCodeController';

const GenerateQRCode = () => {
    const { dataOption } = useContext(DataOptionContext);
    const { selectedSite } = useContext(SiteIDContext);
    const [siteOption, setSiteOption] = useState([{ text: "", value: "" }]);
    const [site, setSite] = useState("");
    const [startID, setStartID] = useState(0);
    const [endID, setEndId] = useState(0);
    const [amount, setAmount] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [downloadUrlGen, setDownloadUrlGen] = useState(""); // Untuk Generator QR
    const [downloadUrlCustomQR, setDownloadUrlCustomQR] = useState(""); // Untuk Custom QR
    const [downloadUrl, setDownloadUrl] = useState("");

    const [qrFound, setQrFound] = useState([]);
    const [qrAmount, setQrAmount] = useState(0);
    const [customQRInput, setCustomQRInput] = useState(""); // State untuk input custom QR
    const [isRegenerating, setIsRegenerating] = useState(false);

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
            setDownloadUrlGen(""); // Clear previous download URL

            const data = {
                id_site: site,
                generate: parseInt(amount)
            };
            const response = await requestQRCode(data);

            if (response) {
                const blob = new Blob([response], { type: 'application/zip' });
                const url = window.URL.createObjectURL(blob);
                setDownloadUrlGen(url);
            }
        } catch (error) {
            console.error("Error fetching QR code:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const checkQRCode = async () => {
        try {
            setCustomQRInput(""); // Kosongkan dulu sebelum menampilkan hasil baru

            const response = await checkMissingQRCode(site);
            const missingQRs = response.data;

            setQrFound(missingQRs);
            setQrAmount(missingQRs.length);
            setCustomQRInput(missingQRs.join(", ")); // Menampilkan hasil di AreaField
        } catch (error) {
            console.error("Error fetching QR code:", error);
        }
    };

    const handleRegenerateQRCode = async () => {
        try {
            setIsRegenerating(true);
            setDownloadUrlCustomQR(""); // Clear previous download URL

            const qr = qrFound.length > 0 ? qrFound : customQRInput.split(",").map(item => item.trim());

            if (qr.length === 0) {
                console.warn("No QR codes to regenerate.");
                setIsRegenerating(false);
                return;
            }

            const data = { generate: qr };
            const response = await getQRCode(data);

            if (response) {
                const blob = new Blob([response], { type: 'application/zip' });
                const url = window.URL.createObjectURL(blob);
                setDownloadUrlCustomQR(url);
            }
        } catch (error) {
            console.error("Error fetching QR code:", error);
        } finally {
            setIsRegenerating(false);
        }
    };

    useEffect(() => {
        if (selectedSite) {
            setSite(selectedSite);
            setSiteOption(dataOption.tb_site);
        }// eslint-disable-next-line
    }, [selectedSite]);

    useEffect(() => {
        if (site) {
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
        if (downloadUrl) {
            window.URL.revokeObjectURL(downloadUrl);
            setDownloadUrl(""); // Clear the download URL
        }
    };

    // Handle perubahan input di Custom QR
    const handleCustomQRChange = (e) => {
        const value = e.target.value;
        setCustomQRInput(value);
    
        const qrList = value
            .split(",")
            .map(item => item.trim())
            .filter(item => item !== ""); // Menghapus item kosong
    
        setQrAmount(qrList.length); // Jika kosong, qrAmount otomatis menjadi 0
    };
    

    const handleDownloadGen = () => {
        if (downloadUrlGen) {
            const selectedSiteObj = siteOption.find(option => option.value.toString() === site.toString());
            const selectedSiteText = selectedSiteObj ? selectedSiteObj.text : "QR_Code";
            const fileName = `${selectedSiteText}_QR_Code.zip`;

            const a = document.createElement('a');
            a.href = downloadUrlGen;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    const handleDownloadCustomQR = () => {
        if (downloadUrlCustomQR) {
            const selectedSiteObj = siteOption.find(option => option.value.toString() === site.toString());
            const selectedSiteText = selectedSiteObj ? selectedSiteObj.text : "Custom_QR_Code";
            const fileName = `${selectedSiteText}_Custom_QR_Code.zip`;

            const a = document.createElement('a');
            a.href = downloadUrlCustomQR;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    return (
        <div className="generateQR-container">
            <div className="qrGenerator-form">
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
                            {downloadUrlGen && <ActionButton title="Download" type="primary" onClick={handleDownloadGen} />}
                        </div>
                        <div className="qr-button-container">
                            <ActionButton title="Cancel" type="ghost" onClick={handleAbort} />
                            <ActionButton title="Generate" type="confirm" onClick={handleGenerate} disabled={isGenerating} />
                        </div>
                    </div>
                </div>

                {/* Custom QR Code Section */}
                <div className='check-qr-form'>
                    <AreaField
                        title='Custom QR Code'
                        placeholder='22500000, 22500001, ...(separate by comma ( , ))'
                        value={customQRInput}
                        onChange={handleCustomQRChange}
                    />
                    <div className='generating-progress-bar'>
                        {isRegenerating && <div>Processing . . .</div>}
                        {downloadUrlCustomQR && <ActionButton title="Download" type="primary" onClick={handleDownloadCustomQR} />}
                    </div>
                    <div className="qr-button-container">
                        <ActionButton title="Cancel" type="ghost" onClick={handleAbort} />
                        <ActionButton title="Check Missing QR" type="primary" onClick={checkQRCode} />
                        <ActionButton title={`Generate (${qrAmount})`} type="confirm" onClick={handleRegenerateQRCode} disabled={isRegenerating} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GenerateQRCode;
