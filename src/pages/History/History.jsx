import React, {useState} from "react";
import "./History.css";
import CardTable from "../../components/CardTable/CardTable"

const History = () => {
    const [tableHead] = useState(["ID", "Species", "Planting Date", "Activities", "Location", "Verification", "Uploaded"]);
    const [tableItems] = useState([
        { id: 22400001, species: "Alaban", planting_date: "25-10-2024", activities: "Monitoring", location: "Body River Katal-Katal", verification: "Unverified", uploaded: "25-10-2024" },
        { id: 22400002, species: "Alaban", planting_date: "25-10-2024", activities: "Monitoring", location: "Body River Katal-Katal", verification: "Unverified", uploaded: "25-10-2024" },
        { id: 22400011, species: "Alaban", planting_date: "25-10-2024", activities: "Monitoring", location: "Body River Katal-Katal", verification: "Unverified", uploaded: "25-10-2024" },
        { id: 22400012, species: "Alaban", planting_date: "25-10-2024", activities: "Monitoring", location: "Body River Katal-Katal", verification: "Unverified", uploaded: "25-10-2024" },
    ]);
    const [sortOptions] = useState(["modified", "name", "age", "city"]); // Sorting options array
    return (
        <div className="history-container">
            <div className="table-container">
                <CardTable
                    tableHead={tableHead}
                    tableItems={tableItems}
                    sortOptions={sortOptions} // Passing the list of options
                />
            </div>
        </div>
    );
}

export default History;
