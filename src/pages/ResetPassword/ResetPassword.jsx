import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./ResetPassword.css";
import { PasswordField } from "../../components/FieldInput/FieldInput";
import ActionButton from "../../components/ActionButton/ActionButton";
import { sendNewPassword } from "../../api/controller/userController";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false); // Status reset berhasil
    const [isReadOnly, setIsReadOnly] = useState(false); // Untuk mengontrol readonly input
    const token = searchParams.get("token"); // Ambil token dari URL

    // **🔍 CEK TOKEN SAAT PAGE LOAD**
    useEffect(() => {
        console.log(token);
        if (!token) {
            navigate("/landing"); // Redirect ke landing jika token tidak ada
        }
    }, [token, navigate]);

    const handleResetPassword = async () => {
        setErrorMessage("");
        setSuccessMessage("");

        // **VALIDASI PASSWORD**
        if (!password || password.length < 8) {
            setErrorMessage("Password must be at least 8 characters long.");
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }
        if (!token) {
            setErrorMessage("Invalid or missing token.");
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

            // Jika sukses
            setSuccessMessage("Password reset successful! You can now log in.");
            setIsSuccess(true);
            setIsReadOnly(true); // Ubah input menjadi readonly
        } catch (error) {
            setErrorMessage(error.message || "An error occurred.");
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
                        readonly={isReadOnly}
                    />
                    <PasswordField
                        title="Confirm Password"
                        id="confirmationPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        readonly={isReadOnly}
                    />
                </div>

                {/* MENAMPILKAN PESAN ERROR ATAU SUKSES */}
                {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                {successMessage && <p className="successMessage">{successMessage}</p>}

                <div className="resetPassword-button">
                    {/* Tombol Reset HANYA muncul jika reset BELUM sukses */}
                    {!isSuccess && (
                        <ActionButton
                            title="Reset"
                            type="primary"
                            onClick={handleResetPassword}
                        />
                    )}

                    {/* Tombol Home hanya muncul jika reset berhasil */}
                    {isSuccess && (
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
