import React, { useState, useEffect } from 'react';
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
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(value); // Update input value when prop changes
    }, [value]);

    const handleChange = (e) => {
        if (e && e.target) {
            const newValue = e.target.value;
            setInputValue(newValue); // Update local state
            if (onChange) onChange({ target: { value: newValue } }); // Pass formatted event
        }
    };

    return (
        <div className="input-wrapper">
            {title && <p className="title">{title}</p>}
            <input
                id={id}
                className="input-value"
                type={type}
                placeholder={placeholder}
                value={inputValue}
                readOnly={readonly}
                onChange={readonly ? undefined : handleChange}
            />
        </div>
    );
};

const NumericField = ({
    id = "",
    placeholder = "Input",
    title = "Input",
    readonly = false,
    suffix = "",
    value = "",
    onChange = () => {}
}) => {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(value); // Update input value when prop changes
    }, [value]);

    const handleChange = (e) => {
        if (e && e.target) {
            const newValue = e.target.value;
            if (!isNaN(newValue) || newValue === '') { // Check if the input is a number or empty
                setInputValue(newValue); // Update local state
                if (onChange) onChange({ target: { value: newValue } }); // Trigger onChange prop with formatted event
            }
        }
    };

    return (
        <div className="input-wrapper">
            {title && <p className="title">{title}</p>}
            <div className="input-suffix-wrapper">
                <input
                    id={id}
                    className="input-value no-spinner"
                    type="number"
                    placeholder={placeholder}
                    value={inputValue}
                    readOnly={readonly}
                    onChange={readonly ? undefined : handleChange}
                />
                {suffix && <span className="input-suffix">{suffix}</span>}
            </div>
        </div>
    );
};

const OptionField = ({
    id = "",
    title = null,
    readonly = false,
    value = "",
    optionItem = [],
    onChange = () => {}
}) => {
    const [selectedValue, setSelectedValue] = useState(value);
    const [options, setOptions] = useState(optionItem);

    useEffect(() => {
        setOptions(optionItem); // Update options when prop changes
    }, [optionItem]);

    useEffect(() => {
        setSelectedValue(value); // Update selected value when prop changes
    }, [value]);

    const handleChange = (e) => {
        if (e && e.target) {
            const newValue = e.target.value;
            setSelectedValue(newValue); // Update local state
            if (onChange) onChange({ target: { value: newValue } }); // Trigger onChange prop with formatted event
        }
    };

    return (
        <div className="input-wrapper">
            {title && <p className="title">{title}</p>}
            <select
                id={id}
                className="input-value"
                value={selectedValue}
                onChange={readonly ? undefined : handleChange}
                disabled={readonly}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </select>
        </div>
    );
};

const DateField = ({
    id = "",
    title = "Input",
    readonly = false,
    value = "",
    placeholder = "Select date and time",
    onChange = () => {}
}) => {
    const [dateTimeValue, setDateTimeValue] = useState('');

    useEffect(() => {
        if (value) {
            setDateTimeValue(value); // Expecting value in format yyyy-MM-ddTHH:mm:ss
        }
    }, [value]);

    const handleDateTimeChange = (e) => {
        if (e && e.target) {
            const newDateTime = e.target.value; // yyyy-MM-ddTHH:mm:ss
            setDateTimeValue(newDateTime);
            if (onChange) {
                onChange({ target: { value: newDateTime } });
            }
        }
    };

    return (
        <div className="input-wrapper">
            {title && <p className="title">{title}</p>}
            <input
                id={id}
                className="input-value"
                type="datetime-local"
                placeholder={placeholder}
                value={dateTimeValue}
                readOnly={readonly}
                onChange={readonly ? undefined : handleDateTimeChange}
            />
        </div>
    );
};

const AreaField = ({
    id = "",
    placeholder = "Enter text...",
    title = "Input",
    readonly = false,
    value = "",
    rows = 5, // Default number of rows
    onChange = () => {}
}) => {
    const [textValue, setTextValue] = useState(value);

    useEffect(() => {
        setTextValue(value); // Update text value when prop changes
    }, [value]);

    const handleChange = (e) => {
        if (e && e.target) {
            const newValue = e.target.value;
            setTextValue(newValue); // Update local state
            if (onChange) onChange({ target: { value: newValue } }); // Trigger onChange prop with formatted event
        }
    };

    return (
        <div className="areaField-wrapper">
            {title && <p className="title">{title}</p>}
            <textarea
                id={id}
                className="areaField-input-value"
                placeholder={placeholder}
                value={textValue}
                readOnly={readonly}
                rows={rows}
                onChange={readonly ? undefined : handleChange}
                style={{ resize: "none", textAlign: "justify" }} // Inline styles to prevent resizing and justify text
            />
        </div>
    );
};

export { TextField, NumericField, OptionField, DateField, AreaField };
