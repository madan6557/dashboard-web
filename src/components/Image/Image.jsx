import React, { useState } from "react";
import './Image.css';
import NoImage from "../../assets/images/sample.jpg";
import Map from "../../pages/Map/Map"
import {
    MarkerOutline,
    MarkerSolid,
    PencileAltOutline,
    PhotographOutline,
    PhotographSolid
} from "../Icons/Icon";

const Image = ({
    alt = "Plant Image",
    src = NoImage,
    imageEditable = false,
}) => {
    const [selected, setSelected] = useState("photograph"); // State untuk menyimpan pilihan

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
                <div className="editImage-button">
                    <PencileAltOutline />
                </div>
            )}

            {selected === "photograph" ? <img src={src} alt={alt} /> : <Map />}

        </div>
    );
}

export default Image;
