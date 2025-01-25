import React, { useEffect, useState, useRef } from "react";
import './QRDownloadForm.css';
import ActionButton from "../../components/ActionButton/ActionButton";
import { getQRCode } from "../../api/controller/qrCodeController";

const QRDownloadForm = ({ onBlur, plantID = "2400000" }) => {
    const [downloadUrl, setDownloadUrl] = useState(null);
    const formRef = useRef(null);

    const fetchQRCode = async () => {
        try {
            const data = { generate: [plantID] };
            console.log(data);

            const response = await getQRCode(data);

            if (response) {
                const blob = new Blob([response], { type: 'image/jpg' });
                const url = window.URL.createObjectURL(blob);
                setDownloadUrl(url);
            }
        } catch (error) {
            console.error("Error fetching QR code:", error);
        }
    };

    useEffect(() => {
        if (plantID) {
            fetchQRCode();
        }// eslint-disable-next-line
    }, [plantID]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                handleBlur();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };// eslint-disable-next-line
    }, []);

    const cleanupDownloadUrl = () => {
        if (downloadUrl) {
            window.URL.revokeObjectURL(downloadUrl);
            setDownloadUrl(null);
        }
    };

    const handleDownload = () => {
        if (downloadUrl) {
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `QRCode_${plantID}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleBlur = () => {
        cleanupDownloadUrl();
        onBlur();
    };

    return (
        <div className="qrDownloadForm-wrapper" ref={formRef}>
            {downloadUrl ? (
                <img className="QrCode-image" src={downloadUrl} alt="QrCode" />
            ) : (
                <div className="shimmer shimmer-wrapper"></div>
            )}
            <ActionButton title="Download" type="primary" onClick={handleDownload} disabled={!downloadUrl} />
        </div>
    );
};

export default QRDownloadForm;
