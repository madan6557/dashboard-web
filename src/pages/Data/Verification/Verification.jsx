import React, { useState } from "react";
import './Verification.css';
import CardTable from "../../../components/CardTable/CardTable"
import FloorButton from "../../../components/FloorButton/FloorButton"

const Verification = () => {
    const [tableHead] = useState(["ID", "Species", "Planting Date", "Activities", "Location", "Verification", "Uploaded"]);
    const [tableItems] = useState([
        { id: 22400001, species: "Alaban", planting_date: "25-10-2024", activities: "Monitoring", location: "Body River Katal-Katal", verification: "Unverified", uploaded: "25-10-2024" },
        { id: 22400002, species: "Alaban", planting_date: "25-10-2024", activities: "Monitoring", location: "Body River Katal-Katal", verification: "Unverified", uploaded: "25-10-2024" },
        { id: 22400011, species: "Alaban", planting_date: "25-10-2024", activities: "Monitoring", location: "Body River Katal-Katal", verification: "Unverified", uploaded: "25-10-2024" },
        { id: 22400012, species: "Alaban", planting_date: "25-10-2024", activities: "Monitoring", location: "Body River Katal-Katal", verification: "Unverified", uploaded: "25-10-2024" },
    ]);
    const [sortOptions] = useState(["modified", "name", "age", "city"]); // Sorting options array

    // Tambahkan state untuk menyimpan FloorButton yang sedang dipilih
    const [selected, setSelected] = useState("Unverified");

    return (
        <div className="table-container">
            <div className="floorButton-container">
                {/* FloorButton dengan kondisi selected */}
                <FloorButton
                    title="Unverified"
                    isSelected={selected === "Unverified"}
                    onClick={() => setSelected("Unverified")}
                />
                <FloorButton
                    title="Rejected"
                    isSelected={selected === "Rejected"}
                    onClick={() => setSelected("Rejected")}
                />
            </div>
            <CardTable
                tableHead={tableHead}
                tableItems={tableItems}
                sortOptions={sortOptions} // Passing the list of options
            />
        </div>
    );
}

export default Verification;
