import React, { useState } from "react";
import './Verification.css';
import CardTable from "../../../components/CardTable/CardTable"

const Verification = () => {
    const [tableHead] = useState(["ID", "Name", "Age", "City"]);
    const [tableItems] = useState([
        { id: 1, name: "John Doe", age: 25, city: "Table" },
        { id: 2, name: "Jane Smith", age: 30, city: "Los Angeles" },
        { id: 3, name: "Samuel Green", age: 22, city: "Chicago" },
        { id: 4, name: "Emily Brown", age: 28, city: "Houston" },
    ]);
    const [sortOptions] = useState(["modified", "name", "age", "city"]); // Sorting options array

    return (
        <div className="table-container">
            <CardTable
                tableHead={tableHead} 
                tableItems={tableItems} 
                sortByValue="modified"  // Can be changed based on need
                sortOptions={sortOptions}  // Passing the list of options
            />
        </div>
    );
}

export default Verification;