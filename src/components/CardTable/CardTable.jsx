import React, { useState } from "react";
import './CardTable.css';
import ActionButton from "../ActionButton/ActionButton";
import { Magnifier, Chevron, Ascending, Print } from '../Icons/Icon';

const CardTable = ({
    tableHead = [],
    tableItems = [],
    sortOptions = ["name", "age", "city"], // Default options
    totalPages = 999 // You can pass the totalPages as a prop or leave it static
}) => {
    const [pageNumber, setPageNumber] = useState(1);

    const handleChange = (e) => {
        let value = e.target.value;

        // Only allow numbers
        if (!/^\d*$/.test(value)) {
            return;
        }

        // Convert to integer and constrain within totalPages
        value = parseInt(value, 10);
        if (!isNaN(value) && value >= 1 && value <= totalPages) {
            setPageNumber(value);
        } else if (value < 1) {
            setPageNumber(1);
        } else if (value > totalPages) {
            setPageNumber(totalPages);
        }
    };

    const handlePreviousPage = () => {
        setPageNumber((prev) => Math.max(1, prev - 1)); // Prevent going below page 1
    };

    const handleNextPage = () => {
        setPageNumber((prev) => Math.min(totalPages, prev + 1)); // Prevent going beyond totalPages
    };

    return (
        <div className="cardTable-wrapper">
            <div className="cardTable-header">
                <div className="icon">
                    <Magnifier />
                </div>
                <input className="search-bar" type="search" placeholder="Search..." />

                <div className="export-button">
                    <ActionButton
                        title="Export"
                        icon={<Print />}
                        type="confirm"
                        disabled={false}
                    />
                </div>

                <select className="cardTable-dropdown" name="rows" id="numberOfRows" >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <select
                    className="cardTable-dropdown"
                    name="sortBy"
                    id="sortBy"
                >
                    {sortOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)} {/* Capitalize first letter */}
                        </option>
                    ))}
                </select>
                <div className="icon" id="orderBy">
                    <Ascending />
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
                        {tableItems.map((item, index) => (
                            <tr key={index}>
                                {Object.values(item).map((value, idx) => (
                                    <td key={idx}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <div className="chevron left" onClick={handlePreviousPage}>
                    <Chevron />
                </div>
                <input
                    type="text"
                    id="pageNumber"
                    value={pageNumber}
                    onChange={handleChange}
                    onBlur={(e) => {
                        let value = parseInt(e.target.value, 10);
                        if (isNaN(value) || value < 1) value = 1;
                        if (value > totalPages) value = totalPages;
                        setPageNumber(value); // Update to valid value on blur
                    }}
                />
                <p className="totalPage">of <span id="totalPages">{totalPages}</span></p>
                <div className="chevron right" onClick={handleNextPage}>
                    <Chevron />
                </div>
            </div>
        </div>
    );
};

export default CardTable;
