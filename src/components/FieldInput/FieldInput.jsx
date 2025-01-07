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
    placeholder = "Date",
    onChange = () => {}
}) => {
    const [dateValue, setDateValue] = useState('');
    const [timeValue, setTimeValue] = useState('');

    useEffect(() => {
        if (value) {
            if (value.includes(' ')) {
                const [date, time] = value.split(' ');
                setDateValue(date); // yyyy-MM-dd
                setTimeValue(time); // HH:mm:ss
            } else {
                setDateValue(value); // yyyy-MM-dd
            }
        }
    }, [value]);

    const handleDateChange = (e) => {
        if (e && e.target) {
            const newDate = e.target.value; // yyyy-MM-dd
            setDateValue(newDate);
            // Make sure newDate and timeValue are valid before calling onChange
            if (onChange && newDate && timeValue !== undefined) {
                onChange({ target: { value: `${newDate} ${timeValue}`.trim() } });
            }
        }
    };

    const handleTimeChange = (e) => {
        if (e && e.target) {
            const newTime = e.target.value; // HH:mm:ss
            setTimeValue(newTime);
            // Make sure newTime and dateValue are valid before calling onChange
            if (onChange && newTime && dateValue !== undefined) {
                onChange({ target: { value: `${dateValue} ${newTime}`.trim() } });
            }
        }
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
