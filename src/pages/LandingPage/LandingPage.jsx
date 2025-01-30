import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import { EmailField, PasswordField } from "../../components/FieldInput/FieldInput";
import BrandLogo from "../../assets/images/logia.svg";
import { login, logout } from "../../api/handlers/authHandler";
import FloorButton from "../../components/FloorButton/FloorButton";
import ActionButton from "../../components/ActionButton/ActionButton";
import { Cross } from "../../components/Icons/Icon";

const LandingPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedTab, setSelectedTab] = useState("Home"); // Tab aktif
    const [isLoginVisible, setIsLoginVisible] = useState(false); // Menampilkan form login
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Status login
    const [redirectToDashboard, setRedirectToDashboard] = useState(false); // Apakah harus langsung ke dashboard?
    const navigate = useNavigate();

    useEffect(() => {
        // Cek apakah user sudah login dari localStorage
        const storedLoginStatus = localStorage.getItem("isLoggedIn");
        if (storedLoginStatus === "true") {
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        setErrorMessage(""); // Menghapus pesan error saat email atau password berubah
    }, [email, password]);

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
            const response = await login(credentials); // Proses autentikasi
            console.log(response);
            setIsLoggedIn(true);
            localStorage.setItem("isLoggedIn", "true"); // Simpan status login
            setIsLoginVisible(false); // Sembunyikan form login setelah berhasil login
    
            // Jika login dilakukan dari "Go to Dashboard", arahkan langsung ke dashboard
            if (redirectToDashboard) {
                navigate("/dashboard");
            }
        } catch (error) {
            // Periksa apakah ada response dari server
            if (error.response) {
                if (error.response.status === 401) {
                    setErrorMessage("Incorrect email or password.");
                } else {
                    setErrorMessage(error.response.data.message || "Login failed. Please try again.");
                }
            } else {
                setErrorMessage("Login failed. Please try again.");
            }
        }
    };

    const handleLogout = () => {
        logout(); // Panggil fungsi logout
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn"); // Hapus status login
    };

    const handleGoToDashboard = () => {
        if (isLoggedIn) {
            navigate("/dashboard"); // Jika sudah login, langsung masuk
        } else {
            setRedirectToDashboard(true); // Tandai bahwa login harus langsung ke dashboard
            setIsLoginVisible(true); // Tampilkan form login
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleLoginAuthentication();
        }
    };

    return (
        <div className="landing-container" onKeyDown={handleKeyPress}>
            {/* HEADER */}
            <div className="landingPage-header">
                <div className="landingPage-brand">
                    <img src={BrandLogo} alt="BrandLogo" />
                    <p>L O G I A</p>
                </div>

                {/* NAVIGATION */}
                <div className="landingPage-navigation-button">
                    <FloorButton
                        title="Home"
                        isSelected={selectedTab === "Home"}
                        onClick={() => setSelectedTab("Home")}
                    />
                    <FloorButton
                        title="About"
                        isSelected={selectedTab === "About"}
                        onClick={() => setSelectedTab("About")}
                    />
                </div>

                {/* LOGIN / LOGOUT BUTTON */}
                <div className="landingPage-log-button">
                    {isLoggedIn ? (
                        <ActionButton
                            title="Log Out"
                            type="danger"
                            onClick={handleLogout}
                        />
                    ) : (
                        <ActionButton
                            title="Log In"
                            type="primary"
                            onClick={() => {
                                setRedirectToDashboard(false); // Tidak langsung ke dashboard saat login
                                setIsLoginVisible(true);
                            }}
                        />
                    )}
                    {/* FORM LOGIN */}
                    {isLoginVisible && !isLoggedIn && (
                        <div className="login-form">
                            <div className="close-button" onClick={() => setIsLoginVisible(false)}>
                                <Cross />
                            </div>
                            <div className="login-input-form">
                                <EmailField
                                    title="Email"
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <PasswordField
                                    title="Password"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                            </div>
                            <div className="login-button-form">
                                <ActionButton
                                    title="Log In"
                                    type="primary"
                                    onClick={handleLoginAuthentication}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* CONTENT */}
            <div className="landingPage-content">
                {selectedTab === "Home" && (
                    <div className="home-container">
                        <h1>Welcome to Logia</h1>
                        <div className="ini-test-saje">
                            <ActionButton
                                title="Download App"
                                type="primary"
                                disabled={true}
                            />
                            <ActionButton
                                title="Go to Dashboard"
                                type="primary"
                                onClick={handleGoToDashboard}
                            />
                        </div>
                    </div>
                )}
                {selectedTab === "About" && <h1>About Logia</h1>}
            </div>

            {/* FOOTER */}
            <div className="landingPage-footer">
                <p>&copy; {new Date().getFullYear()} Logia. All rights reserved.</p>
            </div>
        </div>
    );
};

export default LandingPage;
