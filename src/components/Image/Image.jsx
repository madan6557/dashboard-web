import React, { useState, useEffect } from "react";
import './Image.css';
import NoImage from "../../assets/images//No Image.jpg";
import MapViewport from "../../components/MapViewport/MapViewport";
import {
    MarkerOutline,
    MarkerSolid,
    PencileAltOutline,
    PhotographOutline,
    PhotographSolid
} from "../Icons/Icon";
import ActionButton from "../ActionButton/ActionButton";
import { resizeImage } from "../../utils/resizeImage";

const Image = ({
    alt = "Plant Image",
    src = NoImage, // Use NoImage as default
    imageEditable = false,
    onImageUpload,
    onAction,
    hasMap = true,
    onSelected
}) => {
    const [selected, setSelected] = useState("photograph");
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [tempSrc, setTempSrc] = useState(src);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setTempSrc(src); // Update tempSrc based on the prop src
    }, [src]);

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            try {
                setErrorMessage(''); // Clear previous error message

                // Resize the image
                const resizedBlob = await resizeImage(selectedFile);

                // Check size after resizing
                if (resizedBlob.size > 2 * 1024 * 1024) { // 2MB in bytes
                    setErrorMessage('Image size too large after resizing. Max 2MB.');
                    return;
                }

                // Create a new File object to retain original filename
                const resizedFile = new File([resizedBlob], selectedFile.name, { type: resizedBlob.type });

                // Set the resized file and temp source
                setUploadedFile(resizedFile);
                const fileURL = URL.createObjectURL(resizedFile);
                setTempSrc(fileURL);
            } catch (error) {
                console.error('Error processing image:', error);
                onAction('Error processing image', 'failed');
            }
        }
    };


    const handleUpload = () => {
        if (uploadedFile && onImageUpload) {
            onImageUpload(uploadedFile);
            setUploadedFile(null);
            setShowUploadForm(false);
        }
    };

    const handleCancel = () => {
        setTempSrc(src);
        setUploadedFile(null);
        setErrorMessage(null);
        setShowUploadForm(false);
    };

    return (
        <div className="image-wrapper">
            {hasMap && (
                <div className="viewport-toggle">
                    <div
                        className={`viewport-button ${selected === "photograph" ? "selected" : ""}`}
                        onClick={() => setSelected("photograph")}
                    >
                        {selected === "photograph" ? <PhotographSolid /> : <PhotographOutline />}
                    </div>
                    <div
                        className={`viewport-button ${selected === "marker" ? "selected" : ""}`}
                        onClick={() => setSelected("marker")}
                    >
                        {selected === "marker" ? <MarkerSolid /> : <MarkerOutline />}
                    </div>
                </div>
            )}

            {selected === "photograph" && imageEditable && (
                <div
                    className="editImage-button"
                    onClick={() => setShowUploadForm(!showUploadForm)}
                >
                    <PencileAltOutline />
                </div>
            )}

            {showUploadForm && (
                <div className="imageUpload-form">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <div className="imageUpload-form-button">
                        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                        <ActionButton title="Cancel" type="ghost" onClick={handleCancel} />
                        <ActionButton title="Upload" type="primary" disabled={!uploadedFile} onClick={handleUpload} />
                    </div>
                </div>
            )}

            {selected === "photograph" ? (
                <img src={tempSrc} alt={alt} />
            ) : (
                <div className="map-viewport">
                    <MapViewport location={onSelected?.location} focus={onSelected} />
                </div>
            )}

        </div>
    );
};

export default Image;
