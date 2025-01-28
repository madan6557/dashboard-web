import React, { useState, useEffect } from "react";
import './Account.css';
import CardTable from "../../../components/CardTable/CardTable"
import { addNewAccount, getAllAccount } from "../../../api/controller/userController";
import CreateAccountForm from "../../../container/CreateAccountForm/CreateAccountForm";
import UserDetails from "../../../container/UserDetails/UserDetails";
import ActionButton from "../../../components/ActionButton/ActionButton";

const Account = ({ onAction }) => {
    const [tableHead] = useState([".hidden", "Email", "Username", "Role", "Status"]);
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
    const [userDetails, setUserDetails] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isCreateAccountFormVisible, setIsCreateAccountFormVisible] = useState(false);
    const [isCreateAccountFormAnimating, setIsCreateAccountFormAnimating] = useState(false); // Status animasi
    const [isUserDetailsVisible, setIsUserDetailsVisible] = useState(false);
    const [isUserDetailsAnimating, setIsUserDetailsAnimating] = useState(false); // Status animasi

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
            const response = await getAllAccount(config);
            setTableItems(response.data);
            setTotalPages(response.totalPages);

        } catch (error) {
            console.error("Error fetching plants:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const createNewAccount = async (data) => {
        setIsLoading(true);
        try {
            await addNewAccount(data);
        } catch (error) {
            onAction("Error creating new account", "failed");
            console.error("Error creating new account:", error);
        } finally {
            handleCreateAccountFormClose();
            onAction("New account created successfully", "success");
            fetchTableData();
        }
    };

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
        setUserDetails(item);
        setIsUserDetailsVisible(true);
    };

    const handleOpenCreateAccountForm = () => {
        setIsCreateAccountFormVisible(true);
    };

    const handleUserDetailsClose = () => {
        setIsUserDetailsAnimating(true); // Mulai animasi keluar
        setTimeout(() => {
            setIsUserDetailsVisible(false); // Hapus elemen setelah animasi selesai
            setIsUserDetailsAnimating(false);
        }, 300); // Durasi animasi sesuai CSS
    };

    const handleCreateAccountFormClose = () => {
        setIsCreateAccountFormAnimating(true); // Mulai animasi keluar
        setTimeout(() => {
            setIsCreateAccountFormVisible(false); // Hapus elemen setelah animasi selesai
            setIsCreateAccountFormAnimating(false);
        }, 300); // Durasi animasi sesuai CSS
    };

    return (
        <div className="account-container">
            {isCreateAccountFormVisible && (
                <div className={`account-form-container ${isCreateAccountFormAnimating ? "fade-out" : "fade-in"}`}>
                    <CreateAccountForm
                        onClose={handleCreateAccountFormClose}
                        onCreate={createNewAccount}
                    />
                </div>
            )}

            {isUserDetailsVisible && (
                <div className={`account-form-container ${isUserDetailsAnimating ? "fade-out" : "fade-in"}`}>
                    <UserDetails
                        onClose={handleUserDetailsClose}
                        onAction={onAction}
                        data={userDetails}
                    />
                </div>
            )}

            <div className="account-button-container">
                <ActionButton title="Create Account" type="confirm" onClick={handleOpenCreateAccountForm} />
            </div>

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
                onRefresh={fetchTableData}
            />
        </div>
    );
};

export default Account;
