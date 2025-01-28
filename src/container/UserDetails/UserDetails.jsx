import React, { useState, useEffect } from "react";
import './UserDetails.css';
import { TextField } from "../../components/FieldInput/FieldInput";
import { Cross } from "../../components/Icons/Icon";
import ActionButton from "../../components/ActionButton/ActionButton";
// import { useConfirmation } from "../../context/ActionConfirmationContext";

const UserDetails = ({ onClose, onAction, data }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("user");
    const [accountStatus, setAccountStatus] = useState("user");

    useEffect(() => {
        setEmail(data.email);
        setUsername(data.username);
        setRole(data.role);
        setAccountStatus(data.status);
    }, [data]);

    const handleUnavailableAction = () => {
       onAction("This feature not available yet!","info");
    };

    return (
        <div className="userDetails-wrapper">
            <div className="userDetails-header-wrapper">
                <p className="form-title">Account</p>
                <div className="userDetails-header-button">
                    <div className="close-button" onClick={onClose}>
                        <Cross />
                    </div>
                </div>
            </div>
            <div className="userDetails-form-wrapper">
                <TextField
                    title="Email"
                    value={email}
                    readonly={true}
                />
                <TextField
                    title="Username"
                    value={username}
                    readonly={true}
                />
                <TextField
                    title="Role"
                    value={role}
                    readonly={true}
                />
                <TextField
                    title="Status"
                    value={accountStatus}
                    readonly={true}
                />
            </div>
            <div className="userDetails-button-container">
                <ActionButton
                    title="Disable"
                    type="ghost"
                    onClick={handleUnavailableAction}
                />
                <ActionButton
                    title="ResetPassword"
                    type="primary"
                    onClick={handleUnavailableAction}
                />
            </div>
        </div>
    );
};

export default UserDetails;