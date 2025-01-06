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
        const newValue = e.target.value;
        setInputValue(newValue); // Update local state
        if (onChange) onChange(newValue); // Trigger onChange prop
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
        const newValue = e.target.value;
        if (!isNaN(newValue) || newValue === '') { // Check if the input is a number or empty
            setInputValue(newValue); // Update local state
            if (onChange) onChange(newValue); // Trigger onChange prop
        }
    };

    return (
        <div className="input-wrapper">
            {title && <p className="title">{title}</p>}
            <div className="input-suffix-wrapper">
                <input
                    id={id}
                    className="input-value"
                    type="number" // Set input type to number
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
        const newValue = e.target.value;
        setSelectedValue(newValue); // Update local state
        if (onChange) onChange(newValue); // Trigger onChange prop
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
    placeholder = "Date",
    onChange = () => {}
}) => {
    const [dateValue, setDateValue] = useState('');
    const [timeValue, setTimeValue] = useState('');

    useEffect(() => {
        if (value.includes(' ')) {
            const [date, time] = value.split(' ');
            const [year, month, day] = date.split('-');
            const [hour, minute, second] = time.split(':');
            setDateValue(`${year}-${month}-${day}`); // yyyy-MM-dd
            setTimeValue(`${hour}:${minute}:${second}`); // HH:mm:ss
        } else {
            const [year, month, day] = value.split('-');
            setDateValue(`${year}-${month}-${day}`); // yyyy-MM-dd
        }
    }, [value]);

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setDateValue(newDate);
        onChange(`${formatDateToDisplay(newDate)} ${timeValue}`);
    };

    const handleTimeChange = (e) => {
        const newTime = e.target.value;
        setTimeValue(newTime);
        onChange(`${formatDateToDisplay(dateValue)} ${newTime}`);
    };

    const formatDateToDisplay = (date) => {
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="input-wrapper">
            {title && <p className="title">{title}</p>}
            <div className="date-time-container">
                <input
                    id={`${id}-date`}
                    className="input-value"
                    type="date"
                    placeholder={placeholder}
                    value={dateValue}
                    readOnly={readonly}
                    onChange={readonly ? undefined : handleDateChange}
                />
                {timeValue && (
                    <input
                        id={`${id}-time`}
                        className="input-value"
                        type="time"
                        value={timeValue}
                        readOnly={readonly}
                        onChange={readonly ? undefined : handleTimeChange}
                    />
                )}
            </div>
        </div>
    );
};

export { TextField, NumericField, OptionField, DateField };
