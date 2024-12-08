import React, { Component } from "react";
import { Link } from "react-router-dom";
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


class Sidebar extends Component {
    state = {
        selectedMenu: ["Dashboard"], // Allowing selected menus to be an array
        selectedSubmenu: null, // Stores the selected submenu
        openDropdowns: [], // Stores the menus with open dropdowns
        isMinimize: false,
        rotation: 90,
    };

    // Method untuk mengatur minimisasi dan rotasi
    handleMinimize = () => {
        this.setState((prevState) => ({
            isMinimize: !prevState.isMinimize, // Toggle minimize state
            rotation: prevState.rotation + 180, // Tambahkan rotasi 180 derajat
        }));
    };

    // Handle menu selection and dropdown toggle
    handleMenuClick = (title, hasDropdown) => {
        this.setState((prevState) => {
            const { selectedMenu, openDropdowns } = prevState;

            if (hasDropdown) {
                const isOpen = openDropdowns.includes(title);
                const isSelected = selectedMenu.includes(title);

                // If the dropdown is open and the menu is selected, close it and unselect the menu
                if (isOpen) {
                    return {
                        selectedMenu: selectedMenu.filter(item => item !== title), // Remove from selected if clicked again
                        openDropdowns: openDropdowns.filter(item => item !== title) // Close the dropdown
                    };
                }

                // If the dropdown is closed and the menu is not selected, select the menu and open the dropdown
                if (!isSelected) {
                    return {
                        selectedMenu: [...selectedMenu, title], // Add menu to selected
                        openDropdowns: [...openDropdowns, title] // Open the dropdown
                    };
                }

                // If the menu is already selected but the dropdown is closed, just open the dropdown
                return {
                    openDropdowns: [...openDropdowns, title], // Open the dropdown without changing the selection
                    selectedSubmenu: null,
                };
            }

            // If the menu does not have a dropdown, just select it and close all dropdowns
            console.log("No dropdown, resetting selectedMenu and opening new menu");
            return {
                selectedMenu: [title, ...openDropdowns], // Only allow one selected menu when there's no dropdown
                selectedSubmenu: null, // Reset submenu when a new menu is selected
            };
        });
        if (!hasDropdown) {
            this.props.onMenuSelect(title);  // Memanggil onMenuSelect jika menu tidak memiliki dropdown
        }
    };

    // Handle submenu selection
    handleSubmenuClick = (submenuTitle) => {
        this.setState((prevState) => {
            const { selectedMenu, openDropdowns } = prevState;

            // If the selected parent menu has a dropdown
            const isParentWithDropdown = openDropdowns.length > 0;

            // Handle the selection of submenu
            return {
                selectedSubmenu: submenuTitle, // Update the selected submenu
                selectedMenu: isParentWithDropdown
                    ? [...openDropdowns]  // Keep the selected menu as open dropdowns only if there are dropdowns
                    : selectedMenu, // Otherwise keep the selected menu unchanged
            };
        });
        this.props.onMenuSelect(submenuTitle);  // Memanggil onMenuSelect jika menu tidak memiliki dropdown
    };

    render() {
        const { selectedMenu, selectedSubmenu, openDropdowns, isMinimize } = this.state;

        // Define menu configuration with divider information and titles
        const menuConfig = [
            {
                title: "Dashboard",
                icon: <TemplateOutline />,
                selectedIcon: <TemplateSolid />,
                route: "/dashboard",
                hasDropdown: false,
                showDividerLine: false,
                showDividerTitle: true,
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
                    { title: "Overview", route: "/overview" },
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
                    { title: "Generate QR Code", route: "/generate-qr" },
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
                    { title: "Logs", route: "/user-logs" },
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
                    { title: "QR Code", route: "/qr-code" },
                    { title: "Watermark", route: "/watermark" },
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

        return (
            <div className={`sidebar-container ${isMinimize ? "minimize" : ""}`}>
                <div className="brand-wrapper">
                    <img src={brand} alt="brand" />
                    <p>Logia</p>
                    <div className="minimize-toggle" onClick={this.handleMinimize}>
                        <div className="chevron-icon">
                            <Chevron currentRotation={this.state.rotation} />
                        </div>
                    </div>
                </div>

                <div className="divider">
                    <div className="divider-line"></div>
                </div>

                <div className="menu-wrapper">
                    {menuConfig.map((menu, index) => (
                        <React.Fragment key={menu.title}>
                            {/* Divider line and title checks */}
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

                            {/* Menu button */}
                            {menu.route ? (
                                <Link to={menu.route}>
                                    <MenuButton
                                        title={menu.title}
                                        icon={menu.icon}
                                        selectedIcon={menu.selectedIcon}
                                        isSelected={selectedMenu.includes(menu.title)}
                                        isOpen={openDropdowns.includes(menu.title)}
                                        onClick={() => this.handleMenuClick(menu.title, menu.hasDropdown, menu.route)}
                                        onSubmenuClick={this.handleSubmenuClick}
                                        submenu={menu.submenu}
                                        selectedSubmenu={selectedSubmenu}
                                        onSubmenuMouseEnter={(submenuTitle, element) => {
                                            if (isMinimize) {
                                                this.props.onMenuHover(isMinimize, submenuTitle, element);
                                            }
                                        }}
                                        onSubmenuMouseLeave={this.props.onMenuLeave}
                                        onMouseEnter={(event) => {
                                            this.props.onMenuHover(this.state.isMinimize, menu.title, event.currentTarget);
                                        }}
                                        onMouseLeave={this.props.onMenuLeave}
                                    />
                                </Link>
                            ) : (
                                <div>
                                    <MenuButton
                                        title={menu.title}
                                        icon={menu.icon}
                                        selectedIcon={menu.selectedIcon}
                                        isSelected={selectedMenu.includes(menu.title)}
                                        isOpen={openDropdowns.includes(menu.title)}
                                        onClick={() => this.handleMenuClick(menu.title, menu.hasDropdown, menu.route)}
                                        onSubmenuClick={this.handleSubmenuClick}
                                        submenu={menu.submenu}
                                        selectedSubmenu={selectedSubmenu}
                                        onSubmenuMouseEnter={(submenuTitle, element) => {
                                            if (isMinimize) {
                                                this.props.onMenuHover(isMinimize, submenuTitle, element);
                                            }
                                        }}
                                        onSubmenuMouseLeave={this.props.onMenuLeave}
                                        onMouseEnter={(event) => {
                                            this.props.onMenuHover(this.state.isMinimize, menu.title, event.currentTarget);
                                        }}
                                        onMouseLeave={this.props.onMenuLeave}
                                    />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <div className="divider end">
                        <div className="divider-line"></div>
                    </div>
                <div
                    className={"logout-button"}

                    //Tooltip
                    onMouseEnter={(event) => {
                        this.props.onMenuHover(this.state.isMinimize, "Log Out", event.currentTarget);  // Pass the element to the handler
                    }}
                    onMouseLeave={this.props.onMenuLeave}
                    onClick={() => alert("Logging out")}
                >
                    <div className="icon">
                        <LogOut />
                    </div>
                    <p className="title">
                        Log Out
                    </p>
                </div>
            </div>
        );
    }
}

export default Sidebar;
