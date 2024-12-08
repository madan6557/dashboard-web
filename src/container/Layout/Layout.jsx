import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Notification from "../../components/Notification/Notification";
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "../Dashboard/Dashboard";
import Map from "../Map/Map";
import Overview from "../Activity/Overview/Overview";
import Analytics from "../Activity/Analytics/Analytics";
import Evaluation from "../Activity/Evaluation/Evaluation";
import { NoIcon } from '../../components/Icons/Icon';
import "./Layout.css";
import {
    List,
    VerticalDots,
    BellOutline,
} from '../../components/Icons/Icon';

class Layout extends Component {
    state = {
        sidebarToggle: true,
        selectedComponent: "Dashboard",
        tooltipText: "",
        tooltipPosition: { top: 0, left: 0 },
    };

    // Method untuk toggle sidebar
    handleSidebarToggle = () => {
        this.setState((prevState) => ({
            sidebarToggle: !prevState.sidebarToggle
        }));
    };

    // Method to update selected component in the state
    handleMenuSelect = (selectedTitle) => {
        console.log("Menu selected:", selectedTitle);
        this.setState({ selectedComponent: selectedTitle });
    };

    handleMenuHover = (isMinimized, title, element) => {
        if (isMinimized) {

            // Get the bounding rectangle of the menu button
            const rect = element.getBoundingClientRect();

            this.setState({
                tooltipText: title,
                tooltipPosition: {
                    top: rect.top + window.scrollY - 15,  // Position it vertically aligned with the button
                    left: rect.left + rect.width - 10,  // Position it to the right of the button with a 10px gap
                }
            });
        }
    };


    handleMenuLeave = () => {
        this.setState({
            tooltipText: "", // Clear tooltip when mouse leaves
        });
    };

    render() {
        const { sidebarToggle, selectedComponent, tooltipText, tooltipPosition } = this.state;

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

                    {/* PopUp Positioning */}
                    <div className="popup-notification">
                        <Notification />
                        <Notification />
                        <Notification />
                    </div>

                    {/* Dropdown Positioning */}
                    <div className="notification-dropdown">
                        <div className="notification-container">
                            <Notification />
                            <Notification />
                            <Notification />
                            <Notification />
                            <Notification />
                            <Notification />
                            <Notification />
                            <Notification />
                            <Notification />
                        </div>
                        <div className="clear-button">
                            <NoIcon />
                            <p >Clear All</p>
                        </div>
                    </div>

                    <div className="content-container">
                        <div className="header-container">
                            <div
                                className={`sidebar-toggle ${sidebarToggle ? 'open' : 'closed'}`}
                                onClick={this.handleSidebarToggle}
                            >
                                <List />
                            </div>
                            <p className="menu-title">{selectedComponent}</p>
                            <div className="config-wrapper">
                                <div className="config-button">
                                    <BellOutline />
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
                            onMenuSelect={this.handleMenuSelect}
                            onMenuHover={this.handleMenuHover}
                            onMenuLeave={this.handleMenuLeave}
                            sidebarToggle={this.state.sidebarToggle}
                        />
                    </div>
                </div>
            </Router >
        );
    }
}

export default Layout;
