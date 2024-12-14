import React, { Component } from "react";
import './Table.css';
import CardTable from "../../../components/CardTable/CardTable"

class Table extends Component {
    state = {
        sidebarToggle: true
    }

    render() {
        return (
            <div className="table-container">
                <CardTable />
            </div>

        )
    }
}

export default Table;