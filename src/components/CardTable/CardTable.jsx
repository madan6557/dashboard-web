import React, { useState, useEffect } from "react";
import { Magnifier, Chevron, Ascending, Descending, Print } from '../Icons/Icon';
import './CardTable.css';
import ActionButton from "../ActionButton/ActionButton";

const CardTable = ({
    tableHead = [],
    tableItems = [],
    orderOptions = [
        ["Modified Date", "dateModified"],
        ["ID", "id_plant"],
        ["Species", "plant"],
        ["Location", "location"],
        ["Status", "status"]
    ],
    totalPages = 999,
    currentPage = 1,
    onPageChange,
    onOrderChange,
    onRowsChange,
    onSortChange,
    onSearchChange,
    onRowClick // New prop for handling row click
}) => {
    const [pageNumber, setPageNumber] = useState(currentPage);
    const [order, setOrder] = useState(orderOptions[0].value);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState('desc');
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Debounce search term: Only trigger search after no typing for 500ms
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (onSearchChange) {
                onSearchChange(searchTerm); // Trigger search when searchTerm changes
            }
        }, 500); // 500ms debounce delay
    
        return () => {
            clearTimeout(timeoutId); // Cleanup the previous timeout on rerender or input change
        };// eslint-disable-next-line
    }, [searchTerm]); // only watch `searchTerm` for change    

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        if (totalPages < pageNumber) {
            setPageNumber(1);
        }// eslint-disable-next-line
    }, [tableItems]);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Update the searchTerm state
    };

    const handleSortToggle = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        if (onSortChange) onSortChange(newSortOrder);
    };

    const handleChangePage = (value) => {
        if (value >= 1 && value <= totalPages) {
            setPageNumber(value);
            if (onPageChange) onPageChange(value);
        }
    };

    const handleOrderChange = (e) => {
        const value = e.target.value;
        setOrder(value);
        if (onOrderChange) onOrderChange(value);
    };

    const handleRowsChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setRowsPerPage(value);
        if (onRowsChange) onRowsChange(value);
    };

    const handleRowClick = (item) => {
        if (onRowClick) {
            onRowClick(item);
        }
    };

    return (
        <div className="cardTable-wrapper">
            <div className="cardTable-header">
                <div className="icon">
                    <Magnifier />
                </div>
                <input
                    className="search-bar"
                    type="search"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange} // Only search when this input changes
                />

                <div className="export-button">
                    <ActionButton
                        title="Export"
                        icon={<Print />}
                        type="confirm"
                        disabled={false}
                    />
                </div>

                <select
                    className="cardTable-dropdown"
                    name="rows"
                    id="numberOfRows"
                    value={rowsPerPage}
                    onChange={handleRowsChange} // Only update rows per page
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <select
                    className="cardTable-dropdown"
                    name="orderBy"
                    id="orderBy"
                    value={order}
                    onChange={handleOrderChange} // Only change ordering
                >
                    {orderOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select>

                <div className="icon" id="sortBy" onClick={handleSortToggle}>
                    {sortOrder === 'asc' ? <Ascending /> : <Descending />}
                </div>
            </div>
            <div className="cardTable-outline">
                <table className="cardTable">
                    <thead>
                        <tr>
                            {tableHead.map((heading, index) => (
                                <th key={index}>{heading}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <tr key={index} className="shimmering-row">
                                    {tableHead.map((_, idx) => (
                                        <td key={idx}><div className="shimmering-cell"></div></td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            tableItems.map((item, index) => (
                                <tr key={index} onClick={() => handleRowClick(item)}>
                                    {Object.values(item).map((value, idx) => (
                                        <td key={idx}>{value}</td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <div className="chevron left" onClick={() => handleChangePage(pageNumber - 1)}>
                    <Chevron />
                </div>
                <input
                    type="text"
                    id="pageNumber"
                    value={pageNumber}
                    onChange={(e) => setPageNumber(e.target.value)}
                    onBlur={(e) => {
                        let value = parseInt(e.target.value, 10);
                        if (!isNaN(value)) handleChangePage(value);
                    }}
                />
                <p className="totalPage">of <span id="totalPages">{totalPages}</span></p>
                <div className="chevron right" onClick={() => handleChangePage(pageNumber + 1)}>
                    <Chevron />
                </div>
            </div>
        </div>
    );
};

export default CardTable;
