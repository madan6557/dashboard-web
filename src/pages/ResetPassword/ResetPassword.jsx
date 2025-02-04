import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./ResetPassword.css";
import { PasswordField } from "../../components/FieldInput/FieldInput";
import ActionButton from "../../components/ActionButton/ActionButton";
import { sendNewPassword } from "../../api/controller/userController";
import { TubeSpinner } from "../../components/Icons/Icon";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Tambahkan state loading
    const token = searchParams.get("token");

    useEffect(() => {
        if (!token) {
            navigate("/landing");
        }
    }, [token, navigate]);

    const handleResetPassword = async () => {
        setErrorMessage("");
        setSuccessMessage("");
        setIsLoading(true); // Mulai loading

        if (!password || password.length < 8) {
            setErrorMessage("Password must be at least 8 characters long.");
            setIsLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            setIsLoading(false);
            return;
        }
        if (!token) {
            setErrorMessage("Invalid or missing token.");
            setIsLoading(false);
            return;
        }

        const data = {
            token: token,
            newPassword: password
        };

        try {
            const response = await sendNewPassword(data);

            if (!response.ok) {
                throw new Error(response.message || "Password reset failed.");
            }

            setSuccessMessage("Password reset successful! You can now log in.");
            setIsSuccess(true);
            setIsReadOnly(true);
        } catch (error) {
            setErrorMessage(error.message || "An error occurred.");
        } finally {
            setIsLoading(false); // Selesai loading
        }
    };

    return (
        <div className="resetPassword-container">
            <div className="resetPassword-wrapper">
                <p className="resetPassword-title">Reset Password</p>

                <div className="resetPassword-field-container">
                    <PasswordField
                        title="New Password"
                        id="newPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        readOnly={isReadOnly}
                    />
                    <PasswordField
                        title="Confirm Password"
                        id="confirmationPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        readOnly={isReadOnly}
                    />
                </div>

                {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                {successMessage && <p className="successMessage">{successMessage}</p>}

                <div className="resetPassword-button">
                    {!isSuccess ? (
                        <ActionButton
                            icon={isLoading ? <TubeSpinner className="loading-white" /> : null}
                            title={isLoading ? "Processing..." : "Reset Password"}
                            type="primary"
                            onClick={handleResetPassword}
                            disabled={isLoading} // Nonaktifkan tombol saat loading
                        />
                    ) : (
                        <ActionButton
                            title="Home"
                            type="primary"
                            onClick={() => navigate("/landing")}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
