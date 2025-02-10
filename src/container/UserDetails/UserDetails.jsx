import React, { useState, useEffect } from "react";
import './UserDetails.css';
import { TextField } from "../../components/FieldInput/FieldInput";
import { Cross } from "../../components/Icons/Icon";
import ActionButton from "../../components/ActionButton/ActionButton";
import { useConfirmation } from "../../context/ActionConfirmationContext";
import { sendResetPasswordRequest } from "../../api/controller/userController";

const UserDetails = ({ onClose, onAction, data }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("user");
    const [accountStatus, setAccountStatus] = useState("user");
    const requestConfirmation = useConfirmation();

     const requestResetPassword = async () => {
            const data = {
                email: email
            };
    
            try {
                const response = await sendResetPasswordRequest(data);
                onAction(`Reset password request sent to ${email} successfully`, 'success');
                return response;
            } catch (error) {
                onAction(error.message || "Failed to send request", 'success');
            }
        };

    useEffect(() => {
        setEmail(data.email);
        setUsername(data.username);
        setRole(data.role);
        setAccountStatus(data.status);
    }, [data]);

    const handleResetPassword = () => {
        requestConfirmation(
            "Are you sure you want to reset the password?", "confirm",
            async () => {
                try {
                    await requestResetPassword();
                } catch (error) {
                    console.error("Error saving data:", error);
                    onAction(`Error sending request`, 'failed');
                }
            }
        );
    };

    const handleUnavailableAction = () => {
        onAction("This feature not available yet!", "info");
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
                    title="Reset Password"
                    type="primary"
                    onClick={handleResetPassword}
                />
            </div>
        </div>
    );
};

export default UserDetails;