import React, { useState, useEffect, useContext, useImperativeHandle, forwardRef } from 'react';
import './Table.css';
import CardTable from "../../../components/CardTable/CardTable";
import { searchApprovedPlants } from "../../../api/controller/plantsController";
import { DataIDContext } from "../../../context/SelectedIDContext";
import { SiteIDContext } from "../../../context/SiteIDContext";

const Table = forwardRef(({ onRowClick }, ref) => {
    const [tableHead] = useState(["ID", "Species", "Planting Date", "Activities", "Location", "Status"]);
    const [orderOptions] = useState([
        { text: "Modified Date", value: "dateModified" },
        { text: "ID", value: "id_plant" },
        { text: "Species", value: "plant" },
        { text: "Planting Date", value: "plantingDate" },
        { text: "Location", value: "location" },
        { text: "Status", value: "status" }
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

    const fetchTableData = async () => {
        var plantSite = "jbg";
        const config = {
            page: currentPage,
            rows: rowsPerPage,
            orderBy: orderBy,
            sort: sortOrder,
            search: searchTerm,
            site: selectedSite || plantSite
        };

        console.log("Fetching data with config:", config);

        try {
            const response = await searchApprovedPlants(config);
            setTableItems(response.data);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Error fetching plants:", error);
        }
    };

    // Expose fetchTableData to the parent component
    useImperativeHandle(ref, () => ({
        fetchTableData
    }));


    useEffect(() => {
        fetchTableData();
        // eslint-disable-next-line
    }, [currentPage, rowsPerPage, orderBy, sortOrder, searchTerm]);

    const handlePageChange = (page) => {
        console.log("Page changed to:", page);
        setCurrentPage(page);
    };

    const handleOrderChange = (order) => {
        console.log("Order changed to:", order);
        setOrderBy(order);
    };

    const handleRowsChange = (rows) => {
        console.log("Rows per page changed to:", rows);
        setRowsPerPage(rows);
    };

    const handleSortChange = (sort) => {
        console.log("Sort order changed to:", sort);
        setSortOrder(sort);
    };

    const handleSearchChange = (search) => {
        console.log("Search term changed to:", search);
        setSearchTerm(search);
    };

    const handleRowClick = (item) => {
        console.log("Row clicked:", item.id_plant);
        if (onRowClick) {
            onRowClick(); // This will call the passed function from Layout (which sets isDetailsVisible)
        }
        setSelectedRowData(item.id_plant); // Update selected row data
    };

    return (
            <div className="table-container">
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
                />
            </div>
    );
});

export default Table;
