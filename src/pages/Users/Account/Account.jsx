import React, { useState, useContext, useImperativeHandle, forwardRef, useEffect } from "react";
import './Account.css';
import CardTable from "../../../components/CardTable/CardTable"
import { DataIDContext } from "../../../context/SelectedIDContext";
import { getAllUsers } from "../../../api/controller/userController";

const Account = forwardRef(({ onRowClick }, ref) => {
    const [tableHead] = useState(["Email", "Username", "Role", "Status"]);
    const [orderOptions] = useState([
        { text: "Role", value: "role" },
        { text: "ID", value: "uuid" },
        { text: "Email", value: "email" },
        { text: "Username", value: "username" },
        { text: "Status", value: "userStatus" },
    ]);
    const [tableItems, setTableItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [sortOrder, setSortOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(orderOptions[0].value);
    const [searchTerm, setSearchTerm] = useState('');
    const { setSelectedRowData } = useContext(DataIDContext);
    const [isLoading, setIsLoading] = useState(false);

    const fetchTableData = async () => {
        setIsLoading(true);
        const config = {
            page: currentPage,
            rows: rowsPerPage,
            orderBy: orderBy,
            sort: sortOrder,
            search: searchTerm,
        };

        try {
            const response = await getAllUsers(config);
            setTableItems(response.data);
            setTotalPages(response.totalPages);

        } catch (error) {
            console.error("Error fetching plants:", error);
        } finally {
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
        fetchTableData();
        // eslint-disable-next-line
    }, [currentPage, rowsPerPage, orderBy, sortOrder, searchTerm]);

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
        setSelectedRowData(item.id_verification);
        onRowClick();
    };

    return (
        <div className="account-container">
            <CardTable
                tableHead={tableHead}
                tableItems={tableItems}
                orderOptions={orderOptions}
                currentPage={currentPage}
                totalPages={totalPages}
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

export default Account;
