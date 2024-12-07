import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "../Dashboard/Dashboard";
import "./Layout.css"
import { NoIcon } from '../../components/Icons/Icon';

class Layout extends Component {
    state = {
        sidebarToggle: true
    }

    // Method untuk toggle sidebar
    handleSidebarToggle = () => {
        this.setState((prevState) => ({
            sidebarToggle: !prevState.sidebarToggle // Toggle nilai sidebarToggle
        }));
    };

    render() {
        const { sidebarToggle } = this.state;
        return (
            <div className={`page-container ${sidebarToggle ? 'sidebar-visible' : 'sidebar-hidden'}`}>
                <div className="content-container">
                    <div className="header-container">
                        <div
                            className={`sidebar-toggle ${sidebarToggle ? 'open' : 'closed'}`} // Class dinamis
                            onClick={this.handleSidebarToggle} // Tambahkan event handler
                        >
                            <NoIcon />
                        </div>
                        <p className="menu-title">Menu Title</p>
                        <div className="config-wrapper">
                            <div className="config-button">
                                <NoIcon />
                            </div>
                            <div className="config-button">
                                <NoIcon />
                            </div>
                            <div className="user-icon">
                                <p>A</p>
                            </div>
                        </div>
                    </div>
                    <div className="content-wrapper">
                        <Dashboard />
                    </div>
                </div>
                <div className={`sidebar ${sidebarToggle ? 'visible' : 'hidden'}`}>
                    <Sidebar/> {/* Class dinamis */}
                </div>
            </div>
        )
    }
}

export default Layout;
