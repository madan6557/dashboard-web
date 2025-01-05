import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./LandingPage.css";
import { TextField } from "../../components/FieldInput/FieldInput";
import ActionButton from "../../components/ActionButton/ActionButton";
import { login } from "../../api/handlers/authHandler";

const LandingPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLoginAuthentication = async () => {
        const credentials = { email, password };

        // Validasi Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }
    
        // Validasi Password
        if (password.length < 8) {
            setErrorMessage("Password must be at least 8 characters long.");
            return;
        }
    
        try {
            const response = await login(credentials); // Proses autentikasi dilakukan di sini
            console.log(response);
            navigate('/dashboard');
        } catch (error) {
            setErrorMessage(error.message || "Login failed");
        }
    };    
    
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleLoginAuthentication();
        }
    };

    return (
        <div className="landing-container" onKeyDown={handleKeyPress} >
            <div className="login-form">
                <div className="login-input-form">
                    <TextField
                        title="Email"
                        type="email"
                        placeholder="Email"
                        readonly={false}
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        title="Password"
                        type="password"
                        placeholder="Password"
                        readonly={false}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                </div>
                <div className="login-button-form">
                    <ActionButton
                        title="Login"
                        type="primary"
                        onClick={handleLoginAuthentication}
                    />
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
