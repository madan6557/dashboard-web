import React, { useState, useContext, useImperativeHandle, forwardRef, useEffect } from "react";
import './Verification.css';
import CardTable from "../../../components/CardTable/CardTable"
import FloorButton from "../../../components/FloorButton/FloorButton"
import { DataIDContext } from "../../../context/SelectedIDContext";
import { SiteIDContext } from "../../../context/SiteIDContext";
import { searchVerificationPlants } from "../../../api/controller/verificationPlantsController";

const Verification = forwardRef(({ onRowClick }, ref) => {
    const [tableHead] = useState(["ID","Plant ID", "Species", "Activities", "Location", "Uploader", "Upload Date", "Verification"]);
    const [orderOptions] = useState([
        { text: "Modified Date", value: "dateModified" },
        { text: "ID", value: "id_plant" },
        { text: "Species", value: "plant" },
        { text: "Planting Date", value: "plantingDate" },
        { text: "Location", value: "location" },
        { text: "Status", value: "status" },
        { text: "Uploader", value: "username" },
    ]);
    const [tableItems, setTableItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [sortOrder, setSortOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState(orderOptions[0].value);
    const [searchTerm, setSearchTerm] = useState('');
    const { setSelectedRowData } = useContext(DataIDContext);
    const { selectedSite } = useContext(SiteIDContext);
    const [isLoading, setIsLoading] = useState(false);

    // Tambahkan state untuk menyimpan FloorButton yang sedang dipilih
    const [selected, setSelected] = useState("Unverified");
    const fetchTableData = async () => {
        setIsLoading(true);
        const config = {
            page: currentPage,
            rows: rowsPerPage,
            orderBy: orderBy,
            sort: sortOrder,
            search: searchTerm,
            site: parseInt(selectedSite)
        };

        try {
            const response = await searchVerificationPlants(config);
            setTableItems(response.data);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Error fetching plants:", error);
        }finally {
            setIsLoading(false);
        }
    };

    // Expose fetchTableData to the parent component
    useImperativeHandle(ref, () => ({
        fetchTableData,
        setIsLoading: () => {
            setIsLoading({ value: true, timestamp: Date.now() });
        },
    }));

    useEffect(() => {
        if(selectedSite){
            fetchTableData();
        }
        // eslint-disable-next-line
    }, [currentPage, rowsPerPage, orderBy, sortOrder, searchTerm, selectedSite]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleOrderChange = (order) => {
        setOrderBy(order);
    };

    const handleRowsChange = (rows) => {
        setRowsPerPage(rows);
    };

    const handleSortChange = (sort) => {
        setSortOrder(sort);
    };

    const handleSearchChange = (search) => {
        setSearchTerm(search);
    };

    const handleRowClick = (item) => {
        onRowClick();
        setSelectedRowData(item.id_verification); // Update selected row data
    };

    return (
        <div className="verification-container">
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
                orderOptions={orderOptions}
                totalPages={totalPages} // Assuming total items is 100 for this example
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onOrderChange={handleOrderChange}
                onRowsChange={handleRowsChange}
                onSortChange={handleSortChange}
                onSearchChange={handleSearchChange}
                onRowClick={handleRowClick}
                onLoading={isLoading}
            />
        </div>
    );
});

export default Verification;
