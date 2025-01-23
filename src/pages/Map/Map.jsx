import React, { useState, useEffect, useContext} from 'react';
import MapViewport from "../../components/Map/Map";
import "./Map.css"
import { SiteIDContext } from "../../context/SiteIDContext";
import { getAllApprovedPlants } from '../../api/controller/mapDataProviderController';

const Map = () => {
    const { selectedSite } = useContext(SiteIDContext);
    const [plantsData, setPlantsData] = useState([]);

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
    return (
        <div className="map-container">
            <MapViewport />
        </div>
    );
};

export default Map;
