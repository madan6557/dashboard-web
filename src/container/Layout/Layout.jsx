import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useNotification } from "../../context/NotificationContext";
import Notification from "../../components/Notification/Notification";
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "../Dashboard/Dashboard";
import Map from "../Map/Map";
import Overview from "../Activity/Overview/Overview";
import Analytics from "../Activity/Analytics/Analytics";
import Evaluation from "../Activity/Evaluation/Evaluation";
import "./Layout.css";
import {
    NoIcon,
    List,
    VerticalDots,
    BellOutline,
    BellSolid,
} from '../../components/Icons/Icon';

const Layout = () => {
    const { notifications, addNotification, removeNotification } = useNotification();
    const [sidebarToggle, setSidebarToggle] = useState(true);
    const [selectedComponent, setSelectedComponent] = useState("Dashboard");
    const [tooltipText, setTooltipText] = useState("");
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [notificationUpdateCount, setNotificationUpdateCount] = useState(0);

    // Buat ref untuk setiap notifikasi
    const notificationRefs = useRef({});

    // Inisialisasi ref untuk setiap notifikasi
    notifications.forEach((notif) => {
        if (!notificationRefs.current[notif.id]) {
            notificationRefs.current[notif.id] = React.createRef();
        }
    });

    // Tambahkan useEffect untuk memonitor perubahan jumlah notifikasi
    useEffect(() => {
        // Menutup dropdown jika tidak ada notifikasi
        if (notifications.length === 0) {
            setIsDropdownOpen(false);
        }
    }, [notifications.length]);  // Akan dijalankan setiap kali jumlah notifikasi berubah

    // Method untuk toggle sidebar
    const handleSidebarToggle = () => {
        setSidebarToggle(!sidebarToggle);
    };

    // Method to update selected component in the state
    const handleMenuSelect = (selectedTitle) => {
        setSelectedComponent(selectedTitle);
    };

    const handleMenuHover = (isMinimized, title, element) => {
        if (isMinimized) {
            // Get the bounding rectangle of the menu button
            const rect = element.getBoundingClientRect();
            setTooltipText(title);
            setTooltipPosition({
                top: rect.top + window.scrollY - 15,  // Position it vertically aligned with the button
                left: rect.left + rect.width - 10,  // Position it to the right of the button with a 10px gap
            });
        }
    };

    const handleMenuLeave = () => {
        setTooltipText(""); // Clear tooltip when mouse leaves
    };

    // Fungsi untuk menghandle tombol bell
    const handleBellClick = () => {
        if (notifications.length > 0) {
            setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown
            setNotificationUpdateCount(0); // Reset update count ketika dropdown dibuka
        }
    };

    const handleSendNotification = () => {
        // Generate a unique number for each notification
        const notificationCount = notifications.length + 1;  // Incremental numbering

        // Define the types (you can change this logic as needed)
        const types = ["info", "error", "caution", "success"];
        const randomType = types[notificationCount % types.length];  // Cycle through types

        // Add a notification with a unique number and a dynamic type
        addNotification(`Notification #${notificationCount}: This is a test notification!`, randomType);
        setNotificationUpdateCount((prevCount) => prevCount + 1);
    };

    const handleCloseNotification = (id) => {
        removeNotification(id);
    };

    return (
        <Router>
            <div className={`page-container ${sidebarToggle ? 'sidebar-visible' : 'sidebar-hidden'}`}>

                {/* Tooltip Positioning */}
                {tooltipText && (
                    <div
                        className="tooltip"
                        style={{
                            top: tooltipPosition.top,
                            left: tooltipPosition.left,
                        }}
                    >
                        <p>{tooltipText}</p>
                    </div>
                )}

                <div className="popup-notification">
                    <TransitionGroup component={null}>
                        {!isDropdownOpen && notificationUpdateCount > 0 && notifications.slice(
                            notificationUpdateCount === 1 ? -1 : -2
                        ).map((notif, index, array) => {
                            const isLast = index === array.length - 1;
                            const isMiddle = index === array.length - 2;

                            return (
                                <CSSTransition
                                    key={notif.id}
                                    timeout={300}
                                    classNames={{
                                        enter: "notification-enter",
                                        exit: "notification-exit",
                                    }}
                                    nodeRef={notificationRefs.current[notif.id]} // Berikan nodeRef ke CSSTransition
                                >
                                    <div
                                        ref={notificationRefs.current[notif.id]} // Tambahkan ref di elemen DOM
                                        className={`${isMiddle ? "notification-slide-up" : ""} ${isLast ? "notification-enter" : ""}`}
                                    >
                                        <Notification
                                            id={notif.id}
                                            message={notif.message}
                                            type={notif.type}
                                            time={notif.time}
                                            isPopup={true}
                                            onClose={() => handleCloseNotification(notif.id, true)}
                                        />
                                    </div>
                                </CSSTransition>
                            );
                        })}
                    </TransitionGroup>
                </div>

                {/* Dropdown Notification */}
                {isDropdownOpen && notifications.length > 0 && (
                    <div className="notification-dropdown">
                        <div className="notification-container">
                            {notifications.map((notif) => (
                                <Notification
                                    key={notif.id}
                                    id={notif.id}
                                    message={notif.message}
                                    type={notif.type}
                                    time={notif.time}
                                    isPopup={false}
                                    onClose={handleCloseNotification}
                                />
                            ))}
                        </div>
                        <div className="clear-button" onClick={() => removeNotification()}>
                            <NoIcon />
                            <p>Clear All</p>
                        </div>
                    </div>
                )}

                <div className="content-container">
                    <div className="header-container">
                        <div
                            className={`sidebar-toggle ${sidebarToggle ? 'open' : 'closed'}`}
                            onClick={handleSidebarToggle}
                        >
                            <List />
                        </div>
                        <p className="menu-title">{selectedComponent}</p>
                        <div className="config-wrapper">
                            <button
                                className="config-button"
                                onClick={handleSendNotification}>
                                <BellOutline />
                            </button>
                            <div
                                className={`config-button ${isDropdownOpen ? 'open' : ''}`}
                                onClick={handleBellClick}
                            >
                                <BellOutline />
                                {notificationUpdateCount > 0 && (
                                    <div className="notification-number">
                                        <p className="notification-count">
                                            {notificationUpdateCount > 99 ? "99+" : notificationUpdateCount}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="config-button">
                                <VerticalDots />
                            </div>
                            <div className="user-icon">
                                <p>A</p>
                            </div>
                        </div>
                    </div>
                    <div className="content-wrapper">
                        <Routes>
                            <Route path="/" element={<Navigate to="/dashboard" />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/map" element={<Map />} />
                            <Route path="/overview" element={<Overview />} />
                            <Route path="/analytics" element={<Analytics />} />
                            <Route path="/evaluation" element={<Evaluation />} />
                        </Routes>
                    </div>
                </div>

                <div className={`sidebar ${sidebarToggle ? 'visible' : 'hidden'}`}>
                    <Sidebar
                        onMenuSelect={handleMenuSelect}
                        onMenuHover={handleMenuHover}
                        onMenuLeave={handleMenuLeave}
                        sidebarToggle={sidebarToggle}
                    />
                </div>
            </div>
        </Router>
    );
};

export default Layout;
