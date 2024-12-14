import React from "react";
import './FieldInput.css';

const FieldInput = ({
    placeholder = "Input",
    title = "Input",
    readonly = true,
    type = "text",
    value = null
}) => {
    return (
        <div className="input-wrapper">
            <p className="title">{title}</p>
            <input className="input-value" type={type} placeholder={placeholder}/>
        </div>
    );
}

export default FieldInput;