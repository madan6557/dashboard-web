import React, { useEffect, useState } from "react";
import './QRDownloadForm.css';
import ActionButton from "../../components/ActionButton/ActionButton";
import { getQRCode } from "../../api/controller/qrCodeController";

const QRDownloadForm = ({ onClose, id }) => {
    const [qrCode, setQrCode] = useState(null);
    const [downloadUrl, setDownloadUrl] = useState(null);

    const fetchQRCode = async () => {
        const response = await getQRCode(id);
        setQrCode(response);
        const blob = new Blob([response], { type: 'image/png' }); // Assuming it's a PNG
        const url = window.URL.createObjectURL(blob);
        setDownloadUrl(url);
    };

    useEffect(() => {
        fetchQRCode();
        return cleanupDownloadUrl; // Cleanup on component unmount
        // eslint-disable-next-line
    }, []);

    const cleanupDownloadUrl = () => {
        if (downloadUrl) {
            window.URL.revokeObjectURL(downloadUrl);
            setDownloadUrl(null);
        }
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `QRCode_${id}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleClose = () => {
        cleanupDownloadUrl();
        onClose();
    };

    return (
        <div className="qrDownloadForm-wrapper">
            <div className="detail-close-button" onClick={handleClose}>
                <Cross />
            </div>
            {qrCode ? (
                <img className="QrCode-image" src={downloadUrl} alt="QrCode" />
            ) : (
                <div className="shimmer shimmer-wrapper"></div>
            )}
            <ActionButton title="Download" type="primary" onClick={handleDownload} disabled={!qrCode} />
        </div>
    );
};

export default QRDownloadForm;