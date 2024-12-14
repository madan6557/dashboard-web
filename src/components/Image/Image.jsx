import React from "react";
import './Image.css';
import NoImage from "../../assets/images/No Image.jpg";
import {
    Marker,
} from "../Icons/Icon";

const Image = ({
    alt = "Plant Image",
    src = NoImage
}) => {
    return (
        <div className="image-wrapper">
            <div className="map-toggle">
                <Marker />
            </div>
            <img src={src} alt={alt} />
        </div>
    );
}

export default Image;