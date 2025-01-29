import React, { useState, useEffect } from 'react';
import './FieldInput.css';
import { EyeOutline, EyeSolid } from '../Icons/Icon';

const TextField = ({
    id = "",
    placeholder = "Input",
    title = "Input",
    readonly = false,
    type = "text",
    value = "",
    onChange = () => { }
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
    onChange = () => { }
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
    onChange = () => { }
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
    onChange = () => { }
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
    onChange = () => { }
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

const PasswordField = ({
    id = "",
    placeholder = "Enter password",
    title = "Password",
    readonly = false,
    value = "",
    onChange = () => { },
    onValidationChange = () => { } // Callback untuk validasi password
}) => {
    const [password, setPassword] = useState(value);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // 🔥 State untuk toggle password visibility

    useEffect(() => {
        setPassword(value); // Update password value ketika prop berubah
    }, [value]);

    const handleChange = (e) => {
        if (e && e.target) {
            const newPassword = e.target.value;
            setPassword(newPassword); // Update state lokal

            // Validasi panjang password
            if (newPassword.length >= 8) {
                setError(""); // Hilangkan error jika valid
                onValidationChange(true); // Beritahu parent bahwa input valid
            } else {
                setError("At least 8 characters."); // Tampilkan error jika tidak valid
                onValidationChange(false); // Beritahu parent bahwa input tidak valid
            }

            if (onChange) {
                onChange({ target: { value: newPassword } }); // Trigger onChange dengan format event yang benar
            }
        }
    };

    return (
        <div className="input-wrapper">
            {title && <p className="title">{title}</p>}
            <div className="password-field-container">
                <input
                    id={id}
                    className="input-value"
                    type={showPassword ? "text" : "password"} // 🔥 Toggle antara password & text
                    placeholder={placeholder}
                    value={password}
                    readOnly={readonly}
                    onChange={readonly ? undefined : handleChange}
                />
                {/* 🔥 Tombol untuk toggle password visibility */}
                {!readonly && (
                    <div
                        className="password-toggle-btn"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeSolid /> : <EyeOutline />}
                    </div>
                )}
            </div>
            {error && <p className="error-message">{error}</p>} {/* 🔥 Tampilkan error jika ada */}
        </div>
    );
};

const EmailField = ({
    id = "",
    placeholder = "Enter email",
    title = "Email",
    readonly = false,
    value = "",
    onChange = () => { },
    onValidationChange = () => { } // New callback for validation status
}) => {
    const [email, setEmail] = useState(value);
    const [error, setError] = useState("");

    useEffect(() => {
        setEmail(value); // Update email value when prop changes
    }, [value]);

    const handleChange = (e) => {
        if (e && e.target) {
            const newEmail = e.target.value;
            setEmail(newEmail); // Update local state

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
            if (emailRegex.test(newEmail) || newEmail === "") {
                setError(""); // Clear error if valid
                onValidationChange(true); // Notify parent that input is valid
            } else {
                setError("Invalid email format."); // Set error message
                onValidationChange(false); // Notify parent that input is invalid
            }

            if (onChange) {
                onChange({ target: { value: newEmail } }); // Trigger onChange prop with formatted event
            }
        }
    };

    return (
        <div className="input-wrapper">
            {title && <p className="title">{title}</p>}
            <input
                id={id}
                className="input-value"
                type="email"
                placeholder={placeholder}
                value={email}
                readOnly={readonly}
                onChange={readonly ? undefined : handleChange}
            />
            {error && <p className="error-message">{error}</p>} {/* Display error if any */}
        </div>
    );
};

const UsernameField = ({
    id = "",
    placeholder = "Enter username",
    title = "Username",
    readonly = false,
    value = "",
    onChange = () => { },
    onValidationChange = () => { } // Callback for validation status
}) => {
    const [username, setUsername] = useState(value);
    const [error, setError] = useState("");

    useEffect(() => {
        setUsername(value); // Update username value when prop changes
    }, [value]);

    const handleChange = (e) => {
        if (e && e.target) {
            const newUsername = e.target.value.replace(/\s/g, ""); // Remove spaces
            setUsername(newUsername); // Update local state

            // Validate username length
            if (newUsername.length >= 3 && newUsername.length <= 15) {
                setError(""); // Clear error if valid
                onValidationChange(true); // Notify parent that input is valid
            } else if (newUsername.length < 3) {
                setError("At least 3 characters long."); // Set error for short username
                onValidationChange(false); // Notify parent that input is invalid
            } else if (newUsername.length > 15) {
                setError("Must not exceed 15 characters."); // Set error for long username
                onValidationChange(false); // Notify parent that input is invalid
            }

            if (onChange) {
                onChange({ target: { value: newUsername } }); // Trigger onChange prop with formatted event
            }
        }
    };

    return (
        <div className="input-wrapper">
            {title && <p className="title">{title}</p>}
            <input
                id={id}
                className="input-value"
                type="text"
                placeholder={placeholder}
                value={username}
                readOnly={readonly}
                onChange={readonly ? undefined : handleChange}
            />
            {error && <p className="error-message">{error}</p>} {/* Display error if any */}
        </div>
    );
};

export { TextField, NumericField, OptionField, DateField, AreaField, PasswordField, EmailField, UsernameField };

