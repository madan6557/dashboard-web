import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import { EmailField, PasswordField } from "../../components/FieldInput/FieldInput";
import BrandLogo from "../../assets/images/logia.svg";
import { login, logout } from "../../api/handlers/authHandler";
import FloorButton from "../../components/FloorButton/FloorButton";
import ActionButton from "../../components/ActionButton/ActionButton";
import { Cross, TubeSpinner } from "../../components/Icons/Icon";

const LandingPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedTab, setSelectedTab] = useState("Home"); // Tab aktif
    const [isLoginVisible, setIsLoginVisible] = useState(false); // Menampilkan form login
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Status login
    const [redirectToDashboard, setRedirectToDashboard] = useState(false); // Apakah harus langsung ke dashboard?
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const navigate = useNavigate();

    // Cek token saat pertama kali halaman dimuat
    const checkAuthStatus = () => {
        const token = localStorage.getItem("authToken");
        setIsLoggedIn(!!token); // Jika token ada, login; jika tidak, logout
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    useEffect(() => {
        setErrorMessage(""); // Menghapus pesan error saat email atau password berubah
    }, [email, password]);

    const handleLoginAuthentication = async () => {
        if (isLoggingIn) return; // Hindari login ganda saat sedang memproses
    
        setIsLoggingIn(true); // Mulai proses login
        setErrorMessage(""); // Reset pesan error sebelum mencoba login
    
        const credentials = { email, password };
    
        // Validasi Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("Please enter a valid email address.");
            setIsLoggingIn(false);
            return;
        }
    
        // Validasi Password
        if (password.length < 8) {
            setErrorMessage("Password must be at least 8 characters long.");
            setIsLoggingIn(false);
            return;
        }
    
        try {
            const response = await login(credentials); // Proses autentikasi
            console.log(response);
            checkAuthStatus(); // Update status login
            setIsLoginVisible(false); // Sembunyikan form login setelah berhasil
            setRedirectToDashboard(false); // Reset redirect
    
            // Jika login dilakukan dari "Go to Dashboard", arahkan ke dashboard
            if (redirectToDashboard) {
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setErrorMessage("Incorrect email or password.");
                } else {
                    setErrorMessage(error.response.data.message || "Login failed. Please try again.");
                }
            } else {
                setErrorMessage("Login failed. Please try again.");
            }
        } finally {
            setIsLoggingIn(false); // Set kembali agar tombol login bisa diklik setelah selesai
        }
    };

    const handleLogout = () => {
        logout(); // Panggil fungsi logout
        localStorage.removeItem("authToken"); // Hapus token
        checkAuthStatus(); // Perbarui status login
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
                        <ActionButton title="Log Out" type="danger" onClick={handleLogout} />
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
                                    icon={isLoggingIn ? <TubeSpinner className="loading-white" /> : null}
                                    title={isLoggingIn ? "" : "Log In"}
                                    type="primary"
                                    onClick={handleLoginAuthentication}
                                    disabled={isLoggingIn}
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
                            <ActionButton title="Download App" type="primary" disabled={true} />
                            <ActionButton title="Go to Dashboard" type="primary" onClick={handleGoToDashboard} />
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
