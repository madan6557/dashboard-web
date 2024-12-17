import React, { useState } from "react";
import './Verification.css';
import CardTable from "../../../components/CardTable/CardTable"

const Verification = () => {
    const [tableHead] = useState(["ID", "Species", "Planting Date", "Activities", "Location", "Verification", "Uploaded"]);
    const [tableItems] = useState([
            { id: 22400001, species: "Alaban", planting_date: "25-10-2024", activities: "Monitoring", location:"Body River Katal-Katal", verification:"Unverified", uploaded: "25-10-2024" },
            { id: 22400002, species: "Alaban", planting_date: "25-10-2024", activities: "Monitoring", location:"Body River Katal-Katal", verification:"Unverified", uploaded: "25-10-2024" },
            { id: 22400003, species: "Alaban", planting_date: "25-10-2024", activities: "Monitoring", location:"Body River Katal-Katal", verification:"Unverified", uploaded: "25-10-2024" },
            { id: 22400004, species: "Alaban", planting_date: "25-10-2024", activities: "Monitoring", location:"Body River Katal-Katal", verification:"Unverified", uploaded: "25-10-2024" },
            { id: 22400005, species: "Alaban", planting_date: "25-10-2024", activities: "Monitoring", location:"Body River Katal-Katal", verification:"Unverified", uploaded: "25-10-2024" },
            { id: 22400006, species: "Alaban", planting_date: "25-10-2024", activities: "Monitoring", location:"Body River Katal-Katal", verification:"Unverified", uploaded: "25-10-2024" },
            { id: 22400007, species: "Alaban", planting_date: "25-10-2024", activities: "Monitoring", location:"Body River Katal-Katal", verification:"Unverified", uploaded: "25-10-2024" },
            { id: 22400008, species: "Alaban", planting_date: "25-10-2024", activities: "Monitoring", location:"Body River Katal-Katal", verification:"Unverified", uploaded: "25-10-2024" },
            { id: 22400009, species: "Alaban", planting_date: "25-10-2024", activities: "Monitoring", location:"Body River Katal-Katal", verification:"Unverified", uploaded: "25-10-2024" },
            { id: 22400010, species: "Alaban", planting_date: "25-10-2024", activities: "Monitoring", location:"Body River Katal-Katal", verification:"Unverified", uploaded: "25-10-2024" },
            { id: 22400011, species: "Alaban", planting_date: "25-10-2024", activities: "Monitoring", location:"Body River Katal-Katal", verification:"Unverified", uploaded: "25-10-2024" },
            { id: 22400012, species: "Alaban", planting_date: "25-10-2024", activities: "Monitoring", location:"Body River Katal-Katal", verification:"Unverified", uploaded: "25-10-2024" },
        ]);
    const [sortOptions] = useState(["modified", "name", "age", "city"]); // Sorting options array

    return (
        <div className="table-container">
            <CardTable
                tableHead={tableHead} 
                tableItems={tableItems} 
                sortOptions={sortOptions}  // Passing the list of options
            />
        </div>
    );
}

export default Verification;