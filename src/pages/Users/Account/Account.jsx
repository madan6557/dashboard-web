import React, { Component } from "react";
import './Account.css';
import CardTable from "../../../components/CardTable/CardTable";

class Account extends Component {
    state = {
        tableHead: ["ID", "Name", "Age", "City"], // Data kepala tabel
        tableItems: [ // Data isi tabel
            { id: 1, name: "John Doe", age: 25, city: "Account" },
            { id: 2, name: "Jane Smith", age: 30, city: "Los Angeles" },
            { id: 3, name: "Samuel Green", age: 22, city: "Chicago" },
            { id: 4, name: "Emily Brown", age: 28, city: "Houston" },
        ],
        sortOptions: ["role", "name"],  // Perbaikan pada array ini
    };

    render() {
        const { tableHead, tableItems, sortOptions } = this.state;

        return (
            <div className="table-container">
                <CardTable
                    tableHead={tableHead} 
                    tableItems={tableItems} 
                    sortByValue="role"  // Bisa diubah sesuai keinginan
                    sortOptions={sortOptions}  // Mengirim daftar opsi
                />
            </div>
        );
    }
};

export default Account;
