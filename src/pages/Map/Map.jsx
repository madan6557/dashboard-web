import React, { useState, useEffect, useContext } from 'react';
import MapViewport from "../../components/MapViewport/MapViewport";
import "./Map.css"
import { DataIDContext } from "../../context/SelectedIDContext";
import { SiteIDContext } from "../../context/SiteIDContext";
import { getAllApprovedPlants } from '../../api/controller/mapDataProviderController';

const Map = ({onRowClick}) => {
    const { selectedSite } = useContext(SiteIDContext);
    const [plantsData, setPlantsData] = useState([]);
    const { setSelectedRowData } = useContext(DataIDContext);

    const fetchPlantsData = async () => {
        try {
            const response = await getAllApprovedPlants("", selectedSite);
            setPlantsData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching plants:", error);
        }
    };

    useEffect(() => {
        if (selectedSite) {
            fetchPlantsData();
        }
        // eslint-disable-next-line
    }, [selectedSite]);

    const handleOnClick = (id_plant) => {
        if (onRowClick) {
            onRowClick();
        }
        setSelectedRowData(id_plant);
    };

    return (
        <div className="map-container">
            <MapViewport
                dataset={plantsData}
                onClick={handleOnClick}
            />
        </div>
    );
};

export default Map;
