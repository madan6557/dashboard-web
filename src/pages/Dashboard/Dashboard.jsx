import React, { useState, useEffect, useContext } from 'react';
import "./Dashboard.css";
import CardTable from "../../components/CardTable/CardTable";
import { searchApprovedPlants } from "../../api/controller/approvedPlantsController";
import { DataIDContext } from "../../context/SelectedIDContext";
import { SiteIDContext } from "../../context/SiteIDContext";
import MapViewport from '../../components/MapViewport/MapViewport';
import PlantSummary from '../../container/PlantSummary/PlantSummary';

const Dashboard = ({ onRowClick }) => {

    const [tableHead] = useState(["Plant ID", "Species", "Planting Date", "Activities", "Location", "Status"]);
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
    const [totalPages, setTotalPages] = useState(0);
    const [sortOrder, setSortOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState(orderOptions[0].value);
    const [searchTerm, setSearchTerm] = useState('');
    const { setSelectedRowData } = useContext(DataIDContext);
    const { selectedSite } = useContext(SiteIDContext);
    const [isLoading, setIsLoading] = useState(false);
    const [findData, setFindData] = useState(null);

    const fetchTableData = async () => {
        setIsLoading(true);
        const config = {
            page: currentPage,
            rows: 5,
            orderBy: orderBy,
            sort: sortOrder,
            search: searchTerm,
            site: parseInt(selectedSite)
        };

        try {
            const response = await searchApprovedPlants(config);
            setTableItems(response.data);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Error fetching plants:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (selectedSite) {
            fetchTableData();
        }
        // eslint-disable-next-line
    }, [currentPage, orderBy, sortOrder, searchTerm, selectedSite]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleOrderChange = (order) => {
        setOrderBy(order);
    };

    const handleSortChange = (sort) => {
        setSortOrder(sort);
    };

    const handleSearchChange = (search) => {
        setSearchTerm(search);
    };

    const handleRowClick = (item) => {
        if (onRowClick) {
            onRowClick();
        }
        setFindData(item);
        setSelectedRowData(item.id_plant);
    };

    const handleOnClick = (id_plant) => {
        if (onRowClick) {
            onRowClick();
        }
        setSelectedRowData(id_plant);
    };

    return (
        <div className="dashboard-container">
            {/* <div className="dashboard-graphic-report-container">

            </div> */}
            <div className="dashboard-map-container">
                <MapViewport
                    onClick={handleOnClick}
                    onFind={findData}
                />
            </div>
            <div className="dashboard-data-container">
                <div className="dashboard-plant-summary">
                    <PlantSummary/>
                </div>
                <div className="dashboard-table-container">
                    <CardTable
                        tableHead={tableHead}
                        tableItems={tableItems}
                        orderOptions={orderOptions}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        onOrderChange={handleOrderChange}
                        onSortChange={handleSortChange}
                        onSearchChange={handleSearchChange}
                        onRowClick={handleRowClick}
                        onLoading={isLoading}
                        onRefresh={fetchTableData}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
