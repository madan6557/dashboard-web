import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Layout.css"
import { NoIcon } from '../../components/Icons/Icon';

class Dashboard extends Component {
    state = {
        sidebarToggle: true
    }

    render() {
        return (
            <div className="page-container">
                <div className="content-container">
                    <div className="header-container">
                        <div className="sidebar-toggle open">
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

                    </div>
                </div>
                <div>
                    <Sidebar />
                </div>
            </div>
        )
    }
}

export default Dashboard;