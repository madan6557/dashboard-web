import React, { useState, useEffect, useContext } from 'react';
import "./Dashboard.css";
import CardTable from "../../components/CardTable/CardTable";
import { searchApprovedPlants } from "../../api/controller/approvedPlantsController";
import { DataIDContext } from "../../context/SelectedIDContext";
import { SiteIDContext } from "../../context/SiteIDContext";
import MapViewport from '../../components/MapViewport/MapViewport';
import { getAllApprovedPlants } from '../../api/controller/mapDataProviderController';
import { getPlantSummary } from '../../api/controller/analyticController';

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
    const [plantsData, setPlantsData] = useState([]);

    const [totalPlant, setTotalPlant] = useState(null);
    const [healthyPlant, setHealthyPlant] = useState({});
    const [sickPlant, setSickPlant] = useState({});
    const [witheredPlant, setWitheredPlant] = useState({});

    const fetchPlantsLocationData = async () => {
        try {
            const response = await getAllApprovedPlants("", selectedSite);
            setPlantsData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching plants:", error);
        }
    };

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
    
    const fetchPlantsSummary = async () => {
        try {
            const response = await getPlantSummary();
            console.log(response);
            setTotalPlant(response.totalPlants);
            setHealthyPlant(response.status.healthy)
            console.log(healthyPlant);
            setSickPlant(response.status.sick)
            setWitheredPlant(response.status.withered)
        } catch (error) {
            console.error("Error fetching plants:", error);
        }
    };

    useEffect(() => {
        if (selectedSite) {
            fetchTableData();
            if (plantsData.length === 0) {
                fetchPlantsLocationData();
            }
            if(!totalPlant){
                fetchPlantsSummary();
            }
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
            <div className="dashboard-graphic-report-container">

            </div>
            <div className="dashboard-map-container">
                <MapViewport
                    dataset={plantsData}
                    onClick={handleOnClick}
                />
            </div>
            <div className="dashboard-data-container">
                <div className="dashboard-plant-summary">
                    <p className="title">Plant Summary</p>
                    <p className="plant-total">Total: {totalPlant}</p>
                    <div className="chart-bar">
                        <div
                            className="plant-healthy"
                            style={{ width: `${parseInt(healthyPlant.percentage)||0}%` }}
                        ></div>
                        <div
                            className="plant-sick"
                            style={{ width: `${parseInt(sickPlant.percentage)||0}%` }}
                        ></div>
                        <div
                            className="plant-dead"
                            style={{ width: `${parseInt(witheredPlant.percentage)||0}%` }}
                        ></div>
                    </div>
                    <div className="legend-container">
                        <div className="chart-legend" id="plant-healthy">
                            <div className="value-container">
                                <p className="value-title">Healthy <span>:</span></p>
                                <p className="value-number">{healthyPlant.count||0}</p>
                                <p className="value-percentage">{healthyPlant.percentage}%</p>
                            </div>
                            <div className="chart-bar value-chart-container">
                                <div
                                    className="plant-healthy"
                                    style={{ width: `${parseInt(healthyPlant.percentage)||0}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="chart-legend" id="plant-healthy">
                            <div className="value-container">
                                <p className="value-title">Sick <span>:</span></p>
                                <p className="value-number">{sickPlant.count||0}</p>
                                <p className="value-percentage">{sickPlant.percentage}%</p>
                            </div>
                            <div className="chart-bar value-chart-container">
                                <div
                                    className="plant-sick"
                                    style={{ width: `${parseInt(sickPlant.percentage)||0}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="chart-legend" id="plant-healthy">
                            <div className="value-container">
                                <p className="value-title">Withered <span>:</span></p>
                                <p className="value-number">{witheredPlant.count||0}</p>
                                <p className="value-percentage">{witheredPlant.percentage}%</p>
                            </div>
                            <div className="chart-bar value-chart-container">
                                <div
                                    className="plant-dead"
                                    style={{ width: `${parseInt(witheredPlant.percentage)||0}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
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
