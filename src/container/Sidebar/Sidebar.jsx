import React, { Component } from "react";
import MenuButton from "../../components/MenuButton/MenuButton";

class Sidebar extends Component {
    state = {
        selectedMenu: [], // Allowing selected menus to be an array
        selectedSubmenu: null, // Stores the selected submenu
        openDropdowns: [] // Stores the menus with open dropdowns
    };

    // Handle menu selection and dropdown toggle
    handleMenuClick = (title, hasDropdown) => {
        this.setState((prevState) => {
            const { selectedMenu, openDropdowns } = prevState;

            console.log("Before handleMenuClick:");
            console.log("selectedMenu:", selectedMenu);
            console.log("openDropdowns:", openDropdowns);
            console.log("title:", title);

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
            <div>
                {/* Menu with dropdown (Parent Menu 1) */}
                <MenuButton
                    title="Parent Menu 1"
                    isSelected={selectedMenu.includes("Parent Menu 1")} // Check if it's selected
                    isOpen={openDropdowns.includes("Parent Menu 1")} // Check if the dropdown is open
                    onClick={() => this.handleMenuClick("Parent Menu 1", true)} // Toggle dropdown and selection
                    onSubmenuClick={this.handleSubmenuClick} // Handle submenu click
                    submenu={[
                        { title: "Submenu 1", route: "Route 1" },
                        { title: "Submenu 2", route: "Route 2" },
                        { title: "Submenu 3", route: "Route 3" }
                    ]}
                    selectedSubmenu={selectedSubmenu} // Pass the selected submenu
                />

                {/* Menu without dropdown (Parent Menu 2) */}
                <MenuButton
                    title="Parent Menu 2"
                    isSelected={selectedMenu.includes("Parent Menu 2")} // Check if it's selected
                    isOpen={false} // No dropdown
                    onClick={() => this.handleMenuClick("Parent Menu 2", false)} // Select menu without dropdown
                />

                {/* Menu with dropdown (Parent Menu 3) */}
                <MenuButton
                    title="Parent Menu 3"
                    isSelected={selectedMenu.includes("Parent Menu 3")} // Check if it's selected
                    isOpen={openDropdowns.includes("Parent Menu 3")} // Check if the dropdown is open
                    onClick={() => this.handleMenuClick("Parent Menu 3", true)} // Toggle dropdown and selection
                    onSubmenuClick={this.handleSubmenuClick} // Handle submenu click
                    submenu={[
                        { title: "Submenu 4", route: "Route 1" },
                        { title: "Submenu 5", route: "Route 2" },
                        { title: "Submenu 6", route: "Route 3" }
                    ]}
                    selectedSubmenu={selectedSubmenu} // Pass the selected submenu
                />

                {/* Menu without dropdown (Parent Menu 4) */}
                <MenuButton
                    title="Parent Menu 4"
                    isSelected={selectedMenu.includes("Parent Menu 4")} // Check if it's selected
                    isOpen={false} // No dropdown
                    onClick={() => this.handleMenuClick("Parent Menu 4", false)} // Select menu without dropdown
                />
            </div>
        );
    }
}

export default Sidebar;
