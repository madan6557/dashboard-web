import React from "react";
import './CardTable.css';
import { Magnifier, Chevron, Ascending } from '../Icons/Icon';

const CardTable = ({
    head = [],
    items = [],
    numberOfRows = 10,
    sortBy = "modified",
    orderBy = "asc",
}) => {
    // Data dummy jika tidak ada props
    const tableHead = head.length > 0 ? head : ["ID", "Name", "Age", "City"];
    const tableItems = items.length > 0 ? items : [
        { id: 1, name: "John Doe", age: 25, city: "New York" },
        { id: 2, name: "Jane Smith", age: 30, city: "Los Angeles" },
        { id: 3, name: "Samuel Green", age: 22, city: "Chicago" },
        { id: 4, name: "Emily Brown", age: 28, city: "Houston" },
        { id: 4, name: "Emily Brown", age: 28, city: "Houston" },
        { id: 4, name: "Emily Brown", age: 28, city: "Houston" },
        { id: 4, name: "Emily Brown", age: 28, city: "Houston" },
        { id: 4, name: "Emily Brown", age: 28, city: "Houston" },
    ];

    return (
        <div className="cardTable-wrapper">
            <div className="cardTable-header">
                <div className="icon">
                    <Magnifier />
                </div>
                <input className="search-bar" type="search" placeholder="Search..." />
                <select className="cardTable-dropdown" name="rows" id="numberOfRows">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
                <select className="cardTable-dropdown" name="sortBy" id="sortBy">
                    <option value="modified">Modified</option>
                    <option value="name">Name</option>
                    <option value="age">Age</option>
                    <option value="city">City</option>
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
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.city}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <div className="chevron left"><Chevron /></div>
                <input type="text" id="pageNumber" value={1} />
                <p className="totalPage">of <span>999</span></p>
                <div className="chevron right"><Chevron /></div>
            </div>
        </div>
    );
};

export default CardTable;
