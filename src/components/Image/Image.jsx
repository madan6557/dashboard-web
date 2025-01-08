import React, { useState } from "react";
import './Image.css';
import NoImage from "../../assets/images/sample.jpg";
import Map from "../../pages/Map/Map";
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
    src = NoImage,
    imageEditable = false,
    onImageUpload,
    onAction
}) => {
    const [selected, setSelected] = useState("photograph"); // State untuk menyimpan pilihan
    const [showUploadForm, setShowUploadForm] = useState(false); // State untuk mengontrol visibilitas form upload gambar
    const [tempSrc, setTempSrc] = useState(src); // State untuk menyimpan src sementara
    const [file, setFile] = useState(null); // State untuk menyimpan file yang diunggah

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            try {
                const resizedBlob = await resizeImage(selectedFile);
                setFile(resizedBlob); // Menyimpan file yang di-resize
                const fileURL = URL.createObjectURL(resizedBlob);
                setTempSrc(fileURL); // Menampilkan gambar sementara
            } catch (error) {
                console.error('Error processing image:', error);
                onAction(`Error processing image`, 'failed');
            }
        }
    };

    const handleUpload = () => {
        if (file && onImageUpload) {
            onImageUpload(file); // Mengirimkan file ke parent
            setFile(null);
            setShowUploadForm(false);
        }
    };

    const handleCancel = () => {
        setTempSrc(src); // Mengembalikan ke gambar sebelumnya
        setFile(null);
        setShowUploadForm(false);
    };

    return (
        <div className="image-wrapper">
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
                        <ActionButton title="Cancel" type="ghost" onClick={handleCancel} />
                        <ActionButton title="Upload" type="primary" disabled={!file} onClick={handleUpload} />
                    </div>

                </div>
            )}

            {selected === "photograph" ? <img src={tempSrc} alt={alt} /> : <Map />}
        </div>
    );
};

export default Image;
