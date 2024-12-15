import React from "react";
import './CardTable.css';
import { Magnifier, Chevron, Ascending } from '../Icons/Icon';

const CardTable = ({
    tableHead = [],
    tableItems = [],
    sortOptions = ["name", "age", "city"]  // Default options
}) => {

    return (
        <div className="cardTable-wrapper">
            <div className="cardTable-header">
                <div className="icon">
                    <Magnifier />
                </div>
                <input className="search-bar" type="search" placeholder="Search..." />
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
                <div className="chevron left"><Chevron /></div>
                <input type="text" id="pageNumber" />
                <p className="totalPage">of <span>999</span></p>
                <div className="chevron right"><Chevron /></div>
            </div>
        </div>
    );
};

export default CardTable;
