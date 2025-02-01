import React, { useState, useEffect, useContext } from 'react';
import "./PlantSummary.css";
import { SiteIDContext } from "../../context/SiteIDContext";
import { getPlantSummary } from '../../api/controller/analyticController';

const PlantSummary = () => {

    const { selectedSite } = useContext(SiteIDContext);

    const [totalPlant, setTotalPlant] = useState(null);
    const [healthyPlant, setHealthyPlant] = useState({});
    const [sickPlant, setSickPlant] = useState({});
    const [witheredPlant, setWitheredPlant] = useState({});

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
            fetchPlantsSummary();
        }
        // eslint-disable-next-line
    }, [selectedSite]);

    return (
        <div className="plant-summary-wrapper">
            <p className="title">Plant Summary</p>
            <p className="plant-total">Total: {totalPlant}</p>
            <div className="chart-bar">
                <div
                    className="plant-healthy"
                    style={{ width: `${parseInt(healthyPlant.percentage) || 0}%` }}
                ></div>
                <div
                    className="plant-sick"
                    style={{ width: `${parseInt(sickPlant.percentage) || 0}%` }}
                ></div>
                <div
                    className="plant-dead"
                    style={{ width: `${parseInt(witheredPlant.percentage) || 0}%` }}
                ></div>
            </div>
            <div className="legend-container">
                <div className="chart-legend" id="plant-healthy">
                    <div className="value-container">
                        <p className="value-title">Healthy <span>:</span></p>
                        <p className="value-number">{healthyPlant.count || 0}</p>
                        <p className="value-percentage">{healthyPlant.percentage}</p>
                    </div>
                    <div className="chart-bar value-chart-container">
                        <div
                            className="plant-healthy"
                            style={{ width: `${parseInt(healthyPlant.percentage) || 0}%` }}
                        ></div>
                    </div>
                </div>
                <div className="chart-legend" id="plant-healthy">
                    <div className="value-container">
                        <p className="value-title">Sick <span>:</span></p>
                        <p className="value-number">{sickPlant.count || 0}</p>
                        <p className="value-percentage">{sickPlant.percentage}</p>
                    </div>
                    <div className="chart-bar value-chart-container">
                        <div
                            className="plant-sick"
                            style={{ width: `${parseInt(sickPlant.percentage) || 0}%` }}
                        ></div>
                    </div>
                </div>
                <div className="chart-legend" id="plant-healthy">
                    <div className="value-container">
                        <p className="value-title">Withered <span>:</span></p>
                        <p className="value-number">{witheredPlant.count || 0}</p>
                        <p className="value-percentage">{witheredPlant.percentage}</p>
                    </div>
                    <div className="chart-bar value-chart-container">
                        <div
                            className="plant-dead"
                            style={{ width: `${parseInt(witheredPlant.percentage) || 0}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlantSummary;
