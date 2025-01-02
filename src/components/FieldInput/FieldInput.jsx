import React from "react";
import './FieldInput.css';

const TextField = ({
    id = "",
    placeholder = "Input",
    title = "Input",
    readonly = false,
    type = "text",
    value = "",
    onChange = () => {}
}) => {
    return (
        <div className="input-wrapper">
            <p className="title">{title}</p>
            <input
                id={id}
                className="input-value"
                type={type}
                placeholder={placeholder}
                value={readonly ? value : undefined}
                defaultValue={!readonly ? value : undefined}
                readOnly={readonly}
                onChange={onChange}
            />
        </div>
    );
};

const OptionField = ({
    id = "",
    title = "Input",
    readonly = false,
    value = "",
    options = [],
    onChange = () => {}
}) => {
    return (
        <div className="input-wrapper">
            <p className="title">{title}</p>
            <select
                id={id}
                className="input-value"
                value={readonly ? value : undefined}
                defaultValue={!readonly ? value : undefined}
                onChange={readonly ? undefined : onChange}
                disabled={readonly}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export { TextField, OptionField };
