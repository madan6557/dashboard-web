import React, { useState, useEffect } from "react";
import './Table.css';
import CardTable from "../../../components/CardTable/CardTable";
import { approvedPlants } from "../../../api/controller/plants";

const Table = () => {
    const [tableHead] = useState(["ID", "Species", "Planting Date", "Activities", "Location", "Status"]);
    const [orderOptions] = useState([
        ["Modified Date", "dateModified"],
        ["ID", "id_plant"],
        ["Species", "plant"],
        ["Planting Date", "plantingDate"],
        ["Location", "location"],
        ["Status", "status"]
    ]);
    const [tableItems, setTableItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [sortOrder, setSortOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(orderOptions[0][1]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = async () => {
        var plantSite = "jbg";
        const config = {
            page: currentPage,
            rows: rowsPerPage,
            orderBy: orderBy,
            sort: sortOrder,
            search: searchTerm,
            site: plantSite
        };

        console.log("Fetching data with config:", config);

        try {
            const response = await approvedPlants(config);
            setTableItems(response.data);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Error fetching plants:", error);
        }
    };

    useEffect(() => {
        fetchData();
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
            />
        </div>
    );
};

export default Table;
