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
    totalPages,
    currentPage = 1,
    onPageChange,
    onOrderChange,
    onRowsChange,
    onSortChange,
    onSearchChange,
    onRowClick,
    onLoading,
    onExport
}) => {
    const [pageNumber, setPageNumber] = useState(currentPage);
    const [order, setOrder] = useState(orderOptions[0].value);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState('desc');
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(onLoading);
    }, [onLoading]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (onSearchChange) {
                onSearchChange(searchTerm);
            }
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
        // eslint-disable-next-line
    }, [searchTerm]);

    useEffect(() => {
        if (totalPages < pageNumber) {
            setPageNumber(1);
        }
        setIsLoading(false);
        // eslint-disable-next-line
    }, [tableItems]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setIsLoading(true);
    };

    const handleSortToggle = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        if (onSortChange) onSortChange(newSortOrder);
        setIsLoading(true);
    };

    const handleChangePage = (value) => {
        if (value >= 1 && value <= totalPages) {
            setPageNumber(value);
            setIsLoading(true);
            if (onPageChange) onPageChange(value);
        }
        setIsLoading(true);
    };

    const handleOrderChange = (e) => {
        const value = e.target.value;
        setOrder(value);
        if (onOrderChange) onOrderChange(value);
        setIsLoading(true);
    };

    const handleRowsChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setRowsPerPage(value);
        if (onRowsChange) onRowsChange(value);
        setIsLoading(true);
    };

    const handleRowClick = (item) => {
        if (onRowClick) {
            onRowClick(item);
        }
    };

    return (
        <div className="cardTable-wrapper">
            <div className="cardTable-header">
                {onSearchChange && (
                    <div className="searchbar-container">
                        <div className="icon">
                            <Magnifier />
                        </div>
                        <input
                            id="search-bar"
                            className="search-bar"
                            type="search"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                )}
                <div className="cardTable-option-container">
                    {onExport && (
                        <div className="export-button">
                            <ActionButton
                                title="Export"
                                icon={<Print />}
                                type="confirm"
                                disabled={false}
                                onClick={onExport}
                            />
                        </div>
                    )}
                    {onRowsChange && (
                        <select
                            className="cardTable-dropdown"
                            name="rows"
                            id="numberOfRows"
                            value={rowsPerPage}
                            onChange={handleRowsChange}
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    )}
                    {onOrderChange && (
                        <select
                            className="cardTable-dropdown"
                            name="orderBy"
                            id="orderBy"
                            value={order}
                            onChange={handleOrderChange}
                        >
                            {orderOptions.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.text}
                                </option>
                            ))}
                        </select>
                    )}
                    {onSortChange && (
                        <div className="icon" id="sortBy" onClick={handleSortToggle}>
                            {sortOrder === 'asc' ? <Ascending /> : <Descending />}
                        </div>
                    )}
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

            {onPageChange && (
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
                            if (!isNaN(value) && value !== pageNumber) handleChangePage(value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                let value = parseInt(e.target.value, 10);
                                if (!isNaN(value) && value !== pageNumber) handleChangePage(value);
                            }
                        }}
                    />
                    <p className="totalPage">of <span id="totalPages">{totalPages}</span></p>
                    <div className="chevron right" onClick={() => handleChangePage(pageNumber + 1)}>
                        <Chevron />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardTable;
