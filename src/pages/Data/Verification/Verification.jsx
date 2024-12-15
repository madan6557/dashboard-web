import React, { Component } from "react";
import './Verification.css';
import CardTable from "../../../components/CardTable/CardTable"

class Verification extends Component {
    state = {
        tableHead: ["ID", "Name", "Age", "City"], // Data kepala tabel
        tableItems: [ // Data isi tabel
            { id: 1, name: "John Doe", age: 25, city: "Verification" },
            { id: 2, name: "Jane Smith", age: 30, city: "Los Angeles" },
            { id: 3, name: "Samuel Green", age: 22, city: "Chicago" },
            { id: 4, name: "Emily Brown", age: 28, city: "Houston" },
        ],
        sortOptions: ["modified","name", "age", "city"],  // Perbaikan pada array ini
    };

    render() {
        const { tableHead, tableItems, sortOptions } = this.state;

        return (
            <div className="table-container">
                <CardTable
                    tableHead={tableHead} 
                    tableItems={tableItems} 
                    sortByValue="modified"  // Bisa diubah sesuai keinginan
                    sortOptions={sortOptions}  // Mengirim daftar opsi
                />
            </div>
        );
    }
}

export default Verification;