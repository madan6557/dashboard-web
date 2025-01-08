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
    const [orderOptions] = useState([
        { text: "Modified Date", value: "dateModified" },
        { text: "ID", value: "id_plant" },
        { text: "Species", value: "plant" },
        { text: "Planting Date", value: "plantingDate" },
        { text: "Location", value: "location" },
        { text: "Status", value: "status" }
    ]);

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
                <FloorButton
                    title="Draft"
                    isSelected={selected === "Draft"}
                    onClick={() => setSelected("Draft")}
                />
            </div>
            <CardTable
                tableHead={tableHead}
                tableItems={tableItems}
                orderOptions={orderOptions} // Passing the list of options
            />
        </div>
    );
}

export default Verification;
