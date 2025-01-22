import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
    const liveRatio = 7;
    const sickRatio = 1;
    const deadRatio = 2;
    const total = liveRatio + sickRatio + deadRatio;

    const healthyWidth = ((liveRatio / total) * 100).toFixed(2);
    const sickWidth = ((sickRatio / total) * 100).toFixed(2);
    const deadWidth = ((deadRatio / total) * 100).toFixed(2);

    return (
        <div className="dashboard-container">
            <div className="dashboard-graphic-report-container">

            </div>
            <div className="dashboard-map-container">

            </div>
            <div className="dashboard-data-container">
                <div className="dashboard-plant-summary">
                    <p className="title">Plant Summary</p>
                    <p className="plant-total">Total: 1,000,000</p>
                    <div className="chart-bar">
                        <div
                            className="plant-healthy"
                            style={{ width: `${healthyWidth}%` }}
                        ></div>
                        <div
                            className="plant-sick"
                            style={{ width: `${sickWidth}%` }}
                        ></div>
                        <div
                            className="plant-dead"
                            style={{ width: `${deadWidth}%` }}
                        ></div>
                    </div>
                    <div className="legend-container">
                        <div className="chart-legend" id="plant-healthy">
                            <div className="value-container">
                                <p className="value-title">Healthy <span>:</span></p>
                                <p className="value-number">700,000</p>
                                <p className="value-percentage">{healthyWidth}%</p>
                            </div>
                            <div className="chart-bar value-chart-container">
                                <div
                                    className="plant-healthy"
                                    style={{ width: `${healthyWidth}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="chart-legend" id="plant-healthy">
                            <div className="value-container">
                                <p className="value-title">Sick <span>:</span></p>
                                <p className="value-number">100,000</p>
                                <p className="value-percentage">{sickWidth}%</p>
                            </div>
                            <div className="chart-bar value-chart-container">
                                <div
                                    className="plant-sick"
                                    style={{ width: `${sickWidth}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="chart-legend" id="plant-healthy">
                            <div className="value-container">
                                <p className="value-title">Dead <span>:</span></p>
                                <p className="value-number">200,000</p>
                                <p className="value-percentage">{deadWidth}%</p>
                            </div>
                            <div className="chart-bar value-chart-container">
                                <div
                                    className="plant-dead"
                                    style={{ width: `${deadWidth}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboard-table-container">

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
