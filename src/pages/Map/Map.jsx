import React, { useContext } from 'react';
import MapViewport from "../../components/MapViewport/MapViewport";
import "./Map.css"
import { DataIDContext } from "../../context/SelectedIDContext";

const Map = ({onRowClick}) => {
    const { setSelectedRowData } = useContext(DataIDContext);

    const handleOnClick = (id_plant) => {
        if (onRowClick) {
            onRowClick();
        }
        setSelectedRowData(id_plant);
    };

    return (
        <div className="map-container">
            <MapViewport
                onClick={handleOnClick}
            />
        </div>
    );
};

export default Map;
