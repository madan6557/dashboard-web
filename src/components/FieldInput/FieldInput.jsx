import React, { useState, useEffect } from 'react';
import './FieldInput.css';

const TextField = ({
    id = "",
    placeholder = "Input",
    title = "Input",
    readonly = false,
    type = "text",
    value = "",
    onChange = () => { }
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
    onChange = () => { }
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

    // Initialize date and time values based on the input value
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

    // Handle date change
    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setDateValue(newDate);
        onChange(`${formatDateToDisplay(newDate)} ${timeValue}`); // Send value as dd-MM-yyyy HH:mm:ss
    };

    // Handle time change
    const handleTimeChange = (e) => {
        const newTime = e.target.value;
        setTimeValue(newTime);
        onChange(`${formatDateToDisplay(dateValue)} ${newTime}`); // Send value with time in HH:mm:ss
    };

    // Helper function to format date for display (dd-MM-yyyy)
    const formatDateToDisplay = (date) => {
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="input-wrapper">
            <p className="title">{title}</p>
            <div className="date-time-container">
                <input
                    id={`${id}-date`}
                    className="input-value"
                    type="date"
                    placeholder={placeholder}
                    value={dateValue} // In yyyy-MM-dd format
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

export { TextField, OptionField, DateField };
