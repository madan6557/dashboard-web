import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "../Dashboard/Dashboard";
import Map from "../Map/Map";
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

    // Method untuk memilih komponen yang akan dirender
    handleMenuSelect = (component) => {
        this.setState({ selectedComponent: component });
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
            </Router>
        );
    }
}

export default Layout;
