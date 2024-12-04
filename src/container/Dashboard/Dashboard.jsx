import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.css"

class Dashboard extends Component {
    state = {
        minimize: false
    }

    render() {
        return (
            <div className="page-container">
                <div className="content-container">
                    <div className="content-wrapper">

                    </div>
                </div>
                <Sidebar/>
            </div>
        )
    }
}

export default Dashboard;