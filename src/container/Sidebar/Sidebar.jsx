import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import brand from "../../assets/images/logia.svg";
import MenuButton from "../../components/MenuButton/MenuButton";
import {
    Chevron,
    LogOut,
    TemplateOutline,
    TemplateSolid,
    MapOutline,
    MapSolid,
    ChartOutline,
    ChartSolid,
    DBOutline,
    DBSolid,
    UserOutline,
    UserSolid,
    CogOutline,
    CogSolid,
    ClockOutline,
    ClockSolid,
    MarkOutline,
    MarkSolid,
} from '../../components/Icons/Icon';
import { logout } from "../../api/handlers/auth"

const menuConfig = [
    {
        title: "Dashboard",
        icon: <TemplateOutline />,
        selectedIcon: <TemplateSolid />,
        route: "/dashboard",
        hasDropdown: false,
        showDividerLine: false,
        showDividerTitle: false,
        dividerTitle: "Menu",
    },
    {
        title: "Map",
        icon: <MapOutline />,
        selectedIcon: <MapSolid />,
        route: "/map",
        hasDropdown: false,
        showDividerLine: false,
        showDividerTitle: false,
        dividerTitle: "",
    },
    {
        title: "Activity",
        icon: <ChartOutline />,
        selectedIcon: <ChartSolid />,
        submenu: [
            { title: "Analytics", route: "/analytics" },
            { title: "Evaluation", route: "/evaluation" },
        ],
        hasDropdown: true,
        showDividerLine: false,
        showDividerTitle: false,
        dividerTitle: "",
    },
    {
        title: "Data",
        icon: <DBOutline />,
        selectedIcon: <DBSolid />,
        submenu: [
            { title: "Table", route: "/table" },
            { title: "Verification", route: "/verification" },
            { title: "Generate QR Code", route: "/generate" },
        ],
        hasDropdown: true,
        showDividerLine: true,
        showDividerTitle: true,
        dividerTitle: "Management",
    },
    {
        title: "Users",
        icon: <UserOutline />,
        selectedIcon: <UserSolid />,
        submenu: [
            { title: "Account", route: "/account" },
            { title: "Logs", route: null },
        ],
        hasDropdown: true,
        showDividerLine: false,
        showDividerTitle: false,
        dividerTitle: "",
    },
    {
        title: "Settings",
        icon: <CogOutline />,
        selectedIcon: <CogSolid />,
        submenu: [
            { title: "Option", route: null },
            { title: "Watermark", route: null },
        ],
        hasDropdown: true,
        showDividerLine: false,
        showDividerTitle: false,
        dividerTitle: "",
    },
    {
        title: "History",
        icon: <ClockOutline />,
        selectedIcon: <ClockSolid />,
        route: "/history",
        hasDropdown: false,
        showDividerLine: true,
        showDividerTitle: true,
        dividerTitle: "Other",
    },
    {
        title: "Help",
        icon: <MarkOutline />,
        selectedIcon: <MarkSolid />,
        route: "/help",
        hasDropdown: false,
        showDividerLine: false,
        showDividerTitle: false,
        dividerTitle: "",
    },
];

const Sidebar = (props) => {
    const navigate = useNavigate(); // Hook untuk navigasi

    const location = useLocation();
    const [selectedMenu, setSelectedMenu] = useState(["Dashboard"]);
    const [selectedSubmenu, setSelectedSubmenu] = useState(null);
    const [openDropdowns, setOpenDropdowns] = useState([]);
    const [isMinimize, setIsMinimize] = useState(false);
    const [rotation, setRotation] = useState(90);

    const updateSelectedMenuAndDropdowns = useCallback(() => {
        const { pathname } = location;
        const newSelectedMenu = [];
        const newOpenDropdowns = [];

        if (pathname === "/") {
            newSelectedMenu.push("Dashboard");
            props.onMenuSelect("Dashboard");
        } else {
            menuConfig.forEach(menu => {
                if (pathname === menu.route) {
                    newSelectedMenu.push(menu.title);
                    props.onMenuSelect(menu.title); // Notify parent component
                }

                if (menu.hasDropdown) {
                    menu.submenu.forEach(submenu => {
                        if (pathname === submenu.route) {
                            newOpenDropdowns.push(menu.title);
                            newSelectedMenu.push(menu.title);
                            setSelectedSubmenu(submenu.title);
                            props.onMenuSelect(submenu.title);
                        }
                    });
                }
            });
        }



        // Always update `selectedMenu` and `openDropdowns`
        setSelectedMenu(newSelectedMenu);
        // Only update dropdown states if the sidebar is not minimized
        setOpenDropdowns(newOpenDropdowns);
    }, [location, props]);
    useEffect(() => {
        // Check if the page is loaded via a refresh
        const navigationType = window.performance.getEntriesByType("navigation")[0]?.type || window.performance.navigation.type;

        if (navigationType === "reload" || navigationType === 1) {
            updateSelectedMenuAndDropdowns();
        }

        // eslint-disable-next-line
    }, []);

    const handleMinimize = () => {
        setIsMinimize(prevState => !prevState);
        setRotation(prevRotation => prevRotation + 180);
    };

    const handleMenuClick = (title, hasDropdown) => {
        setSelectedMenu(prevSelectedMenu => {
            const newSelectedMenu = [...prevSelectedMenu];
            const newOpenDropdowns = [...openDropdowns];

            if (hasDropdown) {
                const isOpen = newOpenDropdowns.includes(title);
                const isSelected = newSelectedMenu.includes(title);

                if (isOpen) {
                    // Jika dropdown terbuka, tutup dan hapus dari selectedMenu & openDropdowns
                    const updatedSelectedMenu = newSelectedMenu.filter(item => item !== title);
                    const updatedOpenDropdowns = newOpenDropdowns.filter(item => item !== title);
                    setOpenDropdowns(updatedOpenDropdowns);
                    return updatedSelectedMenu;
                } else {
                    // Jika dropdown tertutup, buka dan tambahkan ke selectedMenu & openDropdowns
                    if (!isSelected) {
                        newSelectedMenu.push(title);
                    }
                    newOpenDropdowns.push(title);
                    setOpenDropdowns(newOpenDropdowns);
                    return newSelectedMenu;
                }
            }

            // Jika menu tidak memiliki dropdown
            if (!hasDropdown) {
                // Hapus semua menu tanpa dropdown dari selectedMenu
                const updatedSelectedMenu = newSelectedMenu.filter(item =>
                    openDropdowns.includes(item) // Pertahankan hanya menu dengan dropdown
                );

                updatedSelectedMenu.push(title); // Tambahkan menu baru
                setSelectedSubmenu(null); // Reset submenu
                props.onMenuSelect(title); // Notify parent component
                return updatedSelectedMenu;
            }
            return newSelectedMenu;
        });

        if (!hasDropdown) {
            setSelectedSubmenu(null); // Hapus submenu jika menu tanpa dropdown diklik
            props.onMenuSelect(title); // Notify parent component
        }
    };

    const handleSubmenuClick = (submenuTitle, submenuRoute) => {
        setSelectedSubmenu(submenuTitle);

        setSelectedMenu(prevSelectedMenu => {
            const newSelectedMenu = prevSelectedMenu.filter(menu => {
                // Remove menus without dropdowns when a submenu is selected
                return menuConfig.find(m => m.title === menu)?.hasDropdown;
            });

            return newSelectedMenu;
        });

        if (submenuRoute) {
            props.onMenuSelect(submenuTitle); // Notify parent component with the submenu title
        } else {
            props.onSendNotification("This page is still under development!", "info");
        }
    };

    return (
        <div className={`sidebar-container ${isMinimize ? "minimize" : ""}`}>
            <div className="brand-wrapper">
                <img src={brand} alt="brand" />
                <p>Logia</p>
                <div className="minimize-toggle" onClick={handleMinimize}>
                    <div className="chevron-icon">
                        <Chevron currentRotation={rotation} />
                    </div>
                </div>
            </div>

            <div className="divider start">
                <div className="divider-line"></div>
            </div>

            <div className="menu-wrapper">
                <div className="divider start">
                    <p className="divider-name">Menu</p>
                </div>
                {menuConfig.map(menu => (
                    <React.Fragment key={menu.title}>
                        {menu.showDividerLine && (
                            <div className="divider">
                                <div className="divider-line"></div>
                            </div>
                        )}
                        {menu.showDividerTitle && menu.dividerTitle && (
                            <div className="divider">
                                <p className="divider-name">{menu.dividerTitle}</p>
                            </div>
                        )}

                        {menu.route ? (
                            <Link to={menu.route}>
                                <MenuButton
                                    title={menu.title}
                                    icon={menu.icon}
                                    selectedIcon={menu.selectedIcon}
                                    isSelected={selectedMenu.includes(menu.title)}
                                    isOpen={openDropdowns.includes(menu.title)}
                                    onClick={() => handleMenuClick(menu.title, menu.hasDropdown)}
                                    onSubmenuClick={handleSubmenuClick}
                                    submenu={menu.submenu}
                                    selectedSubmenu={selectedSubmenu}
                                    onSubmenuMouseEnter={(submenuTitle, element) => {
                                        if (isMinimize) {
                                            props.onMenuHover(isMinimize, submenuTitle, element);
                                        }
                                    }}
                                    onSubmenuMouseLeave={props.onMenuLeave}
                                    onMouseEnter={(event) => {
                                        props.onMenuHover(isMinimize, menu.title, event.currentTarget);
                                    }}
                                    onMouseLeave={props.onMenuLeave}
                                />
                            </Link>
                        ) : (
                            <MenuButton
                                title={menu.title}
                                icon={menu.icon}
                                selectedIcon={menu.selectedIcon}
                                isSelected={selectedMenu.includes(menu.title)}
                                isOpen={openDropdowns.includes(menu.title)}
                                onClick={() => handleMenuClick(menu.title, menu.hasDropdown)}
                                onSubmenuClick={handleSubmenuClick}
                                submenu={menu.submenu}
                                selectedSubmenu={selectedSubmenu}
                                onSubmenuMouseEnter={(submenuTitle, element) => {
                                    if (isMinimize) {
                                        props.onMenuHover(isMinimize, submenuTitle, element);
                                    }
                                }}
                                onSubmenuMouseLeave={props.onMenuLeave}
                                onMouseEnter={(event) => {
                                    props.onMenuHover(isMinimize, menu.title, event.currentTarget);
                                }}
                                onMouseLeave={props.onMenuLeave}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
            <div className="logout-wrapper">
                <div className="divider end">
                    <div className="divider-line"></div>
                </div>
                <div
                    className="logout-button"
                    onMouseEnter={(event) => {
                        props.onMenuHover(isMinimize, "Log Out", event.currentTarget);
                    }}
                    onMouseLeave={props.onMenuLeave}
                    onClick={() => [logout(), navigate('/')]}
                >
                    <div className="icon">
                        <LogOut />
                    </div>
                    <p className="title">Log Out</p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
