import React, { useState, useRef, useEffect, useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useNotification } from "../../context/NotificationContext";
import Notification from "../../components/Notification/Notification";
import Sidebar from "../Sidebar/Sidebar";
import Details from "../Details/Details";
import EditDetails from "../EditDetails/EditDetails";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Map from "../../pages/Map/Map";
import Analytics from "../../pages/Activity/Analytics/Analytics";
import Evaluation from "../../pages/Activity/Evaluation/Evaluation";
import Table from "../../pages/Data/Table/Table";
import Verification from "../../pages/Data/Verification/Verification";
import GenerateQRCode from "../../pages/Data/GenerateQRCode/GenerateQRCode";
import Account from "../../pages/Users/Account/Account";
import History from "../../pages/History/History"
import Help from "../../pages/Help/Help"
import "./Layout.css";
import {
    List,
    VerticalDots,
    BellOutline,
    Trash,
} from '../../components/Icons/Icon';
import ProtectedRoute from '../../api/middleware/ProtectedRoute';
import { OptionField } from "../../components/FieldInput/FieldInput";
import { SiteIDContext } from "../../context/SiteIDContext";
import { DataOptionContext } from "../../context/dataOptionContext";
import { getDataOptions } from "../../api/controller/optionController";
import VerificationForm from "../VerificationForm/VerificationForm";
import QRDownloadForm from "../QRDownloadForm/QRDownloadForm";

const Layout = () => {
    const location = useLocation();
    const { notifications, addNotification, removeNotification } = useNotification();
    const [notificationPopup, setNotificationPopup] = useState([]);
    const [sidebarToggle, setSidebarToggle] = useState(true);
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);
    const [isDetailsReadonly, setIsDetailsReadonly] = useState(false);
    const [isDetailsAnimating, setIsDetailsAnimating] = useState(false); // Status animasi
    const [isEditDetailsVisible, setIsEditDetailsVisible] = useState(false);
    const [isEditDetailsAnimating, setIsEditDetailsAnimating] = useState(false); // Status animasi
    const [isQRDownloadFormVisible, setIsQRDownloadFormVisible] = useState(false);
    const [isQRDownloadFormAnimating, setIsQRDownloadFormAnimating] = useState(false); // Status animasi
    const [isVerificationFormVisible, setIsVerificationFormVisible] = useState(false);
    const [isVerificationFormAnimating, setIsVerificationFormAnimating] = useState(false); // Status animasi
    const [isNotificationPopUpVisible, setIsNotificationPopUpVisible] = useState(false);
    const [isNotificationPopUpAnimating, setIsNotificationPopUpAnimating] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState("Dashboard");
    const [tooltipText, setTooltipText] = useState("");
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const [isNotificationDropdownOpen, setisNotificationDropdownOpen] = useState(false);
    const [notificationUpdateCount, setNotificationUpdateCount] = useState(0);
    const [openDropdown, setOpenDropdown] = useState(null); // 'notifications', 'settings', 'profile', or null
    const { selectedSite, setSelectedSite } = useContext(SiteIDContext);
    const { setDataOption } = useContext(DataOptionContext);
    const [siteOption, setSiteOption] = useState([{ text: "", value: "" }]);
    const [selectedTab, setSelectedTab] = useState(null);
    const [plantID, setPlantID] = useState(null);


    // Buat ref untuk setiap notifikasi
    const notificationRefs = useRef({});
    //Ref untuk table
    const tableRef = useRef(null);

    // Refs untuk dropdown
    const notificationDropdownRef = useRef(null);
    const settingsDropdownRef = useRef(null);
    const profileDropdownRef = useRef(null);
    const timeoutRef = useRef(null);

    const fetchDataOptions = async () => {
        try {
            const response = await getDataOptions();
            setDataOption(response); // Update state with fetched data
            setSiteOption(response.tb_site)
            setSelectedSite(selectedSite || response.tb_site[0].value);
        } catch (error) {
            console.error("Error fetching options:", error);
        }
    };

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
            setisNotificationDropdownOpen(false);
            setOpenDropdown(null)
        }
    }, [notifications.length]);  // Akan dijalankan setiap kali jumlah notifikasi berubah

    // Tambahkan event listener untuk mendeteksi klik di luar dropdown
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                openDropdown &&
                !notificationDropdownRef.current?.contains(event.target) &&
                !settingsDropdownRef.current?.contains(event.target) &&
                !profileDropdownRef.current?.contains(event.target)
            ) {
                setOpenDropdown(null); // Tutup dropdown jika klik di luar
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [openDropdown]);

    useEffect(() => {
        if (location.pathname === "/table") {
            setIsDetailsReadonly(false);
        } else {
            setIsDetailsReadonly(true); // Optional: Reset or handle other routes
        }
        handleDetailsClose();
        handleEditDetailsClose(false);
        handleVerificationFormClose();
        fetchDataOptions();
        // eslint-disable-next-line
    }, [location.pathname]);

    useEffect(() => {
        if (notifications.length > 0) {
            const newNotification = notifications.slice(-1)[0]; // Ambil notifikasi terbaru
            setNotificationPopup((prev) => [...prev, newNotification]);
        }

        setIsNotificationPopUpVisible(true);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setIsNotificationPopUpAnimating(true); // Mulai animasi keluar
            setTimeout(() => {
                setIsNotificationPopUpVisible(false); // Hapus elemen setelah animasi selesai
                setIsNotificationPopUpAnimating(false);
                setNotificationPopup([]); // Kosongkan popup setelah selesai animasi
            }, 300); // Durasi animasi sesuai CSS
        }, 3000); // Tampilkan notifikasi selama 3 detik

        // eslint-disable-next-line
    }, [notifications]);

    const handleDetailsClose = () => {
        setIsDetailsAnimating(true); // Mulai animasi keluar
        setTimeout(() => {
            setIsDetailsVisible(false); // Hapus elemen setelah animasi selesai
            setIsDetailsAnimating(false);
        }, 300); // Durasi animasi sesuai CSS
    };

    const handleEditDetailsClose = (isDetail = true) => {
        if (isDetail) {
            setIsDetailsVisible(true)
        }
        setIsEditDetailsAnimating(true); // Mulai animasi keluar
        setTimeout(() => {
            setIsEditDetailsVisible(false); // Hapus elemen setelah animasi selesai
            setIsEditDetailsAnimating(false);
        }, 300); // Durasi animasi sesuai CSS
    };

    const handleVerificationFormClose = () => {
        setIsVerificationFormAnimating(true); // Mulai animasi keluar
        setTimeout(() => {
            setIsVerificationFormVisible(false); // Hapus elemen setelah animasi selesai
            setIsVerificationFormAnimating(false);
        }, 300); // Durasi animasi sesuai CSS
    };

    const handleQRDownloadFormClose = () => {
        setIsQRDownloadFormAnimating(true); // Mulai animasi keluar
        setTimeout(() => {
            setIsQRDownloadFormVisible(false); // Hapus elemen setelah animasi selesai
            setIsQRDownloadFormAnimating(false);
        }, 300); // Durasi animasi sesuai CSS
    };

    const handleOpenQRDownloadForm = (plantID) => {
        setPlantID(plantID);
        setIsQRDownloadFormVisible(true);
    }

    const handleEditDetailsDelete = () => {
        setIsEditDetailsAnimating(true); // Mulai animasi keluar
        setTimeout(() => {
            setIsEditDetailsVisible(false); // Hapus elemen setelah animasi selesai
            setIsEditDetailsAnimating(false);
        }, 300); // Durasi animasi sesuai CSS
    };
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
    // Dropdown toggle handlers
    const handleDropdownClick = (dropdownName) => {
        if (dropdownName === 'notifications' && notifications.length === 0) {
            return; // Jika tidak ada notifikasi, jangan buka dropdown
        }
        setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
        if (dropdownName === 'notifications') setNotificationUpdateCount(0); // Reset notification count
    };

    const handleSendNotification = (message, type) => {
        // Add a notification with a unique number and a dynamic type
        addNotification(`${message}`, type);

        if (openDropdown !== 'notifications') {
            setNotificationUpdateCount((prevCount) => prevCount + 1);
        }
    };

    const handleCloseNotification = (id) => {
        removeNotification(id);
    };

    const handlePlantTableRowClick = (selectedTab) => {
        if (selectedTab) {
            setSelectedTab(selectedTab);
        } else {
            setSelectedTab(null);
        }
        setIsDetailsVisible(true); // This will set the row details visibility
        if (isEditDetailsVisible) {
            handleEditDetailsClose();
        }
    };

    const handleVerificationTableRowClick = (selectedTab) => {
        if (selectedTab !== "Unverified") {
            setSelectedTab(selectedTab);
            setIsDetailsVisible(true);
        } else {
            setIsVerificationFormVisible(true);
        }
    };

    const handleSiteChange = (value) => {
        setSelectedSite(value);
    };

    const handleRefreshTable = () => {
        if (tableRef.current) {
            tableRef.current.fetchTableData();  // Memanggil fetchTableData lewat ref
        }
    };

    const handleReloadTable = () => {
        if (tableRef.current) { // Memanggil setIsLoading lewat ref
            tableRef.current.setIsLoading();  // Memanggil setIsLoading lewat ref
        }
    };

    const handleOnTabChange = () => {
        handleVerificationFormClose();
        handleDetailsClose();
    };

    return (
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

            {isNotificationPopUpVisible && (
                <div className={`popup-notification ${isNotificationPopUpAnimating ? "fade-out" : "fade-in"}`}>
                    <TransitionGroup component={null}>
                        {!isNotificationDropdownOpen && notificationUpdateCount > 0 && notificationPopup.slice(
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
            )}
            {/* Dropdown Notification */}
            {openDropdown === 'notifications' && (
                <div ref={notificationDropdownRef} className="notification-dropdown">
                    <div className="notification-container">
                        {notifications
                            .slice()
                            .reverse()
                            .map((notif) => (
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
                    <div
                        className="clear-button"
                        onClick={() => {
                            removeNotification(); // Menghapus semua notifikasi
                            setNotificationUpdateCount(0); // Reset jumlah notifikasi baru
                            setOpenDropdown(null); // Tutup dropdown
                        }}
                    >
                        <Trash />
                        <p>Clear All</p>
                    </div>
                </div>
            )}

            {openDropdown === 'settings' && (
                <div ref={settingsDropdownRef} className="settings-dropdown">
                    <p>Settings Dropdown</p>
                </div>
            )}

            {openDropdown === 'profile' && (
                <div ref={profileDropdownRef} className="profile-dropdown" >
                    <p>Profile Dropdown</p>
                </div>
            )}

            <div className="content-container">

                {isDetailsVisible && (
                    <div
                        className={`details-container ${isDetailsAnimating ? "fade-out" : "fade-in"}`}
                    >
                        <Details
                            onClose={handleDetailsClose}
                            onEdit={() => [setIsEditDetailsVisible(true), handleDetailsClose()]}
                            readonly={isDetailsReadonly}
                            onTab={selectedTab || null}
                            getQR={handleOpenQRDownloadForm}
                        />
                    </div>
                )}

                {isQRDownloadFormVisible && (
                    <div className={`qrDownloadForm-container ${isQRDownloadFormAnimating ? "fade-out" : "fade-in"}`}>
                        <QRDownloadForm plantID={plantID} onBlur={handleQRDownloadFormClose} />
                    </div>
                )}

                {isEditDetailsVisible && (
                    <div
                        className={`editDetails-container ${isEditDetailsAnimating ? "fade-out" : "fade-in"}`}
                    >
                        <EditDetails
                            onClose={handleEditDetailsClose}
                            onDelete={handleEditDetailsDelete}
                            onAction={(message, type) => {
                                handleSendNotification(message, type);
                                handleRefreshTable();  // Refresh data after save
                            }}
                            onUpdate={handleReloadTable}
                            getQR={handleOpenQRDownloadForm}
                        />
                    </div>
                )}

                {isVerificationFormVisible && (
                    <div
                        className={`verificationForm-container ${isVerificationFormAnimating ? "fade-out" : "fade-in"}`}
                    >
                        <VerificationForm
                            onClose={handleVerificationFormClose}
                            onAction={(message, type) => {
                                handleSendNotification(message, type);
                                handleRefreshTable();  // Refresh data after save
                            }}
                            getQR={handleOpenQRDownloadForm}
                        />
                    </div>
                )}

                <div className="header-container">
                    <div
                        className={`sidebar-toggle ${sidebarToggle ? 'open' : 'closed'}`}
                        onClick={handleSidebarToggle}
                    >
                        <List />
                    </div>
                    <p className="menu-title">{selectedComponent || "Dashboard"}</p>
                    <div className="config-wrapper">
                        <div className="site-option">
                            <p>Site</p>
                            <OptionField
                                id="site"
                                optionItem={siteOption}
                                onChange={(e) => { handleSiteChange(e.target.value) }}
                            />
                        </div>
                        <div
                            className={`config-button ${openDropdown === 'notifications' ? 'open' : ''}`}
                            onClick={() => handleDropdownClick('notifications')}
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
                        <div
                            className={`config-button ${openDropdown === 'settings' ? 'open' : ''}`}
                            onClick={() => [handleDropdownClick('settings'), handleSendNotification("This feature still under development!")]}
                        >
                            <VerticalDots />
                        </div>
                        <div
                            className={`user-icon ${openDropdown === 'profile' ? 'open' : ''}`}
                            onClick={() => [handleDropdownClick('profile'), handleSendNotification("This feature still under development!")]}
                        >
                            <p>A</p>
                        </div>
                    </div>
                </div>

                <div className="content-wrapper">

                    <Routes>
                        <Route path="/landing" element={null} />
                        <Route path="/dashboard" element={<ProtectedRoute>
                            <Dashboard
                                onRowClick={handlePlantTableRowClick}
                            /></ProtectedRoute>} />
                        <Route path="/map" element={<ProtectedRoute>
                            <Map
                                onRowClick={handlePlantTableRowClick}
                            />
                            </ProtectedRoute>} />
                        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                        <Route path="/evaluation" element={<ProtectedRoute><Evaluation /></ProtectedRoute>} />
                        <Route path="/table" element={<ProtectedRoute>
                            <Table
                                onRowClick={handlePlantTableRowClick}
                                ref={tableRef} /></ProtectedRoute>
                        } />
                        <Route path="/verification" element={<ProtectedRoute>
                            <Verification
                                onRowClick={handleVerificationTableRowClick}
                                ref={tableRef}
                                onTabChange={handleOnTabChange}
                            />
                        </ProtectedRoute>}
                        />
                        <Route path="/generate" element={<ProtectedRoute><GenerateQRCode /></ProtectedRoute>} />
                        <Route path="/account" element={<ProtectedRoute><Account
                            onAction={(message, type) => {
                                handleSendNotification(message, type);
                                handleRefreshTable();  // Refresh data after save
                            }}
                        /></ProtectedRoute>} />
                        <Route path="/history" element={<ProtectedRoute><History onRowClick={handlePlantTableRowClick} /></ProtectedRoute>} />
                        <Route path="/help" element={<ProtectedRoute><Help /></ProtectedRoute>} />
                    </Routes>
                </div>
            </div>

            <div className={`sidebar ${sidebarToggle ? 'visible' : 'hidden'}`}>
                <Sidebar
                    onMenuSelect={handleMenuSelect}
                    onMenuHover={handleMenuHover}
                    onMenuLeave={handleMenuLeave}
                    onSendNotification={handleSendNotification}
                    sidebarToggle={sidebarToggle}
                />
            </div>
        </div>
    );
};

export default Layout;
