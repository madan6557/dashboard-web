import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";

class Home extends Component {
    state = {
        minimize: false
    }

    render() {
        return (
            <div>
                <p>Sidebar</p>
                <hr />
                <Sidebar
                />
            </div>
        )
    }
}

export default Home;