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
    };

    render() {
        const { selectedMenu, selectedSubmenu, openDropdowns } = this.state;

        return (
            <div className={`sidebar-container ${this.state.isMinimize ? 'minimize' : ''}`}>
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
                    <div className="divider">
                        <p className="divider-name">Menu</p>
                    </div>

                    {/*  Menu without dropdown (Map) */}
                    <Link to="/dashboard">
                        <MenuButton
                            title="Dashboard"
                            icon={<TemplateOutline />}
                            selectedIcon={<TemplateSolid />}
                            isSelected={selectedMenu.includes("Dashboard")}
                            isOpen={false}
                            onClick={() => {
                                this.handleMenuClick("Dashboard", false);
                                this.props.onMenuSelect("Dashboard");
                            }}

                            //Tooltip
                            onMouseEnter={(event) => {
                                this.props.onMenuHover(this.state.isMinimize, "Dashboard", event.currentTarget);  // Pass the element to the handler
                            }}
                            onMouseLeave={this.props.onMenuLeave}
                        />
                    </Link>

                    {/* Menu without dropdown (Map) */}
                    <Link to="/map">
                        <MenuButton
                            title="Map"
                            icon={<MapOutline />} // Ikon default 
                            selectedIcon={<MapSolid />} // Ikon saat dipilih
                            isSelected={selectedMenu.includes("Map")}
                            isOpen={false}
                            onClick={() => {
                                this.handleMenuClick("Map", false);
                                this.props.onMenuSelect("Map"); // Notify Layout to render the Map component
                            }}

                            //Tooltip
                            onMouseEnter={(event) => {
                                this.props.onMenuHover(this.state.isMinimize, "Map", event.currentTarget);  // Pass the element to the handler
                            }}
                            onMouseLeave={this.props.onMenuLeave}
                        />
                    </Link>

                    {/* Menu with dropdown (Activity) */}
                    <MenuButton
                        title="Activity"
                        icon={<ChartOutline />} // Ikon default 
                        selectedIcon={<ChartSolid />} // Ikon saat dipilih
                        isSelected={selectedMenu.includes("Activity")} // Check if it's selected
                        isOpen={openDropdowns.includes("Activity")} // No dropdown
                        onClick={() => this.handleMenuClick("Activity", true)} // Select menu without dropdown
                        onSubmenuClick={this.handleSubmenuClick} // Handle submenu click
                        submenu={[
                            { title: "Overview", route: "Route 1" },
                            { title: "Analytics", route: "Route 2" },
                            { title: "Evaluation", route: "Route 3" }
                        ]}
                        selectedSubmenu={selectedSubmenu} // Pass the selected submenu

                        //Tooltip
                        onMouseEnter={(event) => {
                            this.props.onMenuHover(this.state.isMinimize, "Activity", event.currentTarget);  // Pass the element to the handler
                        }}
                        onMouseLeave={this.props.onMenuLeave}
                    />

                    <div className="divider">
                        <div className="divider-line"></div>
                        <p className="divider-name">Management</p>
                    </div>

                    {/* Menu with dropdown (Data) */}
                    <MenuButton
                        title="Data"
                        icon={<DBOutline />} // Ikon default 
                        selectedIcon={<DBSolid />} // Ikon saat dipilih
                        isSelected={selectedMenu.includes("Data")} // Check if it's selected
                        isOpen={openDropdowns.includes("Data")} // Check if the dropdown is open
                        onClick={() => this.handleMenuClick("Data", true)} // Toggle dropdown and selection
                        onSubmenuClick={this.handleSubmenuClick} // Handle submenu click
                        submenu={[
                            { title: "Table", route: "Route 1" },
                            { title: "Verification", route: "Route 2" },
                            { title: "Generate QR Code", route: "Route 3" }
                        ]}
                        selectedSubmenu={selectedSubmenu} // Pass the selected submenu

                        //Tooltip
                        onMouseEnter={(event) => {
                            this.props.onMenuHover(this.state.isMinimize, "Data", event.currentTarget);  // Pass the element to the handler
                        }}
                        onMouseLeave={this.props.onMenuLeave}
                    />

                    {/* Menu with dropdown (Users) */}
                    <MenuButton
                        title="Users"
                        icon={<UserOutline />} // Ikon default 
                        selectedIcon={<UserSolid />} // Ikon saat dipilih
                        isSelected={selectedMenu.includes("Users")} // Check if it's selected
                        isOpen={openDropdowns.includes("Users")} // Check if the dropdown is open
                        onClick={() => this.handleMenuClick("Users", true)} // Toggle dropdown and selection
                        onSubmenuClick={this.handleSubmenuClick} // Handle submenu click
                        submenu={[
                            { title: "Account", route: "Route 1" },
                            { title: "Activity", route: "Route 2" },
                        ]}
                        selectedSubmenu={selectedSubmenu} // Pass the selected submenu

                        //Tooltip
                        onMouseEnter={(event) => {
                            this.props.onMenuHover(this.state.isMinimize, "Users", event.currentTarget);  // Pass the element to the handler
                        }}
                        onMouseLeave={this.props.onMenuLeave}
                    />

                    {/* Menu with dropdown (Data) */}
                    <MenuButton
                        title="Settings"
                        icon={<CogOutline />} // Ikon default 
                        selectedIcon={<CogSolid />} // Ikon saat dipilih
                        isSelected={selectedMenu.includes("Settings")} // Check if it's selected
                        isOpen={openDropdowns.includes("Settings")} // Check if the dropdown is open
                        onClick={() => this.handleMenuClick("Settings", true)} // Toggle dropdown and selection
                        onSubmenuClick={this.handleSubmenuClick} // Handle submenu click
                        submenu={[
                            { title: "QR Code", route: "Route 1" },
                            { title: "Watermark", route: "Route 2" },
                        ]}
                        selectedSubmenu={selectedSubmenu} // Pass the selected submenu

                        //Tooltip
                        onMouseEnter={(event) => {
                            this.props.onMenuHover(this.state.isMinimize, "Settings", event.currentTarget);  // Pass the element to the handler
                        }}
                        onMouseLeave={this.props.onMenuLeave}
                    />

                    <div className="divider">
                        <div className="divider-line"></div>
                        <p className="divider-name">Other</p>
                    </div>

                    {/* Menu without dropdown (History) */}
                    <MenuButton
                        title="History"
                        icon={<ClockOutline />} // Ikon default 
                        selectedIcon={<ClockSolid />} // Ikon saat dipilih
                        isSelected={selectedMenu.includes("History")} // Check if it's selected
                        isOpen={false} // No dropdown
                        onClick={() => {
                            this.handleMenuClick("History", false);
                            this.props.onMenuSelect("History"); // Notify Layout to render
                        }}

                        //Tooltip
                        onMouseEnter={(event) => {
                            this.props.onMenuHover(this.state.isMinimize, "History", event.currentTarget);  // Pass the element to the handler
                        }}
                        onMouseLeave={this.props.onMenuLeave}
                    />

                    {/* Menu without dropdown (Help) */}
                    <MenuButton
                        title="Help"
                        icon={<MarkOutline />} // Ikon default 
                        selectedIcon={<MarkSolid />} // Ikon saat dipilih
                        isSelected={selectedMenu.includes("Help")} // Check if it's selected
                        isOpen={false} // No dropdown
                        onClick={() => {
                            this.handleMenuClick("Help", false);
                            this.props.onMenuSelect("Help"); // Notify Layout to render
                        }}

                        //Tooltip
                        onMouseEnter={(event) => {
                            this.props.onMenuHover(this.state.isMinimize, "Help", event.currentTarget);  // Pass the element to the handler
                        }}
                        onMouseLeave={this.props.onMenuLeave}
                    />
                </div>

                <div className="logout-wrapper">
                    <div className="divider">
                        <div className="divider-line"></div>
                    </div>
                    <div
                        className={"logout-button"}

                        //Tooltip
                        onMouseEnter={(event) => {
                            this.props.onMenuHover(this.state.isMinimize, "Log Out", event.currentTarget);  // Pass the element to the handler
                        }}
                        onMouseLeave={this.props.onMenuLeave}
                    >
                        <div className="icon">
                            <LogOut />
                        </div>
                        <p className="title">
                            Log Out
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;
