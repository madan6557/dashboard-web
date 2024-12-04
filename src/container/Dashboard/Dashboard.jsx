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
                <Sidebar/>
            </div>
        )
    }
}

export default Dashboard;