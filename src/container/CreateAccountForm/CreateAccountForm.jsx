import React, { useState } from "react";
import './CreateAccountForm.css';
import { UsernameField, PasswordField, EmailField, OptionField } from "../../components/FieldInput/FieldInput";
import { Cross } from "../../components/Icons/Icon";
import ActionButton from "../../components/ActionButton/ActionButton";
import { useConfirmation } from "../../context/ActionConfirmationContext";

const CreateAccountForm = ({ onClose, onCreate }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [roleOption] = useState([
        { text: "User", value: "user" },
        { text: "Admin", value: "admin" },
        { text: "Viewer", value: "viewer" }
    ]);

    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isRoleValid, setIsRoleValid] = useState(true);
    const requestConfirmation = useConfirmation();

    const isFormValid = isEmailValid && isPasswordValid && isUsernameValid && isRoleValid;

    const createAccount = async () => {
        requestConfirmation(
            "Are you sure you want to create a new account?", "confirm",
            async () => {
                const data = {
                    email: email,
                    username: username,
                    password: password,
                    role: role
                }
                onCreate(data);
            }
        );
    };

    return (
        <div className="createAccountForm-wrapper">
            <div className="createAccountForm-header-wrapper">
                <p className="form-title">Create Account</p>
                <div className="createAccountForm-header-button">
                    <div className="close-button" onClick={onClose}>
                        <Cross />
                    </div>
                </div>
            </div>
            <div className="createAccountForm-form-wrapper">
                <EmailField
                    id="email"
                    title="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onValidationChange={setIsEmailValid}
                    placeholder="Enter your email"
                />
                <UsernameField
                    id="username"
                    title="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onValidationChange={setIsUsernameValid}
                    placeholder="Enter your username"
                />
                <PasswordField
                    id="password"
                    title="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onValidationChange={setIsPasswordValid}
                    placeholder="Enter your password"
                />
                <OptionField
                    id="Role"
                    title="Role"
                    value={role}
                    optionItem={roleOption}
                    onChange={(e) => {
                        const selectedRole = e.target.value;
                        setRole(selectedRole);
                        setIsRoleValid(selectedRole.trim() !== "");
                    }}
                />
            </div>
            <div className="createAccountForm-button-container">
                <ActionButton
                    title="Create"
                    type="confirm"
                    disabled={!isFormValid} // Disable button if form is invalid
                    onClick={createAccount}
                />
            </div>
        </div>
    );
};

export default CreateAccountForm;